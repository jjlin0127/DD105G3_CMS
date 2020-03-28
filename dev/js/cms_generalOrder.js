loadGeneralOrder();

function loadGeneralOrder(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var genOrdOriArr = JSON.parse(xhr.responseText);
            // deep copy
            genOrdArrCopy = JSON.parse(JSON.stringify(genOrdOriArr));
            // console.log(reportMesArrCopy);
            let ordStr = '';
            let ordStatusStr = '';
            genOrdArrCopy.forEach(function(ord){
                switch(ord.ordStatus){
                    case "0":
                        ordStatusStr =`
                        <td>
                            <select class="form-control ordStatus">
                                <option name="ordStatus[]" value="0" selected="">處理中</option>
                                <option name="ordStatus[]" value="1">已確認</option>
                                <option name="ordStatus[]" value="2">已完成</option>
                                <option name="ordStatus[]" value="3">已取消</option>
                            </select>
                        </td>`;
                    break;
                    case "1":
                        ordStatusStr =`
                        <td>
                            <select class="form-control ordStatus">
                                <option name="ordStatus[]" value="0">處理中</option>
                                <option name="ordStatus[]" value="1" selected="">已確認</option>
                                <option name="ordStatus[]" value="2">已完成</option>
                                <option name="ordStatus[]" value="3">已取消</option>
                            </select>
                        </td>`;
                    break;
                    case "2":
                        ordStatusStr =`
                        <td>
                            <select class="form-control ordStatus">
                                <option name="ordStatus[]" value="0">處理中</option>
                                <option name="ordStatus[]" value="1">已確認</option>
                                <option name="ordStatus[]" value="2" selected="">已完成</option>
                                <option name="ordStatus[]" value="3">已取消</option>
                            </select>
                        </td>`;
                    break;
                    case "3":
                        ordStatusStr =`
                        <td>
                            <select class="form-control ordStatus">
                                <option name="ordStatus[]" value="0">處理中</option>
                                <option name="ordStatus[]" value="1">已確認</option>
                                <option name="ordStatus[]" value="2">已完成</option>
                                <option name="ordStatus[]" value="3" selected="">已取消</option>
                            </select>
                        </td>`;
                    break;
                    default:
                        ordStatusStr =`
                        <td>
                            <select class="form-control ordStatus">
                                <option name="ordStatus[]" value="0" selected="">處理中</option>
                                <option name="ordStatus[]" value="1">已確認</option>
                                <option name="ordStatus[]" value="2">已完成</option>
                                <option name="ordStatus[]" value="3">已取消</option>
                            </select>
                        </td>`;
                };
                ordStr +=`
                <tr>
                    <td class="ordNo">
                        ${ord.ordNo}
                    </td>
                    <td>
                        ${ord.memNo}
                    </td>
                    <td>
                        ${ord.ordDatetime}
                    </td>
                    <td>
                        ${ord.ordDatetime}
                    </td>` +
                    ordStatusStr + `
                </tr>
                `;
            });
            let orderTable = document.getElementById('orderTable');
            orderTable.innerHTML = ordStr;
            doFirst();
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getGeneralOrder.php", true);
    xhr.send();
};

function setOrdStatus(reportMesNo, reportStatus){
    let messageNo = reportMesNo;
    let mesStatus = reportStatus;
    let data_info = `messageNo=${messageNo}&mesStatus=${mesStatus}`;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            if(mesStatus == "0"){
                addConfirm.classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已屏蔽該留言！';
                
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已屏蔽該留言");
                loadGeneralOrder();
            }else if(mesStatus == "1"){
                addConfirm.classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已解除屏蔽該留言！';
                
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已解除屏蔽該留言");
                loadGeneralOrder();
            }
        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "./php/cms_setMesBlockStatus.php", true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(data_info);
};

function doFirst(){
    alertBox = document.getElementById('alertBox');
    alertMessage = document.getElementById('alertMessage');
    close_alert_btn = document.getElementById('close_alert_btn');
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });
    let btnBlockMes = document.getElementsByClassName('btnBlockMes');
    for(let i=0; i<btnBlockMes.length; i++){
        btnBlockMes[i].addEventListener('click', function(){
            let reportMesNo = this.parentNode.parentNode.parentNode.getElementsByClassName('messageNo')[0].innerText;
            console.log(reportMesNo);
            if(this.checked == true){
                let reportStatus = "0";
                setMesBlockStatus(reportMesNo, reportStatus);
            }else{
                let reportStatus = "1";
                setMesBlockStatus(reportMesNo, reportStatus);
            };
        });
    };
};

window.addEventListener('load', doFirst);