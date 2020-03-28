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
            let ordPayStr = '';
            let ordStatusStr = '';
            genOrdArrCopy.forEach(function(ord){
                switch(ord.ordPay){
                    case "1":
                        ordPayStr ="<td>貨到付款</td>";
                    break;
                    case "2":
                        ordPayStr ="<td>信用卡</td>";
                    break;
                    default:
                        ordPayStr ="<td>貨到付款</td>";
                };
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
                        ${ord.ordTotal}
                    </td>
                    <td>
                        ${ord.ordName}
                    </td>
                    <td>
                        ${ord.ordaddr}
                    </td>` +
                    ordPayStr +
                    ordStatusStr + `
                    <td>
                        <button type="button" class="btn btn-pill btn-primary btn-xl btnOrdSubmit">確認</button>
                    </td>
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

function setOrdStatus(getOrdNo, getOrdStatus){
    let ordNo = getOrdNo;
    let ordStatus = getOrdStatus;
    // console.log(ordNo, ordStatus);
    let data_info = `ordNo=${ordNo}&ordStatus=${ordStatus}`;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '已修改該訂單狀態！';
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
            
            loadGeneralOrder();

        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "./php/cms_setOrdStatus.php", true);
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

    let btnOrdSubmit = document.getElementsByClassName('btnOrdSubmit');
    for(let i=0; i<btnOrdSubmit.length; i++){
        btnOrdSubmit[i].addEventListener('click', function(){
            // let setOrdNo = this.parentNode.parentNode.getElementsByClassName('ordNo')[0].innnerText;
            let getOrdNo = this.parentNode.parentNode.getElementsByTagName('td')[0].innerText;
            let getOrdStatus = this.parentNode.parentNode.querySelector('option:checked').value;
            // console.log(getOrdNo, getOrdStatus);
            setOrdStatus(getOrdNo, getOrdStatus);
        });
    };
};

window.addEventListener('load', doFirst);