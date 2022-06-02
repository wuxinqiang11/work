// Signup 用户注册
function Signup(data) {
  console.log(data);

  var password = data.password;
  if (password == "") {
    throw "密码不能为空|400";
  }

  var pwdRegex = new RegExp(
    "(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}"
  );

  if (!pwdRegex.test(password)) {
    throw "密码中必须包含大小写 字母、数字、特称字符，至少8个字符|400";
  }

  if (password != data.repassword) {
    throw "两次输入密码不一致|400";
  }

  var email = data.email;
  if (email == "") {
    throw "邮箱地址不能为空|400";
  }

  var reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
  if (!reg.test(email)) {
    throw "邮箱地址格式不正确|400";
  }

  var name = data.name || "";
  if (name == "" || name.length < 2) {
    throw "姓名至少2个字|400";
  }

  var manu_id = NewManu(data.company);
  var user_id = NewUser({
    manu_id: manu_id,
    name: name,
    email: email,
    password: password,
  });

  return user_id;
}

function NewManu(name) {
  name = name || "";
  if (name == "") {
    throw "厂商名称不能为空";
  }

  id = Process("xiang.table.Save", "manu.index", {
    name: name,
    short_name: null,
    contact_name: null,
    contact_mobile: null,
    address: null,
    area: [null, null],
  });

  if (id.message) {
    throw id.message;
  }

  return id[0];
}

function NewUser(data) {
  id = Process("xiang.table.Save", "manu.user", data);
  if (id.message) {
    throw id.message;
  }
  return id;
}
