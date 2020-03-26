loadReportMessage();

function loadReportMessage(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var reportMesOriArr = JSON.parse(xhr.responseText);
            // deep copy
            reportMesArrCopy = JSON.parse(JSON.stringify(reportMesOriArr));
            // console.log(reportMesArrCopy);
            readInReportMes(reportMesArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getReportMessage.php", true);
    xhr.send();
};

function readInReportMes(reportMesArr){
    let reportMesStr = '';
    let reasonStr ='';
    let blockStatusStr = '';
    reportMesArr.forEach(function(mes){
        switch(mes.reportReason){
            case "1":
                reasonStr =`
                <td>
                    <div class="reportReason">
                    中傷、歧視或謾罵他人
                    </div>
                </td>`;
            break;
            case "2":
                reasonStr =`
                <td>
                    <div class="reportReason">
                    惡意洗版、重複張貼
                    </div>
                </td>`;
            break;
            case "3":
                reasonStr =`
                <td>
                    <div class="reportReason">
                    含色情、血腥或暴力等內容
                    </div>
                </td>`;
            break;
            case "4":
                reasonStr =`
                <td>
                    <div class="reportReason">
                    其他原因
                    </div>
                </td>`;
            break;
            default:
                reasonStr =`
                <td>
                    <div class="reportReason">
                    其他原因
                    </div>
                </td>`;
        };
        switch(mes.mesReportStatus){
            case "0":
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockMes" type="checkbox" checked="">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
            break;
            case "1":
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockMes" type="checkbox">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
            break;
            default:
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockMes" type="checkbox">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
        };
        reportMesStr +=
        `
        <tr>
            <td class="messageNo">
                ${mes.messageNo}
            </td>
            <td>
                <div class="postContent">
                    ${mes.mesText}
                </div>
            </td>` + 
            reasonStr +
            `<td>
                ${mes.mesReportTime.substr(0, 10)}
            </td>` +
            blockStatusStr +
            `
        </tr>
        `;
    });
    let messageTable = document.getElementById('messageTable');
    messageTable.innerHTML = reportMesStr;
    doFirst();
};

function setMesBlockStaus(reportMesNo, reportStatus){
    let messageNo = reportMesNo;
    let mesStatus = reportStatus;
    let data_info = `messageNo=${messageNo}&mesStatus=${mesStatus}`;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            if(mesStatus == "0"){
                alert("已屏蔽該留言");
                loadReportMessage();
            }else
                alert("已解除屏蔽該留言");
                loadReportMessage();
        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "./php/cms_setMesBlockStaus.php", true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(data_info);
};

function doFirst(){
    let btnBlockMes = document.getElementsByClassName('btnBlockMes');
    for(let i=0; i<btnBlockMes.length; i++){
        btnBlockMes[i].addEventListener('click', function(){
            let reportMesNo = this.parentNode.parentNode.parentNode.getElementsByClassName('messageNo')[0].innerText;
            console.log(reportMesNo);
            if(this.checked == true){
                let reportStatus = "0";
                setMesBlockStaus(reportMesNo, reportStatus);
            }else{
                let reportStatus = "1";
                setMesBlockStaus(reportMesNo, reportStatus);
            };
        });
    };
};

window.addEventListener('load', doFirst);