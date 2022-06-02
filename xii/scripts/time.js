function res30minsAgo() {
  var ago = new Date();
  ago.setMinutes(ago.getMinutes() - 30);
  return "2006-01-02 " + ago.getHours() + ":" + ago.getMinutes() + ":00";
}

function resNow() {
  var ago = new Date();
  return "2006-01-02 " + ago.getHours() + ":" + ago.getMinutes() + ":00";
}

function Since(date) {
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
    return Math.floor(interval) + " 天";
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

function SinceSecond(seconds) {
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
    return Math.floor(interval) + " 天";
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
