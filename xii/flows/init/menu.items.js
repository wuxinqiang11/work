function main() {
  return [
    {
      id: 1,
      name: "看板",
      path: "/kanban/index",
      icon: "icon-activity",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    // {
    //   id: 2,
    //   name: "数据分析",
    //   path: "/chart/sale",
    //   icon: "icon-pie-chart",
    //   rank: 2,
    //   status: "enabled",
    //   visible_menu: 1,
    //   blocks: 0,
    // },
    {
      id: 3,
      name: "厂商",
      path: "/table/manu.index",
      icon: "icon-book",
      rank: 3,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 4,
      name: "产品",
      path: "/table/product.index",
      icon: "icon-hard-drive",
      rank: 4,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 50,
      name: "基础软硬件",
      path: "/table/package.index",
      icon: "icon-package",
      rank: 4,
      status: "enabled",
      visible_menu: 0,
      blocks: 0,
      parent: null,
    },
    {
      id: 32,
      name: "资源",
      path: "/table/resource.host",
      icon: "icon-cpu",
      rank: 5,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 35,
      name: "主机",
      path: "/table/resource.host",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 36,
      name: "容器",
      path: "/table/resource.container",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 37,
      name: "虚拟机",
      path: "/table/resource.vm",
      rank: 3,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 38,
      name: "轻虚拟机",
      path: "/table/resource.lvm",
      rank: 4,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 39,
      name: "项目资源",
      path: "/table/resource.index",
      rank: 5,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 40,
      name: "资源型号",
      path: "/table/resource.sku",
      rank: 6,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 32,
    },
    {
      id: 5,
      name: "信创测试",
      path: "/table/project.index",
      icon: "icon-thermometer",
      rank: 5,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 6,
      name: "认证",
      path: "/table/cert.submit",
      icon: "icon-shield",
      rank: 6,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 7,
      name: "人才",
      path: "/table/training.index",
      icon: "icon-users",
      rank: 7,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 8,
      name: "支持",
      path: "/table/support.ticket",
      icon: "icon-headphones",
      rank: 8,
      status: "enabled",
      visible_menu: 0,
      blocks: 0,
      parent: null,
    },
    {
      id: 9,
      name: "知识库",
      path: "/table/wiki.entry",
      icon: "icon-compass",
      rank: 9,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: null,
    },
    {
      id: 10,
      name: "指挥中心",
      path: "/kanban/index",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 1,
    },
    {
      id: 12,
      name: "适配测试",
      path: "/kanban/project",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 1,
    },
    {
      id: 13,
      name: "信创产品",
      path: "/kanban/product",
      rank: 3,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 1,
    },
    {
      id: 14,
      name: "信创人才",
      path: "/kanban/trainee",
      rank: 4,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 1,
    },
    {
      id: 15,
      name: "厂商管理",
      path: "/table/manu.index",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 3,
    },
    {
      id: 16,
      name: "厂商用户",
      path: "/table/manu.user",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 3,
    },
    {
      id: 17,
      name: "产品管理",
      path: "/table/product.index",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 4,
    },
    {
      id: 18,
      name: "产品类型",
      path: "/table/product.kind",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 4,
    },
    {
      id: 20,
      name: "项目送测",
      path: "/table/project.submit",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 5,
    },
    {
      id: 21,
      name: "送测审批",
      path: "/table/project.approval",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 5,
    },
    {
      id: 22,
      name: "适配测试",
      path: "/table/project.index",
      rank: 3,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 5,
    },
    {
      id: 33,
      name: "适配结果",
      path: "/table/project.complete",
      rank: 4,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 5,
    },
    {
      id: 24,
      name: "人才",
      path: "/table/training.index",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 7,
    },
    {
      id: 25,
      name: "考试",
      path: "/table/training.exam",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 7,
    },
    {
      id: 26,
      name: "题库",
      path: "/table/training.question",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 7,
    },
    {
      id: 27,
      name: "证书",
      path: "/table/training.cert",
      rank: 3,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 7,
    },
    {
      id: 28,
      name: "词条",
      path: "/table/wiki.entry",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 9,
    },
    {
      id: 29,
      name: "F.A.Q",
      path: "/table/wiki.faq",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 9,
    },
    {
      id: 30,
      name: "认证申请",
      path: "/table/cert.draft",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 6,
    },
    {
      id: 42,
      name: "待审核",
      path: "/table/cert.submit",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 6,
    },
    {
      id: 31,
      name: "已认证",
      path: "/table/cert.index",
      rank: 2,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 6,
    },
    {
      id: 43,
      name: "操作系统",
      path: "/table/manu.opera",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 3,
    },
    {
      id: 44,
      name: "数据库",
      path: "/table/manu.database",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 3,
    },
    {
      id: 45,
      name: "中间件",
      path: "/table/manu.middleware",
      rank: 1,
      status: "enabled",
      visible_menu: 1,
      blocks: 0,
      parent: 3,
    },
  ];
}
