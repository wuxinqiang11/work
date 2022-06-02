function xvp() {
  var c = Process("flows.xii.config");
  var url = `${c.XII_XVP_HOST}/json/cluster/status`;
  var response = Process("xiang.network.Get", url, null, {
    Authorization: c.XII_XVP_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用XVP接口失败");
  }

  return response;
}

function cs() {
  var c = Process("flows.xii.config");
  var url = `${c.XII_CSPHERE_HOST}/nodes`;
  var response = Process("xiang.network.Get", url, null, {
    "Csphere-Api-Key": c.XII_CSPHERE_KEY,
  });

  if (response.status != 200) {
    console.log(url, response);
    throw new Error("调用CSPHERE接口失败");
  }

  return response;
}
