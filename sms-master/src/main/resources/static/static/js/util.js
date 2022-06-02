//获取当前路径的域名
var obj = document.getElementById('url');
var obj1 = document.getElementById('url1');
var oldvalue = obj.innerHTML;
var oldvalue1 = obj1.innerHTML;

var url = window.location.href;
obj.innerHTML = url.substring(0,url.indexOf("carb2b/"))+ "carb2b" +oldvalue;
obj1.innerHTML = url.substring(0,url.indexOf("carb2b/"))+ "carb2b" +oldvalue1;
