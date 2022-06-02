function main(args, out, res) {
  var start = new Date(out.detail.start_time);
  var end = new Date(out.detail.stop_time);
  var s1 = start.getTime();
  var s2 = end.getTime();
  var total = (s2 - s1) / 1000;

  var day = parseInt(total / (24 * 60 * 60)); //计算整数天数
  var afterDay = total - day * 24 * 60 * 60; //取得算出天数后剩余的秒数
  var hour = parseInt(afterDay / (60 * 60)); //计算整数小时数
  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60; //取得算出小时数后剩余的秒数
  var min = parseInt(afterHour / 60); //计算整数分
  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60; //取得算出分后剩余的秒数

  out["detail"]["timecost"] =
    min < 0 ? "-" : min.toFixed(0) + "分" + afterMin.toFixed(0) + "秒";
  out["detail"]["timeago"] = timeSince(start);
  return out;
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " 年";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " 月";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " 日";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " 小时";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " 分";
  }
  return Math.floor(seconds) + " 秒";
}
