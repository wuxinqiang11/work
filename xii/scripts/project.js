// Sleep
function Test() {
  //   var task = MakeRes(6, 1, true);

  for (var i = 0; i < 2; i++) {
    var jobid = MakeRes(6, 1, true);
    console.log(jobid);
  }
}

// MakeResource 创建资源
function MakeResource(project_id) {
  var resources = Process("models.project.resource.Get", {
    wheres: [{ column: "project_id", value: project_id }],
  });

  for (var i in resources) {
    var resource = resources[i] || {};
    var amount = resource.amount || 1;
    if (amount > 10) {
      amount = 10;
    }
    for (var i = 0; i < amount; i++) {
      result = MakeVM(resource.sku_id, project_id); // 同步较慢
      if (result) {
        Process("models.resource.Save", {
          sku_id: resource.sku_id,
          project_id: project_id,
          rid: result.id,
          create_time: new Date().toISOString().slice(0, 19).replace("T", " "),
        });
      }
    }
  }
}

/**
 * 对接 XII_CSPHERE 创建应用容器
 * @param {*} sku
 * @param {*} project_id
 * @param {*} async
 */
function MakeContainter(sku, project_id, async) {
  var config = Process("flows.xii.config");
  var id = new Date().getTime();
  var name = `xiang-${sku.id}-${project_id}-${id}`;
  var params = sku.params || {};
  if (params.prepare == undefined || params.prepare == null) {
    throw new Error("缺少prepare信息 params.prepare");
  }

  if (params.create == undefined || params.create == null) {
    throw new Error("缺少create信息 params.create");
  }

  var prepare = params.prepare || {};
  var create = params.create || {};

  // Prepare
  var url = `${config.XII_CSPHERE_HOST}/instances/prepare?revision_id=${prepare.revision_id}&svrpool_id=${prepare.svrpool_id}&name=${prepare.name}`;
  var response = Process(
    "xiang.network.PostJSON",
    url,
    {},
    { "Csphere-Api-Key": config.XII_CSPHERE_KEY }
  );

  if (response.status != 200) {
    console.log(response);
    throw new Error("Prepare接口调用失败");
  }

  // Create
  var data = response.data || {};
  create["name"] = name;
  create["svrpool_id"] = prepare.svrpool_id;
  create["revision_id"] = prepare.revision_id;
  create["id"] = data.id;

  var body = JSON.stringify(create);
  var url = `${config.XII_CSPHERE_HOST}/instances/${create.id}`;
  response = Process("xiang.network.Send", "PATCH", url, {}, body, {
    "Csphere-Api-Key": config.XII_CSPHERE_KEY,
  });

  if (response.status != 200) {
    console.log(response);
    throw new Error("Create接口调用失败");
  }
  return { id: response.data.Id, jobid: response.data.Id };
}

/**
 * 对接XVP，创建虚拟机，轻虚拟机
 */
function MakeVM(sku_id, project_id, async) {
  var sku = Process("models.resource.sku.Find", sku_id, {
    select: ["id", "params", "name", "type"],
  });

  var type = null;
  if (sku.type == "虚拟机") {
    type = "qemu";
  } else if (sku.type == "轻虚拟机") {
    type = "lxc";
  } else if (sku.type == "容器") {
    return MakeContainter(sku, project_id, async);
  }

  if (type == null) {
    return false;
  }

  var params = sku.params || {};
  if (params.node == undefined || params.node == null) {
    throw new Error("缺少节点信息 params.node");
  }

  if (params.vmid == undefined || params.vmid == null) {
    throw new Error("缺少vmid信息 params.vmid");
  }

  var id = NextID();
  var name = `xiang-${sku_id}-${project_id}-${id}`;
  if (async) {
    var jobid = CloneAsync(id, name, params, type);
    return { id: id, jobid: jobid };
  }

  var jobid = Clone(id, name, params, type);
  return { id: id, jobid: jobid };
}

/**
 * XVP 克隆
 * @param {*} name
 * @param {*} params
 */
function Clone(id, name, params, type) {
  var config = Process("flows.xii.config");
  //   params = {
  //     node: "cmp",
  //     vmid: 100,
  //   };
  var payload = {
    newid: id,
    name: name,
    target: params.node,
    full: 1,
  };
  type = type || "qemu"; // lxc|qemu

  //   https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/extjs/nodes/cmp/qemu/100/clone
  //   https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/extjs/nodes/cmp/lxc/103/clone
  var url = `${config.XII_XVP_HOST}/json/nodes/${params.node}/${type}/${params.vmid}/clone`;
  if (type == "qemu") {
    var response = Process("xiang.network.PostJSON", url, payload, {
      Authorization: config.XII_XVP_KEY,
    });
  } else {
    var hostname = payload["name"];
    payload["hostname"] = hostname;
    delete payload["name"];
    var response = Process("xiang.network.PostJSON", url, payload, {
      Authorization: config.XII_XVP_KEY,
    });
  }

  if (response.status != 200) {
    console.log(response);
    throw new Error("Clone接口调用失败");
  }
  return response.data.data;
}

function NextID() {
  var config = Process("flows.xii.config");
  var url = `${config.XII_XVP_HOST}/json/cluster/nextid`;
  var response = Process(
    "xiang.network.Get",
    url,
    {},
    { Authorization: config.XII_XVP_KEY }
  );

  if (response.status != 200) {
    throw new Error("获取NextID接口调用失败");
  }
  return response.data.data;
}

// CloneAsync
function CloneAsync(id, name, params, type) {
  var jobid = Clone(id, name, params, type);
  var status = Status(params.node, jobid);
  while (status == "running") {
    Process("xiang.flow.Sleep", 200);
    status = Status(params.node, jobid);
  }
  return jobid;
}

/**
 * 检查状态
 * @param {*} jobid
 */
function Status(node, jobid) {
  var config = Process("flows.xii.config");
  var url = `${config.XII_XVP_HOST}/json/nodes/${node}/tasks/${jobid}/status`;
  var response = Process(
    "xiang.network.Get",
    url,
    {},
    { Authorization: config.XII_XVP_KEY }
  );

  if (response.status != 200) {
    console.log(response);
    throw new Error("获取Status接口调用失败");
  }

  return response.data.data.status;
}
