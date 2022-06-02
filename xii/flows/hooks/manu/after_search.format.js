function main(args, out, res) {
  console.log(args);
  var searchRes = args[0] || {};
  var data = searchRes.data || [];
  for (var i in data) {
    var province = data[i].province;
    var city = data[i].city;
    data[i]["province_name"] = Process("flows.select.area.find", province);
    data[i]["city_name"] = Process("flows.select.area.find", city);
  }
  searchRes["data"] = data;
  return searchRes;
}
