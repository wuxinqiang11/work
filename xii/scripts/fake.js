// 插入NPM软件包
function npmPackages() {
  var packages = Process(
    "xiang.network.Get",
    "https://registry.npmjs.com/-/v1/search?text=golang&size=200"
  );

  var data = [];
  for (var i in packages.data.objects) {
    var item = packages.data.objects[i];
    var name = item.package.name;
    var desc = item.package.description || "";
    var manu = item.package.author ? item.package.author.name : "未知";
    if (manu == "未知") {
      continue;
    }

    // 保存厂商
    var row = { name: manu };
    var manus = Process("models.manu.get", {
      select: ["id", "name"],
      limit: 1,
      wheres: [{ column: "name", op: "=", value: manu }],
    });

    if (manus.length > 0) {
      row["id"] = manus[0].id;
    }

    var manu_id = Process("models.manu.save", row);

    Process("models.package.save", {
      name: name,
      manu_id: manu_id,
      desc: desc,
      type: "软件包",
    });
  }
  return data;
}

// 插入国产操作系统
function chinaOS() {
  var oslist = [
    {
      name: "武汉深之度科技有限公司",
      short_name: "深度",
      products: [{ name: "deepin", type: "操作系统", desc: "深度操作系统" }],
    },
    {
      name: "麒麟软件有限公司",
      short_name: "麒麟软件",
      products: [
        { name: "Ubuntu Kylin", type: "操作系统", desc: "优麒麟操作系统" },
      ],
    },
    {
      name: "上海中标软件有限公司",
      short_name: "中标软件",
      products: [
        { name: "中标麒麟6.0", type: "操作系统", desc: "中标麒麟增强" },
      ],
    },
    {
      name: "北京中科红旗软件技术有限公司",
      short_name: "红旗软件",
      products: [{ name: "红旗Linux", type: "操作系统", desc: "红旗Linux" }],
    },
    {
      name: "龙芯中科技术股份有限公司",
      short_name: "龙芯",
      products: [
        { name: "龙芯1H", type: "CPU", desc: "龙心一号" },
        { name: "龙芯2K1000", type: "CPU", desc: "龙心二号" },
        { name: "龙芯3C5000L", type: "CPU", desc: "龙心三号" },
      ],
    },
    {
      name: "浪潮集团有限公司",
      short_name: "浪潮",
      products: [
        { name: "NF5280M6", type: "服务器", desc: "浪潮英信服务器" },
        { name: "NF5180M6", type: "服务器", desc: "浪潮英信服务器" },
        { name: "NF3280A6", type: "服务器", desc: "浪潮英信服务器" },
        { name: "AS13000G6-H", type: "服务器", desc: "分布式存储" },
        { name: "AS13000G6-CG", type: "服务器", desc: "分布式存储" },
      ],
    },
  ];

  for (var i in oslist) {
    var manus = Process("models.manu.get", {
      select: ["id", "name"],
      limit: 1,
      wheres: [{ column: "name", op: "=", value: oslist[i].name }],
    });

    if (manus.length > 0) {
      oslist[i]["id"] = manus[0].id;
    }

    var manu_id = Process("models.manu.save", oslist[i]);
    for (var j in oslist[i].products) {
      var product = oslist[i].products[j];
      Process("models.package.save", {
        name: product.name,
        manu_id: manu_id,
        desc: product.desc,
        type: product.type,
      });
    }
  }

  return oslist;
}

// 适配测试
function testSubmit() {
  var names = ["龙芯1H", "AS13000G6-H", "中标麒麟6.0"];
  var products = getProducts(names);

  // 测试资源
  Process(
    "models.project.resource.Insert",
    ["project_id", "sku_id", "amount"],
    [
      [1, 1, "1"],
      [1, 2, "1"],
      [1, 3, "1"],
    ]
  );

  // 基础软硬件环境
  Process(
    "models.project.package.Insert",
    ["project_id", "package_id"],
    [
      [1, products["龙芯1H"].id],
      [1, products["AS13000G6-H"].id],
      [1, products["中标麒麟6.0"].id],
    ]
  );

  // 更新状态
  Process("models.project.Save", { id: 1, status: "待提交" });
}

// 适配测试
function testPending() {
  var names = ["龙芯2K1000", "AS13000G6-CG", "Ubuntu Kylin"];
  var products = getProducts(names);

  // 测试资源
  Process(
    "models.project.resource.Insert",
    ["project_id", "sku_id", "amount"],
    [[2, 2, "2"]]
  );

  // 基础软硬件环境
  Process(
    "models.project.package.Insert",
    ["project_id", "package_id"],
    [
      [2, products["龙芯2K1000"].id],
      [2, products["AS13000G6-CG"].id],
      [2, products["Ubuntu Kylin"].id],
    ]
  );

  // 添加测试数据
  addTestData(2);

  // 更新状态
  Process("models.project.Save", { id: 2, status: "进行中" });
}

// 适配结果
function testComplete() {
  var names = ["龙芯3C5000L", "AS13000G6-CG", "deepin"];
  var products = getProducts(names);

  // 测试资源
  Process(
    "models.project.resource.Insert",
    ["project_id", "sku_id", "amount"],
    [[3, 3, "1"]]
  );

  // 硬件软件环境
  Process(
    "models.project.package.Insert",
    ["project_id", "package_id", "type"],
    [
      [3, products["龙芯3C5000L"].id],
      [3, products["AS13000G6-CG"].id],
      [3, products["deepin"].id],
    ]
  );

  // 添加测试数据
  addTestData(3);

  // 更新状态
  Process("models.project.Save", { id: 3, status: "已完成", result: "通过" });
}

// 添加测试数据
function addTestData(project_id) {
  var pid = parseInt(project_id);
  var pre = pid * 100;
  var features = [
    { id: pre + 1, name: "功能性测试", project_id: pid },
    { id: pre + 2, name: "虚拟机管理器", parent_id: pre + 1, project_id: pid },
    {
      id: pre + 3,
      name: "虚拟机管理器运维",
      parent_id: pre + 2,
      project_id: pid,
    },
    { id: pre + 4, name: "CPU虚拟化", parent_id: pre + 2, project_id: pid },
    { id: pre + 5, name: "内存虚拟化", parent_id: pre + 2, project_id: pid },
    { id: pre + 6, name: "I/O虚拟化", parent_id: pre + 2, project_id: pid },
    { id: pre + 7, name: "设备虚拟化", parent_id: pre + 2, project_id: pid },
    { id: pre + 8, name: "隔离", parent_id: pre + 2, project_id: pid },
  ];

  var cases = [
    {
      id: pre + 1,
      project_id: pid,
      sn: "1.1.1",
      name: "虚拟机管理器-虚拟机管理运维",
      feature_id: pre + 3,
      dest: "验证是否支持服务器通用安装方式，如ISO 或PXE 等",
      std: "测试结果符合期望结果时，此测试项目通过。",
      steps: "1.准备希云XVP ISO光盘或U盘 2.插入ISO光盘或U盘，启动服务器并安装",
      output: "通过XVP ISO文件可以将XVP安装完毕，并正常运行。",
      prepare: "服务器以及虚拟化平台正常运行",
      rule: "符合期望结果为通过，其他为不符合。",
    },
    {
      id: pre + 2,
      project_id: pid,
      sn: "1.1.2",
      name: "虚拟机管理器-虚拟机管理运维",
      feature_id: pre + 3,
      dest: "验证是否支持热迁移能力",
      std: "测试结果符合期望结果时，此测试项目通过。",
      steps: "1.右键要操作的虚机；2.选择迁移",
      output: "虚拟机成功迁移",
      prepare: "服务器以及虚拟化平台正常运行",
      rule: "符合期望结果为通过，其他为不符合。",
    },
    {
      id: pre + 3,
      project_id: pid,
      sn: "1.2.1",
      name: "虚拟机管理器-CPU虚拟化",
      feature_id: pre + 4,
      dest: "验证是否支持CPU 硬件辅助虚拟化技术，无需修改虚拟机Guest 操作系统",
      std: "测试结果符合期望结果时，此测试项目通过。",
      steps:
        "1.选择某台物理服务器，进入命令终端 2.执行CPU硬件辅助虚拟化命令 3.查看本台服务器上虚拟机状况",
      output: "支持 CPU 硬件辅助虚拟化技术，无需修改虚拟机 Guest 操作系统",
      prepare: "服务器以及虚拟化平台正常运行",
      rule: "符合期望结果为通过，其他为不符合。",
    },
  ];

  var tests = [
    {
      project_id: pid,
      case_id: pre + 1,
      input: "-",
      output: "与期望结果一致",
      result: "通过",
    },
    {
      project_id: pid,
      case_id: pre + 2,
      input: "-",
      output: "与期望结果一致",
      result: "通过",
    },
    {
      project_id: pid,
      case_id: pre + 3,
      input: "-",
      output: "与期望结果一致",
      result: "通过",
    },
  ];

  var feature_ids = [];
  for (var i in features) {
    feature_ids.push(Process("models.project.feature.Create", features[i]));
  }

  var case_ids = [];
  for (var i in cases) {
    case_ids.push(Process("models.project.case.Create", cases[i]));
  }

  var test_ids = Process("models.project.test.EachSave", tests);

  return {
    project_id: pid,
    features: feature_ids,
    cases: case_ids,
    tests: test_ids,
  };
}

// 读取产品信息
function getProducts(names) {
  var products = Process("models.package.Get", {
    wheres: [{ column: "name", op: "in", value: names }],
  });

  var res = {};
  for (var i in products) {
    var name = products[i].name;
    res[name] = products[i];
  }

  return res;
}
