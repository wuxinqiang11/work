function ParamsCheck(path, params, query, payload, headers) {
  if (!payload.name || payload.name == "") {
    throw new Exception("厂商名称不能为空", 400);
  }
  if (!payload.contact_mobile || payload.contact_mobile == "") {
    throw new Exception("联系人电话不能为空", 400);
  }
  if (!payload.contact_name || payload.contact_name == "") {
    throw new Exception("联系人不能为空", 400);
  }
  if (payload.id == null || !payload.id) {
    var exists = Process("models.manu.Get", {
      wheres: [{ column: "name", value: payload.name }],
      limit: 1,
    });
    if (exists && exists.length > 0) {
      throw new Exception("厂商已经存在,请进行检查和确认！", 400);
    }
  } else {
    var exists = Process("models.manu.Get", {
      wheres: [
        { column: "name", value: payload.name },
        { column: "id", value: payload.id, op: "ne" },
      ],
      limit: 1,
    });
    console.log(exists);
    if (exists && exists.length > 0) {
      throw new Exception("厂商已经存在,请进行检查和确认！", 400);
    }
  }

  return;
}
