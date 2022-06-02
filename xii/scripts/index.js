function MatchTest() {
  return {
    columns: {
      名称: {
        label: "名称",
        edit: { type: "input", props: { value: ":name" } },
      },
      代码仓库地址: {
        label: "代码仓库地址",
        edit: { type: "input", props: { value: ":vcs_repository" } },
      },
      构建项目ID: {
        label: "构建项目ID",
        edit: { type: "input", props: { value: ":cicds_id" } },
      },
      状态: {
        label: "状态",
        edit: { type: "input", props: { value: ":result" } },
      },
      仓库类型: {
        label: "仓库类型",
        edit: {
          type: "select",
          props: {
            value: ":vcs_type",
            options: [
              { label: "github", value: "github" },
              { label: "gitlab", value: "gitlab" },
              { label: "gitee", value: "gitee" },
            ],
          },
        },
      },
    },
    list: {
      primary: "id",
      layout: {
        columns: [
          { name: "名称", width: 4 },
          { name: "代码仓库地址", width: 5 },
          { name: "构建项目ID", width: 3 },
          { name: "状态", width: 3 },
          { name: "仓库类型", width: 3 },
        ],
      },
    },
  };
}

// 测试记录
function TestRecord() {
  ///api/select/case?select=id,name&keyword=where_name_like
  return {
    columns: {
      ID: {
        label: "ID",
        edit: { type: "input", props: { value: ":id" } },
      },
      用例: {
        label: "用例",
        edit: {
          type: "select",
          props: {
            value: ":id",
            showSearch: true,
            remote: {
              api: "/api/select/case_list?select=id,name&keyword=where_name_like",
              query: { select: ["name", "id"], limit: 100 },
            },
          },
        },
      },
      测试数据: {
        label: "测试数据",
        edit: { type: "input", props: { value: ":input" } },
      },
      实际结果: {
        label: "实际结果",
        edit: { type: "input", props: { value: ":output" } },
      },
      测试结论: {
        label: "测试结论",
        edit: { type: "input", props: { value: ":result" } },
      },
    },
    list: {
      primary: "id",
      layout: {
        columns: [
          { name: "ID", width: 4 },
          { name: "用例", width: 6 },
          { name: "测试数据", width: 5 },
          { name: "实际结果", width: 5 },
          { name: "测试结论", width: 3 },
        ],
      },
    },
  };
}

function AfterSearch(data) {
  // 基础软硬件
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

  // 资源需求
  var package = Process("models.project.package.Get", {
    wheres: [{ column: "project_id", value: data.id }],
    withs: {
      package: {},
    },
  });
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

  // 适配性测试
  var match_test = Process("models.project.adapt.Get", {
    wheres: [{ column: "project_id", value: data.id }],
  });
  for (var k in match_test) {
    match_test[k].copy_id = match_test[k].id;
  }

  data.match_test = {
    data: match_test,
    delete: [],
    query: {
      sort: "$index",
    },
  };

  // 测试记录
  var project_test = Process("models.project.test.Get", {
    wheres: [{ column: "project_id", value: data.id }],
    withs: {
      case: {},
    },
  });
  for (var k in project_test) {
    project_test[k].copy_id = project_test[k].id;
    project_test[k].id = project_test[k].case_id;
    project_test[k].name = project_test[k].case.name;
  }

  data.test_record = {
    data: project_test,
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

  // 适配测试
  var match = payload.match_test;
  var match_deletes = match.delete;
  var match_data = match.data;

  if (match_deletes.length != 0) {
    var del = Process("models.project.adapt.DestroyWhere", {
      wheres: [{ column: "id", value: match_deletes, op: "in" }],
    });
  }

  for (var k in match_data) {
    if (match_data[k].copy_id && match_data[k].copy_id > 0) {
      Process("models.project.adapt.Save", {
        id: match_data[k].copy_id,
        name: match_data[k].name,
        vcs_repository: match_data[k].vcs_repository,
        vcs_type: match_data[k].vcs_type,
      });
      Process("flows.hooks.adapt.after_save", match_data[k].copy_id);
    } else {
      var id = Process("models.project.adapt.Save", {
        name: match_data[k].name,
        vcs_repository: match_data[k].vcs_repository,
        vcs_type: match_data[k].vcs_type,
        project_id: project_id,
      });
      Process("flows.hooks.adapt.after_save", id);
    }
  }

  // 测试记录
  var test_record = payload.test_record;
  var test_deletes = test_record.delete;
  var test_data = test_record.data;

  if (test_deletes.length != 0) {
    var del = Process("models.project.test.DestroyWhere", {
      wheres: [
        { column: "case_id", value: test_deletes, op: "in" },
        { column: "project_id", value: project_id, op: "=" },
      ],
    });
  }

  for (var l in test_data) {
    if (test_data[l].copy_id && test_data[l].copy_id > 0) {
      // 如果不一样的话,说明这个id是sku_id
      if (test_data[l].case_id != test_data[l].id) {
        Process("models.project.test.Save", {
          id: test_data[l].copy_id,
          case_id: test_data[l].id,
          input: test_data[l].input,
          output: test_data[l].output,
          result: test_data[l].result,
        });
      }
    } else {
      if (test_data[l].id > 0) {
        Process("models.project.test.Save", {
          project_id: project_id,
          case_id: test_data[l].id,
          input: test_data[l].input,
          output: test_data[l].output,
          result: test_data[l].result,
        });
      }
    }
  }
  return [payload];
}
