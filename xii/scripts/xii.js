// 希云API接口

function test() {
  var response = Process(
    "xiang.network.Get",
    "http://xiicloud-csphere-api.hn.proxy.zsm1703.com:30000/api/stats",
    {},
    { "Csphere-Api-Key": "c20e34222e6a1802c413a3ac4ce68e8484d3bbdf" }
  );

  return { success: "done", response: response };
}

/**
 * VNC连接
 *
 * https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/json/nodes/cmp/qemu/100/vncproxy
 * curl 'https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/json/nodes/cmp/qemu/100/vncproxy' \
 *  -H 'Authorization:XVPAPIToken=root@pam!api=6b294af3-c3e2-4868-bffa-71a5f4efc3e5' \
 *  --insecure --data-raw 'websocket=1'
 * node=cmp
 * type=qemu|lxc
 * vmid=100
 */
function vnc(type, node, vmid) {
  var config = Process("flows.xii.config");

  // https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/json/nodes/cmp/qemu/100/vncproxy
  // https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/api2/extjs/nodes/cmp/lxc/103/vncproxy
  // var url = `${config.XII_XVP_HOST}/json/nodes/${params.node}/${params.type}/${params.vmid}/vncproxy`;
  // console.log(url, { Authorization: config.XII_XVP_KEY });

  // token
  // var response = Process("xiang.network.POST", url, "websocket=1", {
  //   Authorization: config.XII_XVP_KEY,
  // });

  var url = `${config.XII_XVP_HOST}/json/access/ticket`;
  var password = encodeURIComponent(config.XII_XVP_PASSWORD);
  var user = config.XII_XVP_USER;
  var response = Process(
    "xiang.network.POST",
    url,
    `username=${user}&password=${password}`
  );

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用vncproxy接口失败");
  }
  var ticket = encodeURIComponent(response.data.data.ticket);
  var url = `${config.XII_XVP_NOVNC}?vmid=${vmid}&node=${node}&token=${ticket}`;
  return url;
}

// wss://xiicloud-csphere-api.hn.proxy.zsm1703.com:30000/api2/json/nodes/cmp/qemu/100/vncwebsocket?port=5900&vncticket=XVPVNC:62280FE4::Afi8U4zfZ93jSyxBqlxepe2tDZFmZo8WV7YwzINqjDZzYCCMXtjup8GlE9lRopLCJZ1ZpLm0xYVEhORd3XjdixX0uD0OBAJTpJSyJ7DSP6fGw/4SeoFwEjWioXDM8H87pI09oAxXVqRu8uK/nSZ8YSjlo2fmRMGG/t4yQ3XCsdiBrNf7p24Z0lJ7PvC/TD7JY3BU55hvOSfSD4d5sZTY3mxwUM/xkjtJyH2MLYiP+nq4Kbs1OpAPIckeWnQqrIoM/hb7P7MzlH4Rl6ClJSZ6k72aJMPtZAQfzSJsn72Z1bxGTUtdTExPzxlYABlgSTh7+GOalOtEHZG5Ns3KTDb9aA==
// wss://xiicloud-csphere-api.hn.proxy.zsm1703.com:30000/api2/json/nodes/cmp/qemu/100/vncwebsocket?port=5900\u0026vncticket=XVPVNC:62280FE4::Afi8U4zfZ93jSyxBqlxepe2tDZFmZo8WV7YwzINqjDZzYCCMXtjup8GlE9lRopLCJZ1ZpLm0xYVEhORd3XjdixX0uD0OBAJTpJSyJ7DSP6fGw/4SeoFwEjWioXDM8H87pI09oAxXVqRu8uK/nSZ8YSjlo2fmRMGG/t4yQ3XCsdiBrNf7p24Z0lJ7PvC/TD7JY3BU55hvOSfSD4d5sZTY3mxwUM/xkjtJyH2MLYiP+nq4Kbs1OpAPIckeWnQqrIoM/hb7P7MzlH4Rl6ClJSZ6k72aJMPtZAQfzSJsn72Z1bxGTUtdTExPzxlYABlgSTh7+GOalOtEHZG5Ns3KTDb9aA==
// https://xiicloud-xvp-api.hn.proxy.zsm1703.com:30000/novnc/xiicloudvnc.html?console=qemu&vmid=101&node=cmp&token=XVP%3Aroot%40pam%3A62318C0C%3A%3AiUe36aBi4B7C69H7XMafKamyqGlDVd2mt%2B7cDSWCx883004fntN8V6ZeX9sJ9LAffYii7c26iNpwM6RNZSyc2P04f6vMECIt3BJZdqSWvksXBblhBC%2BkekpWKLDrXwBrdBAY6jHDZrWSVutQQJkmqYeroiaBm%2FS2YHHRagu%2BQKwz7KtNxNLqAVUWeVqyAWKejFifBoW6Z%2F%2Bi9rMGJsHuBic6q8VfiHDvEvBqTnWzxMKB0lm4gqm2mriFFZIhpXzr3kSB49Bf9p5fEnOtIy06DYHGXUqzxE0UP03gGsCXlH2U7SCfnvugU1fd8d0Brpm56Fid2Yf7C%2BUCMlclvIlbrg%3D%3D

/**
 * 读取资源数据
 * @param {*} id
 */
function res(id) {
  var data = Process("models.resource.Find", id, {
    withs: {
      sku: {
        query: {
          select: ["cpu", "disk", "id", "memory", "name", "type", "params"],
        },
      },
      project: { query: { withs: { product: {} } } },
    },
  });

  if (data.code && data.message) {
    throw new Exception(data.message, data.code);
  }

  var status = {};
  if (data.sku.type == "虚拟机") {
    params = data.sku.params || {};
    status = qemu(data.rid, params.node);
  } else if (data.sku.type == "轻虚拟机") {
    params = data.sku.params || {};
    status = lxc(data.rid, params.node);
  } else if (data.sku.type == "容器") {
  }

  data["status"] = status;
  return data;
}

/**
 * 读取虚拟机
 * @param {*} rid
 * @param {*} node
 */
function qemu(rid, node) {
  var c = Process("flows.xii.config");
  var url = `${c.XII_XVP_HOST}/json/nodes/${node}/qemu/${rid}/status/current`;
  var response = Process("xiang.network.Get", url, null, {
    Authorization: c.XII_XVP_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用XVP接口失败");
  }

  var data = response.data || {};
  var status = data.data || {};
  status["node"] = node;
  status["vnc"] = vnc("qemu", node, rid);
  return status;
}

/**
 * 读取轻虚拟机
 * @param {*} rid
 * @param {*} node
 */
function lxc(rid, node) {
  var c = Process("flows.xii.config");
  var url = `${c.XII_XVP_HOST}/json/nodes/${node}/lxc/${rid}/status/current`;
  var response = Process("xiang.network.Get", url, null, {
    Authorization: c.XII_XVP_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用XVP接口失败");
  }

  var data = response.data || {};
  var status = data.data || {};
  status["node"] = node;
  status["vnc"] = vnc("lxc", node, rid);
  return status;
}

/**
 * 启动资源
 * @param {*} method start | stop
 * @param {*} id
 */
function exec(id, method) {
  var data = Process("models.resource.Find", id, {
    withs: {
      sku: {
        query: {
          select: ["cpu", "disk", "id", "memory", "name", "type", "params"],
        },
      },
    },
  });
  if (data.code && data.message) {
    throw new Exception(data.message, data.code);
  }

  var status = null;
  if (data.sku.type == "虚拟机") {
    params = data.sku.params || {};
    status = execQemu(data.rid, params.node, method);
  } else if (data.sku.type == "轻虚拟机") {
    params = data.sku.params || {};
    status = execLxc(data.rid, params.node, method);
  } else if (data.sku.type == "容器") {
  }

  if (status == null) {
    throw new Exception("操作失败", 400);
  }

  return status;
}

/**
 * 读取轻虚拟机
 * @param {*} rid
 * @param {*} node
 */
function execQemu(rid, node, method) {
  var c = Process("flows.xii.config");
  var url = `${c.XII_XVP_HOST}/json/nodes/${node}/qemu/${rid}/status/${method}`;
  var response = Process("xiang.network.POST", url, null, {
    Authorization: c.XII_XVP_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用XVP接口失败");
  }

  var data = response.data || {};
  var status = data.data || {};
  return status;
}

/**
 * 读取轻虚拟机
 * @param {*} rid
 * @param {*} node
 */
function execLxc(rid, node, method) {
  var c = Process("flows.xii.config");
  var url = `${c.XII_XVP_HOST}/json/nodes/${node}/lxc/${rid}/status/${method}`;
  var response = Process("xiang.network.POST", url, null, {
    Authorization: c.XII_XVP_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用XVP接口失败");
  }

  var data = response.data || {};
  var status = data.data || {};
  return status;
}

function Adapt() {
  var all = Process("models.project.adapt.Get", {});
  for (var i in all) {
    Process("flows.xii.project.update", all[i]);
  }
  return "SUCCESS";
}
