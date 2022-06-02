function main(args, out, res) {
  var rows = out.data;
  for (var i in rows) {
    rows[i]["disk_size"] = Process(
      "scripts.string.HumanSize",
      rows[i]["disk_size"] * 1024
    );
    rows[i]["memory"] = Process("scripts.string.HumanSize", rows[i]["memory"]);
  }
  return { data: rows };
}
