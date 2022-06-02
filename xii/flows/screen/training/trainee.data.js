function main(args, out, res) {
  var days = [];
  for (var i = 0; i < res.日期.length; i++) {
    days.push(res.日期[i].创建时间);
  }

  var counts = [];
  for (var i = 0; i < days.length; i++) {
    var day = days[i].replace("年", "-");
    day = day.replace("月", "-");
    day = day.replace("日", "");
    res = Process("flows.screen.training.count.trainee", day);
    counts.push({ 创建时间: days[i], 数量: res });
  }
  return counts;
}
