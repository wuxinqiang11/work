function main() {
  projects = project();
  return {
    厂商: manu(),
    厂商用户: manuUser(),
    产品: product(),
    产品类型: productKind(),
    项目: projects,
    证书: cert(),
    人才: trainee(),
    题库: question(),
    考试: exam(),
    考试证书: traineeCert(),
    工单: ticket(),
    词条: entry(),
    FAQ: faq(),
    资源型号: resourceSku(),
    资源: resource(projects),
    资源消耗: usage(),
    适配测试: adapt(),
    构建任务: adapt_jobs(),
  };
}

// 适配测试
function adapt() {
  return [
    {
      id: 1,
      project_id: 2,
      name: "CPU兼容性测试",
      vcs_type: "github",
      vcs_repository: "https://github.com/trheyi/cidemo.git",
    },
  ];
}

// 构建任务
function adapt_jobs() {
  return [
    {
      id: 1,
      adapt_id: 1,
      branch: "main",
      tag: "v0.1.0",
      cpu: "loongson",
      os: "ubuntu18.04",
      dockerfile: "Dockerfile.java",
      store_artifacts:
        "/java-demo/target/simple-maven-project-with-tests-1.0-SNAPSHOT.jar",
    },
    {
      id: 2,
      adapt_id: 1,
      branch: "main",
      tag: "v0.2.0",
      cpu: "zhaoxin",
      os: "ubuntu18.04",
      dockerfile: "Dockerfile.java",
      store_artifacts:
        "/java-demo/target/simple-maven-project-with-tests-1.0-SNAPSHOT.jar",
    },
  ];
}

// 资源消耗
function usage() {
  var mydate = new Date("2006-01-02T00:00:00");
  data = [];
  for (var i = 0; i < 1440; i++) {
    var row = {
      cpu: (Math.random() * 100).toFixed(2),
      memory: (Math.random() * 100).toFixed(2),
      disk: (Math.random() * 50).toFixed(2),
      time: mydate.toISOString().replace("T", " ").replace(".000Z", ""),
    };
    data.push(row);
    mydate.setMinutes(mydate.getMinutes() + 1);
  }
  return data;
}

function now() {
  return new Date().toISOString().split("T")[0];
}

// F.A.Q
function faq() {
  return [
    {
      question: "什么是“信创”？",
      answer:
        "2016年3月4日，24家专业从事软硬件关键技术研究及应用的国内单位，共同发起成立了一个非营利性社会组织，并将其命名为“信息技术应用创新工作委员会”。",
    },
    {
      question: "为什么要搞“信创”？",
      answer:
        "“信创”其实是个比较“低调”的称谓。它的核心本质，就是自（fǎn）主（zhì）可（lǎo）控（měi）。",
    },
    {
      question: "“信创”到底包括哪些产业？",
      answer:
        "信创产业的生态体系极为庞大。从产业链角度来看，它主要由基础硬件、基础软件、应用软件、信息安全这四部分构成。",
    },
    {
      question: "除了安全可控，“信创”还有别的发展动力吗？",
      answer:
        "首先，国内推出“新基建”战略，大力推动数字化转型，建设“数字中国”。这就意味着，我们在数字基础设施上，将会有大量的建设需求。",
    },
    {
      question: "国内“信创”产业推进，采取了怎样的策略？",
      answer:
        "针对安全可控，我们国家提出的是“2+8”体系。“2”指党、政；“8”指关于国计民生的八大行业：金融、电力、电信、石油、交通、教育、医疗、航空航天。",
    },
    {
      question: "“信创”目前处于一个怎样的发展状态？",
      answer: "全年（2020年）被公认为国内信创产业的落地元年。",
    },
    {
      question: "目前，“信创”面临怎样的机遇和挑战？",
      answer:
        "关键技术仍未完全突破，尤其是上游核心技术，仍有部分被国外企业垄断，需要进一步加强技术攻关和资源扶持。",
    },
  ];
}

// 词条
function entry() {
  return [
    { name: "CPU", content: "中央处理器" },
    { name: "操作系统", content: "操作系统 Linux , Windows, MacOS" },
    { name: "数据库", content: "数据库 MySQL, Oracle, 巨山" },
    { name: "中间件", content: "中间件 DB Gateway" },
    { name: "流版签", content: "电子签章系统 办公软件系统等合称" },
  ];
}

// 工单
function ticket() {
  return [
    {
      title: "Ubuntu 操作系统编译无法通过",
      content: "Ubuntu 操作系统编译无法通过",
      project_id: randArr([1, 2, 3, 4]),
      status: "开放中",
    },
    {
      title: "第132行段错误",
      content: "CentOS 第132行段错误",
      project_id: randArr([1, 2, 3, 4]),
      status: "已关闭",
    },
    {
      title: "Make出错",
      content: "Make出错,编译失败",
      project_id: randArr([1, 2, 3, 4]),
      status: "已解决",
    },
  ];
}

// 证书
function traineeCert() {
  var data = [];
  for (var i = 1; i <= 30; i++) {
    var score = randArr([50, 60, 70, 80, 90, 100]);
    var status = "未通过";
    var exam_id = randArr([1, 2, 3, 4]);
    if (score >= 60) {
      status = "已颁发";
    }
    data.push({
      trainee_id: i,
      exam_id: exam_id,
      score: score,
      status: status,
      create_time: randArr([
        "2021-01-01 00:00:00",
        "2021-01-02 00:00:00",
        "2021-01-03 00:00:00",
        "2021-01-04 00:00:00",
        "2021-01-05 00:00:00",
        "2021-01-06 00:00:00",
        "2021-01-07 00:00:00",
      ]),
    });
  }
  return data;
}

// 考试
function exam() {
  var qids = function () {
    return randArrUnique(10, function () {
      return randArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
    });
  };
  var data = [
    { name: "2021年冬季信创初级工程师认证考试", question_ids: qids() },
    { name: "2021年冬季信创中级工程师认证考试", question_ids: qids() },
    { name: "2021年冬季信创高级工程师认证考试", question_ids: qids() },
    { name: "2021年冬季信创专家认证考试", question_ids: qids() },
  ];
  return data;
}

// 题库
function question() {
  return [
    {
      question: "对于⽬前国产操作系统中描述正确的是:",
      answer: "A",
    },
    {
      question: "下列国产CPU中性能较为领先的是:",
      answer: "C",
    },
    {
      question: "统信UOS操作系统的底层来源于:",
      answer: "A",
    },
    {
      question: "下列数据库中选出未⽀持的是:",
      answer: "B",
    },
    {
      question: "关于宝德鲲鹏服务器与华为泰⼭服务器描述正确的是:",
      answer: "D",
    },
    {
      question: "下列关于信创⽣态描述正确的是:",
      answer: "A",
    },
    {
      question: "鲲鹏920是采⽤（）⼯艺:",
      answer: "C",
    },
    {
      question: "华为鲲鹏BMS云服务器最⾼可提供多少核:",
      answer: "B",
    },
    {
      question: "以下哪项不是鲲鹏服务器的优点:",
      answer: "A",
    },
    {
      question: "下列关于宝德⾃强服务器描述正确的是:",
      answer: "C",
    },
    {
      question: "以下哪些属于华为云鲲鹏伙伴计划:",
      answer: "B",
    },
    {
      question: "我国⾃主可控有三⼤主⼒军:",
      answer: "A",
    },
    {
      question: "⽬前国产CPU⾯临的挑战:",
      answer: "A",
    },
  ];
}

// 人才
function trainee() {
  var data = [];
  var mobiles = randMobiles(30);
  for (var i = 0; i < 30; i++) {
    data.push({
      id: i + 1,
      name: randName(),
      mobile: mobiles[i],
      title: randArr(["高级工程师", "初级工程师", "中级工程师", "信创专家"]),
      create_time: randArr([
        "2021-01-01 00:00:00",
        "2021-01-02 00:00:00",
        "2021-01-03 00:00:00",
        "2021-01-04 00:00:00",
        "2021-01-05 00:00:00",
        "2021-01-06 00:00:00",
        "2021-01-07 00:00:00",
      ]),
    });
  }
  return data;
}

// 证书
function cert() {
  return [
    { product_id: 2, status: "草稿" },
    { product_id: 4, status: "已签发" },
  ];
}

// 项目
function project() {
  var data = [
    {
      id: 1,
      product_id: 1,
      name: "华星实时数据库信创测试",
      desc: "测试实时数据库国产CPU兼容性",
      status: "待提交",
      cert_status: "待申请",
      script: {
        jobs: [
          {
            image: "ubuntu 18.04-Long",
            run: "test.sh",
          },
          {
            image: "ubuntu 18.04-Feiteng",
            run: "test.sh",
          },
        ],
      },
      result: "待测试",
      log: null,
    },
    {
      id: 2,
      product_id: 2,
      name: "华星一卡通CPU兼容性测试",
      desc: "华星一卡通CPU兼容性测试CPU兼容性",
      status: "进行中",
      cert_status: "待申请",
      script: {
        jobs: [
          {
            image: "ubuntu 18.04-Long",
            run: "test.sh",
          },
          {
            image: "ubuntu 18.04-Feiteng",
            run: "test.sh",
          },
        ],
      },
      result: "通过",
      log: "2021/12/07 16:41:51 success",
    },
    {
      id: 3,
      product_id: 3,
      name: "华星ERP",
      desc: "华星ERP兼容性测试CPU兼容性",
      status: "已完成",
      cert_status: "待申请",
      script: {
        jobs: [
          {
            image: "ubuntu 18.04-Long",
            run: "test.sh",
          },
          {
            image: "ubuntu 18.04-Feiteng",
            run: "test.sh",
          },
        ],
      },
      result: "未通过",
      log: "2021/12/07 16:41:51 failure",
    },
    {
      id: 4,
      product_id: 4,
      name: "华星IWM",
      desc: "华星IWM兼容性测试CPU兼容性",
      status: "已完成",
      cert_status: "已签发",
      script: {
        jobs: [
          {
            image: "ubuntu 18.04-Long",
            run: "test.sh",
          },
          {
            image: "ubuntu 18.04-Feiteng",
            run: "test.sh",
          },
        ],
      },
      result: "通过",
      log: "2021/12/07 16:41:51 failure",
    },
  ];

  for (i = 5; i < 200; i++) {
    var status = randArr(["待提交", "待审核", "进行中", "已完成"]);
    var result = "待测试";
    var log = null;
    if (status == "已完成") {
      result = randArr(["未通过", "通过"]);
      log = "2021/12/07 16:41:51 test";
    }
    data.push({
      id: i,
      product_id: i,
      name: "测试项目" + i,
      desc: "测试项目" + i,
      status: status,
      result: result,
      cert_status: "已签发",
      script: {
        jobs: [
          {
            image: "ubuntu 18.04-Long",
            run: "test.sh",
          },
          {
            image: "ubuntu 18.04-Feiteng",
            run: "test.sh",
          },
        ],
      },
      log: log,
    });
  }

  for (i in data) {
    data[i]["create_time"] = randArr([
      "2021-01-01 00:00:00",
      "2021-01-02 00:00:00",
      "2021-01-03 00:00:00",
      "2021-01-04 00:00:00",
      "2021-01-05 00:00:00",
      "2021-01-06 00:00:00",
      "2021-01-07 00:00:00",
    ]);
  }
  return data;
}

// 产品
function product() {
  var data = [
    {
      id: 1,
      name: "实时数据库",
      manu_id: 1,
      kind_id: 7,
      desc: "底层数据造成传输，分析、展示每个节点的结果实时展示。综合报表，设备运转情况。",
      scene: "生产经营",
    },
    {
      id: 2,
      name: "一卡通",
      manu_id: 1,
      kind_id: 10,
      desc: "排队叫号、自动调度、银企直连、电商、销售一体化，销售、财务、发货、计量为一体。",
      scene: "经营管理",
    },
    {
      id: 3,
      name: "ERP",
      manu_id: 1,
      kind_id: 10,
      desc: "",
      scene: "经营管理",
    },
    {
      id: 4,
      name: "IWM",
      manu_id: 1,
      kind_id: 7,
      desc: "智能仓库管理系统",
      scene: "生产管理",
    },
    {
      id: 5,
      name: "LIMS",
      manu_id: 1,
      kind_id: 10,
      desc: "实验项目、仪器设备、易耗品管理、仪器借用、人员情况、仪器标定等，并且都有查询功能，报表打印功",
      scene: "实验管理",
    },
    {
      id: 6,
      name: "考勤",
      manu_id: 1,
      kind_id: 10,
      desc: "所有人员考勤系统",
      scene: "经营管理",
    },
    {
      id: 7,
      name: "巡检",
      manu_id: 1,
      kind_id: 10,
      desc: "设备及管线巡查",
      scene: "经营管理",
    },
    {
      id: 8,
      name: "安全信息管理平台",
      manu_id: 1,
      kind_id: 9,
      desc: "综合平台，企业下层仪表在线率、有变动报警；计算每月的",
      scene: "生产经营",
    },
    {
      id: 9,
      name: "危化品装车审核系统",
      manu_id: 1,
      kind_id: 10,
      desc: "实现整个装车过程电子化；司机运输资质以及其他人员的资质保存平台；无变动就不会再出示。",
      scene: "仓库",
    },
    {
      id: 10,
      name: "采购电商",
      manu_id: 1,
      kind_id: 10,
      desc: "",
      scene: "经营管理",
    },
  ];

  for (i = 11; i < 200; i++) {
    data.push({
      id: i,
      name: "测试产品" + i,
      manu_id: randArr([1, 2, 3]),
      kind_id: randArr([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      desc: "",
      scene: randArr(["经营管理", "仓库", "生产经营", "实验管理"]),
    });
  }

  for (i in data) {
    data[i]["create_time"] = randArr([
      "2021-01-01 00:00:00",
      "2021-01-02 00:00:00",
      "2021-01-03 00:00:00",
      "2021-01-04 00:00:00",
      "2021-01-05 00:00:00",
      "2021-01-06 00:00:00",
      "2021-01-07 00:00:00",
    ]);
  }

  return data;
}

// 产品类型
function productKind() {
  return [
    { id: 1, name: "CPU" },
    { id: 2, name: "服务器" },
    { id: 3, name: "存储" },
    { id: 4, name: "云平台" },
    { id: 5, name: "操作系统" },
    { id: 6, name: "中间件" },
    { id: 7, name: "数据库" },
    { id: 8, name: "软件包" },
    { id: 9, name: "安全" },
    { id: 10, name: "管理系统" },
  ];
}

// 厂商数据
function manu() {
  return [
    {
      id: 1,
      name: "华星科技集团有限公司",
      short_name: "华星",
      province: "广东省",
      city: "广州市",
      contact_name: randName(),
      contact_mobile: randMobile(),
    },
    {
      id: 2,
      name: "风神科技集团有限公司",
      short_name: "风神",
      province: "北京市",
      city: "北京市",
      contact_name: randName(),
      contact_mobile: randMobile(),
    },
    {
      id: 3,
      name: "星火技集团有限公司",
      short_name: "星火",
      province: "北京市",
      city: "北京市",
      contact_name: randName(),
      contact_mobile: randMobile(),
    },
  ];
}

// 厂商用户数据
function manuUser() {
  return [
    {
      id: 1,
      manu_id: 1,
      mobile: randMobile(),
      email: "test1@iqka.com",
      name: randName(),
      status: "enabled",
      password: "Ak123456+",
    },
    {
      id: 2,
      manu_id: 2,
      mobile: randMobile(),
      email: "test2@iqka.com",
      name: randName(),
      status: "enabled",
      password: "Ak123456+",
    },
    {
      id: 3,
      manu_id: 3,
      email: "test3@iqka.com",
      mobile: randMobile(),
      name: randName(),
      status: "enabled",
      password: "Ak123456+",
    },
  ];
}

var resourceContainterParams = {
  prepare: {
    revision_id: "620cac10594c10279c1fbef8",
    svrpool_id: "605d8a4f594c100e521ea879",
    name: "0.6462761704501834",
  },
  create: {
    service_seq_binded_ip: { nginx: {} },
    template_id: "620cabba594c10279c1fbef7",
    steps: {},
    node_deploy_info: { nginx: { "86a8bc809913490bb204620b": 1 } },
    template_name: "test-id",
    instance_tpldata: { nginx: { IMAGE_TAG: "latest" } },
    origin_type: "template",
    service_binded_env: { nginx: ["TZ=Asia/Shanghai"] },
    service_binded_network: { nginx: "default" },
    service_binded_quota: {
      nginx: {
        Memory: 0,
        CpuCores: 0,
        IngressBandwidth: 0,
        EgressBandwidth: 0,
        DiskReadMBps: 0,
        DiskWriteMBps: 0,
        DiskReadIops: 0,
        DiskWriteIops: 0,
        DiskSize: 0,
      },
    },
  },
};

// 资源型号
function resourceSku() {
  var data = [];
  for (var i = 1; i < 51; i++) {
    var type = randArr(["物理机", "虚拟机", "轻虚拟机", "容器"]);
    if (i == 1) {
      type = "虚拟机";
    } else if (i == 2) {
      type = "轻虚拟机";
    } else if (i == 3) {
      type = "容器";
    }

    var params = {};
    switch (type) {
      case "虚拟机":
        params = { node: "cmp", vmid: 100 };
        break;
      case "轻虚拟机":
        params = { node: "cmp", vmid: 103 };
        break;
      case "容器":
        params = resourceContainterParams;
        break;
    }

    data.push({
      id: i,
      name: type + "型号-BJ-" + i,
      memory: randArr([16384, 8192, 4096, 2048, 1024, 512, 256, 128]),
      cpu: randArr([1, 2, 4, 6, 8, 16, 24]),
      disk: randArr([32, 64, 128, 256, 512, 1024, 2048]),
      params: params,
      type: type,
      stock: (Math.random() * 100).toFixed(0),
    });
  }
  return data;
}

// 资源
function resource(projects) {
  var data = [];
  var pendings = [];
  for (var i in projects) {
    var project = projects[i] || {};
    if (project.status == "已完成" || project.status == "进行中") {
      pendings.push(project);
    }
  }

  var project_ids = Process("xiang.helper.ArrayColumn", pendings, "id");
  for (var i = 1; i < 400; i++) {
    sku_id = (Math.random() * 49 + 1).toFixed(0);
    data.push({
      id: i,
      sku_id: sku_id,
      project_id: randArr(project_ids),
      status: randArr(["在线", "下线"]),
      create_time: randArr([
        "2021-01-01 00:00:00",
        "2021-01-02 00:00:00",
        "2021-01-03 00:00:00",
        "2021-01-04 00:00:00",
        "2021-01-05 00:00:00",
        "2021-01-06 00:00:00",
        "2021-01-07 00:00:00",
      ]),
    });
  }
  return data;
}

function randName() {
  var first =
    "王,李,张,刘,陈,杨,黄,赵,周,吴,徐,孙,马,胡,朱,郭,何,罗,高,林".split(",");
  var name =
    "澄邈,德泽,海超,海阳,海荣,海逸,海昌,瀚钰,瀚文,涵亮,涵煦,明宇,涵衍,浩皛,浩波,浩博,浩初,浩宕,浩歌,浩广,浩邈,浩气,浩思,浩言,鸿宝,鸿波,鸿博,鸿才,鸿畅,鸿畴,鸿达,鸿德,鸿飞,鸿风,鸿福,鸿光,鸿晖,鸿朗,鸿文,鸿轩,鸿煊,鸿骞,鸿远,鸿云,鸿哲,鸿祯,鸿志,鸿卓,嘉澍,光济,澎湃,彭泽,鹏池,鹏海,浦和,浦泽,瑞渊,越泽,博耘,德运,辰宇,辰皓,辰钊,辰铭,辰锟,辰阳,辰韦,辰良,辰沛,晨轩,晨涛,晨濡,晨潍,鸿振,吉星,铭晨,起运,运凡,运凯,运鹏,运浩,运诚,运良,运鸿,运锋,运盛,运升,运杰,运珧,运骏,运凯,运乾,维运,运晟,运莱,运华,耘豪,星爵,星腾,星睿,星泽,星鹏,星然,震轩,震博,康震,震博,振强,振博,振华,振锐,振凯,振海,振国,振平,昂然,昂雄,昂杰,昂熙,昌勋,昌盛,昌淼,昌茂,昌黎,昌燎,昌翰,晨朗,德明,德昌,德曜,范明,飞昂,高旻,晗日,昊然,昊天,昊苍,昊英,昊宇,昊嘉,昊明,昊伟,昊硕,昊磊,昊东,鸿晖,鸿朗,华晖,金鹏,晋鹏,敬曦,景明,景天,景浩,俊晖,君昊,昆琦,昆鹏,昆纬,昆宇,昆锐,昆卉,昆峰,昆颉,昆谊,昆皓,昆鹏,昆明,昆杰,昆雄,昆纶,鹏涛,鹏煊,曦晨,曦之,新曦,旭彬,旭尧,旭鹏,旭东,旭炎,炫明,宣朗,学智,轩昂,彦昌,曜坤,曜栋,曜文,曜曦,曜灿,曜瑞,智伟,智杰,智刚,智阳,昌勋,昌盛,昌茂,昌黎,昌燎,昌翰,晨朗,昂然,昂雄,昂杰,昂熙,范明,飞昂,高朗,高旻,德明,德昌,德曜,智伟,智杰,智刚,智阳,瀚彭,旭炎,宣朗,学智,昊然,昊天,昊苍,昊英,昊宇,昊嘉,昊明,昊伟,鸿朗,华晖,金鹏,晋鹏,敬曦,景明,景天,景浩,景行,景中,景逸,景彰,昆鹏,昆明,昆杰,昆雄,昆纶,鹏涛,鹏煊,景平,俊晖,君昊,昆琦,昆鹏,昆纬,昆宇,昆锐,昆卉,昆峰,昆颉,昆谊,轩昂,彦昌,曜坤,曜文,曜曦,曜灿,曜瑞,曦晨,曦之,新曦,鑫鹏,旭彬,旭尧,旭鹏,旭东,浩轩,浩瀚,浩慨,浩阔,鸿熙,鸿羲,鸿禧,鸿信,泽洋,泽雨,哲瀚,胤运,佑运,允晨,运恒,运发,云天,耘志,耘涛,振荣,振翱,中震,子辰,晗昱,瀚玥,瀚昂,瀚彭,景行,景中,景逸,景彰,绍晖,文景,曦哲,永昌,子昂,智宇,智晖,晗日,晗昱,瀚昂,昊硕,昊磊,昊东,鸿晖,绍晖,文昂,文景,曦哲,永昌,子昂,智宇,智晖,浩然,鸿运,辰龙,运珹,振宇,高朗,景平,鑫鹏,昌淼,炫明,昆皓,曜栋,文昂,治汇".split(
      ","
    );

  return randArr(first) + randArr(name);
}

function randArr(arrs) {
  var i = Math.floor(Math.random() * arrs.length);
  return arrs[i];
}

function randMobile() {
  var mobile = "13";
  for (var i = 0; i < 9; i++) {
    mobile = mobile + randArr([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }
  return mobile;
}

function randDateTime() {
  var month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  var year = ["2017", "2018", "2019", "2020", "2021"];
  var day = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
  ];

  var hour = ["08", "09", "10", "11", "13", "14", "15", "16", "17", "18", "19"];

  var time = [];
  for (var i = 0; i < 60; i++) {
    if (i < 10) {
      time.push("0" + i);
    } else {
      time.push(i);
    }
  }

  return (
    randArr(year) +
    "-" +
    randArr(month) +
    "-" +
    randArr(day) +
    " " +
    randArr(hour) +
    ":" +
    randArr(time) +
    ":" +
    randArr(time)
  );
}

function keys(object) {
  var keys = [];
  for (var key in object) {
    keys.push(key);
  }
  return keys;
}

function randArrUnique(size, call) {
  size = size || 10;
  var valueMaps = {};
  while (keys(valueMaps).length <= size) {
    var value = call();
    valueMaps[value] = true;
  }
  return keys(valueMaps);
}

function randMobiles(size) {
  size = size || 10;
  var mobileMaps = {};
  while (keys(mobileMaps).length <= size) {
    var mobile = randMobile();
    mobileMaps[mobile] = true;
  }
  return keys(mobileMaps);
}
