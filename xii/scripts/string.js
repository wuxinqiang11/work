function Concat(args) {
  var res = "";
  for (var i in args) {
    var v = args[i] || "";
    res = res + v;
  }
  return res;
}

function HumanSize(x) {
  var units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  var l = 0;
  var n = parseInt(x, 10) || 0;
  while (n >= 1024 && ++l) {
    n = n / 1024;
  }
  return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
}
