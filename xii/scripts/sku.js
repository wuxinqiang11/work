function AfterFind(sku) {
  sku = sku || {};
  sku.params = sku.params || {};
  sku.params = JSON.stringify(sku.params);
  return sku;
}

function BeforeSave(payload) {
  payload = payload || {};
  payload.params = payload.params || {};
  try {
    payload.params = JSON.parse(payload.params);
  } catch (e) {
    payload.params = {};
  }

  return [payload];
}
