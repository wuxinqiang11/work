function getData(){
    $.ajax({
        "url": "/MSGSEND/countByLog",
        "type": "POST",
        "dataType": "json",
        "success": function (obj) {
            /*转换成json格式*/
            var ob = $.parseJSON(obj.data)
            //1.车险极速出单系统统计
            //全部
            var groupTable = $('#group');
            for(var i=0;i<ob.list.length;i++){
                groupTable.append('<tr> ' +
                    '<td class="tdClass">' + ob.list[i].channelName + '</td>' +
                    '<td class="tdClass">' + ob.list[i].successChannelCount + '</td>' +
                    '</tr>')
            }
           //6.总数量
           var totalNo=ob.sum;
           $("#totalNo").html(totalNo);

        }
    })
}
function addUserId(){
    if( $("#password").val()== $("#password1").val()){
        $.ajax({
            "url": "/MSGSEND/powerControl",
            "type": "POST",
            "dataType": "json",
            "data": {userId:$("#userId").val(), password:$("#password").val()},
            "success": function (obj) {
                /*转换成json格式*/
                //1.车险极速出单系统统计
                //全部
                if(obj.state==0){

                    $("#userId").val("");
                    $("#password").val("");
                    $("#password1").val("");
                    alert("保存成功!");
                    $(this).button('complete');
                }else{
                    alert("保存失败!");
                    $(this).button('complete');
                }


            }
        })
    }else{
        alert("两次输入密码不一致!");
    }
}