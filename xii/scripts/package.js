function PackageSetting() {
  return {
    columns: {
      资源名称: {
        label: "资源名称",
        edit: {
          type: "select",
          props: {
            value: ":id",
            showSearch: true,
            remote: {
              api: "/api/select/sku?select=id,name&keyword=where_name_like",
              query: { select: ["name", "id"], limit: 100 },
            },
          },
        },
      },

      CPU核: {
        label: "CPU核",
        view: {
          type: "label",
          props: {
            value: ":cpu",
          },
        },
        edit: { type: "input", props: { value: ":cpu" } },
      },
      内存: {
        label: "内存",
        edit: { type: "input", props: { value: ":memory" } },
      },
      磁盘: {
        label: "磁盘",
        edit: { type: "input", props: { value: ":disk" } },
      },
      数量: {
        label: "数量",
        edit: { type: "input", props: { value: ":amount" } },
      },
    },
    list: {
      primary: "id",
      layout: {
        columns: [
          { name: "资源名称", width: 10 },
          { name: "数量", width: 5 },
        ],
      },
    },
  };
}

function AfterSearch(data) {
  // 拼接数据
  var project = Process("models.project.resource.Get", {
    wheres: [{ column: "project_id", value: data.id }],
    withs: {
      sku: {},
    },
  });
  for (var i in project) {
    project[i].name = project[i].sku.name;
    project[i].cpu = project[i].sku.cpu;
    project[i].disk = project[i].sku.disk;
    project[i].memory = project[i].sku.memory;
    project[i].stock = project[i].sku.stock;
    project[i].type = project[i].sku.type;

    // 复制一份id
    project[i].copy_id = project[i].id;
    project[i].id = project[i].sku_id;
  }
  data.package = {
    data: project,
    delete: [],
    query: {
      sort: "$index",
    },
  };

  var package = Process("models.project.package.Get", {
    wheres: [{ column: "project_id", value: data.id }],
    withs: {
      package: {},
    },
  });
  console.log(package);
  for (var j in package) {
    package[j].name =
      package[j].package.type +
      ":" +
      package[j].package.name +
      "(" +
      package[j].package.desc +
      ")";
    package[j].copy_id = package[j].id;
    package[j].id = package[j].package_id;
  }

  data.soft = {
    data: package,
    delete: [],
    query: {
      sort: "$index",
    },
  };
  return data;
}

function BeforeSave(payload) {
  var project_id = payload.id;
  var packsge = payload.package;
  var deletes = packsge.delete;
  var data = packsge.data;
  // return payload
  // 把不要的删除了
  if (deletes.length != 0) {
    var del = Process("models.project.resource.DestroyWhere", {
      wheres: [
        { column: "sku_id", value: deletes, op: "in" },
        { column: "project_id", value: project_id, op: "=" },
      ],
    });
  }
  for (var i in data) {
    var amount = data[i].amount > 0 ? data[i].amount : 1;
    // 有这个id说明是更新的
    if (data[i].copy_id && data[i].copy_id > 0) {
      // 如果不一样的话,说明这个id是sku_id
      if (data[i].sku_id != data[i].id) {
        Process("models.project.resource.Save", {
          id: data[i].copy_id,
          sku_id: data[i].id,
          amount: data[i].amount,
        });
      }
    } else {
      if (data[i].id > 0) {
        Process("models.project.resource.Save", {
          project_id: project_id,
          sku_id: data[i].id,
          amount: amount,
        });
      }
    }
  }

  var soft = payload.soft;
  var soft_deletes = soft.delete;
  var soft_data = soft.data;

  if (soft_deletes.length != 0) {
    var del = Process("models.project.package.DestroyWhere", {
      wheres: [
        { column: "package_id", value: soft_deletes, op: "in" },
        { column: "project_id", value: project_id, op: "=" },
      ],
    });
  }

  for (var j in soft_data) {
    if (soft_data[j].copy_id && soft_data[j].copy_id > 0) {
      // 如果不一样的话,说明这个id是sku_id
      if (soft_data[j].package_id != soft_data[j].id) {
        Process("models.project.package.Save", {
          id: soft_data[j].copy_id,
          package_id: soft_data[j].id,
        });
      }
    } else {
      if (soft_data[j].id > 0) {
        Process("models.project.package.Save", {
          project_id: project_id,
          package_id: soft_data[j].id,
        });
      }
    }
  }
  return [payload];
}
