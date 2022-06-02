function SoftSetting() {
    return {
        columns: {
            基础软硬件: {
                label: "基础软硬件",
                edit: {
                    type: "select",
                    props: {
                        value: ":id",
                        showSearch: true,
                        remote: {
                            api: "/api/select/package_list?select=id,name&keyword=where_name_like",
                            query: { select: ["name", "id"], limit: 100 },
                        },
                    },
                },
            },
        },
        list: {
            primary: "id",
            layout: {
                columns: [
                    { name: "基础软硬件", width: 15 }
                ],
            },
        },
    };

}

function AfterSearch(data) {

    // 拼接数据
    var project = Process("models.project.resource.Get", {
        wheres: [{ column: "project_id", value: data.id }],
        withs: {
            "sku": {}
        },
    })
    for (var i in project) {
        project[i].name = project[i].sku.name
        project[i].cpu = project[i].sku.cpu
        project[i].disk = project[i].sku.disk
        project[i].memory = project[i].sku.memory
        project[i].stock = project[i].sku.stock
        project[i].type = project[i].sku.type

        // 复制一份id
        project[i].copy_id = project[i].id
        project[i].id = project[i].id
    }
    data.soft = {
        "data": project,
        "delete": [],
        "query": {
            "sort": "$index"
        }

    }
    return data

}

function BeforeSave(payload) {
    var project_id = payload.id
    var packsge = payload.package
    var deletes = packsge.delete
    var data = packsge.data
        // return payload
        // 把不要的删除了
    if (deletes.length != 0) {
        var del = Process("models.project.resource.DestroyWhere", {
            wheres: [{ column: "id", value: deletes, op: "in" }]
        })
    }
    for (var i in data) {
        var amount = data[i].amount > 0 ? data[i].amount : 1
            // 有这个id说明是更新的
        if (data[i].copy_id && data[i].copy_id > 0) {

            // 如果不一样的话,说明这个id是sku_id
            if (data[i].copy_id != data[i].id) {
                console.log("进入if判断")
                console.log(data[i])

                Process("models.project.resource.Save", { "id": data[i].copy_id, "sku_id": data[i].id, "amount": data[i].amount })
            }
        } else {

            if (data[i].id > 0) {
                Process("models.project.resource.Save", { "project_id": project_id, "sku_id": data[i].id, "amount": amount })
            }


        }
    }

    return [payload]
}