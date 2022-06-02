function main(args, out, result) {
  var res = {
    虚拟机: { 总数: 0, 在线: 0, 离线: 0 },
    轻虚拟机: { 总数: 0, 在线: 0, 离线: 0 },
  };

  var data = out.data.data;
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var name = "";
    if (row.type == "qemu") {
      name = "虚拟机";
    } else if (row.type == "lxc") {
      name = "轻虚拟机";
    } else {
      continue;
    }
    // 计算数量
    res[name]["总数"] = res[name].总数 + 1;
    if (row.status == "running") {
      res[name]["在线"] = res[name].在线 + 1;
    } else {
      res[name]["离线"] = res[name].离线 + 1;
    }
  }

  return res;
}
