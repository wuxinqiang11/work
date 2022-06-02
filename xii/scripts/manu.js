function Save(payload) {
  var id = Process("models.manu.Save", payload);

  Process("models.manu.user.Save", {
    manu_id: id,
    mobile: payload.contact_mobile,
    email: payload.contact_mobile,
    name: payload.contact_name,
    nickname: payload.contact_name,
    password: "A123456p+",
    status: "enabled",
  });
  return id;
}
