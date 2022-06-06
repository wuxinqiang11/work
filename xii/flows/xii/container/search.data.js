function main(args, out, res) {
  var rows = out.data;
  for (var i in rows) {
    var id = rows[i].Id || "";
    rows[i]["id"] = id.substr(0, 12);

    var created_at = new Date(rows[i].Created * 1000);
    rows[i]["created_at"] = created_at.toISOString();

    var name = rows[i].Names[0] || "";
    rows[i]["name"] = name.replace("/", "");
  }
  return { data: rows };
}
