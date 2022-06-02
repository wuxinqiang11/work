function main(args, out, res) {
  var data = [];
  for (var i = 0; i < out.data.data.length; i++) {
    var row = out.data.data[i];
    var type = row.type || "";
    if (type == "qemu") {
      row["memory"] = Process("scripts.string.HumanSize", row.maxmem);
      row["disk"] = Process("scripts.string.HumanSize", row.maxdisk);
      row["uptime"] = Process("scripts.time.SinceSecond", row.uptime);
      data.push(row);
    }
  }
  return { data: data };
}
