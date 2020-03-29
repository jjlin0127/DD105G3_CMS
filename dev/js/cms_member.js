loadMembers();

function loadMembers(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var memOriArr = JSON.parse(xhr.responseText);
            // deep copy
            memArrCopy = JSON.parse(JSON.stringify(memOriArr));
            // console.log(reportMesArrCopy);
            let memStr = '';
            let blockStatusStr = '';
            memArrCopy.forEach(function(mem){
                switch(mem.memStatus){
                    case "0":
                        blockStatusStr =`
                        <td>
                            <label class="switch switch-3d switch-danger">
                                <input class="switch-input btnBlockMem" type="checkbox" checked="">
                                <span class="switch-slider"></span>
                            </label>
                        </td>`;
                    break;
                    case "1":
                        blockStatusStr =`
                        <td>
                            <label class="switch switch-3d switch-danger">
                                <input class="switch-input btnBlockMem" type="checkbox">
                                <span class="switch-slider"></span>
                            </label>
                        </td>`;
                    break;
                    default:
                        blockStatusStr =`
                        <td>
                            <label class="switch switch-3d switch-danger">
                                <input class="switch-input btnBlockMem" type="checkbox">
                                <span class="switch-slider"></span>
                            </label>
                        </td>`;
                };
                memStr +=
                `
                <tr>
                    <td class="memNo">
                    ${mem.memNo}
                    </td>
                    <td>
                    ${mem.memId}
                    </td>
                    <td>
                    ${mem.memName}
                    </td>
                    <td>
                    ${mem.memNickname}
                    </td>
                    <td >
                    ${mem.memTel}
                    </td>
                    <td>
                    ${mem.memPoint}
                    </td>` + 
                    blockStatusStr +
                `</tr>
                `;
            });
            let memberTable = document.getElementById('memberTable');
            memberTable.innerHTML = memStr;
            doFirst();
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getMember.php", true);
    xhr.send();
};

function setMemStatus(blockMemNo, reportStatus){
    let memNo = blockMemNo;
    let memStatus = reportStatus;
    let data_info = `memNo=${memNo}&memStatus=${memStatus}`;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            if(memStatus == "0"){
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已將該會員停權！';
                
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已將該會員停權");
                loadMembers();
            }else if(memStatus == "1"){
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已解除該會員停權！';
                
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已解除該會員停權");
                loadMembers();
            }

        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "./php/cms_setMemStatus.php", true);
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
    let btnBlockMem = document.getElementsByClassName('btnBlockMem');
    for(let i=0; i<btnBlockMem.length; i++){
        btnBlockMem[i].addEventListener('click', function(){
            let blockMemNo = this.parentNode.parentNode.parentNode.getElementsByClassName('memNo')[0].innerText;
            // console.log(blockMemNo);
            if(this.checked == true){
                let reportStatus = "0";
                setMemStatus(blockMemNo, reportStatus);
            }else{
                let reportStatus = "1";
                setMemStatus(blockMemNo, reportStatus);
            };
        });
    };
};

window.addEventListener('load', doFirst);