function main(args, out, res) {
  var row = out.data;
  var id = row.Id || "";
  row["id"] = id.substr(-8);

  var created_at = new Date(row.Created * 1000);
  row["created_at"] = created_at.toISOString();

  var name = "";
  if (row.Names) {
    name = row.Names[0];
  }
  row["name"] = name.replace("/", "");
  return { data: row };
}
