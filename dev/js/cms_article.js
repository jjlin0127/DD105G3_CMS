loadReportArticle();

function loadReportArticle(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var reportArtiOriArr = JSON.parse(xhr.responseText);
            // deep copy
            reportArtiArrCopy = JSON.parse(JSON.stringify(reportArtiOriArr));
            // console.log(reportArtiArrCopy);
            readInReportArti(reportArtiArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getReportArticle.php", true);
    xhr.send();
};

function readInReportArti(reportArtiArr){
    let reportArtiStr = '';
    let reasonStr ='';
    let blockStatusStr = '';
    reportArtiArr.forEach(function(arti){
        switch(arti.reportReason){
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
        switch(arti.artReportStatus){
            case "0":
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockArti" type="checkbox" checked="">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
            break;
            case "1":
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockArti" type="checkbox">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
            break;
            default:
                blockStatusStr =`
                <td>
                    <label class="switch switch-3d switch-danger">
                        <input class="switch-input btnBlockArti" type="checkbox">
                        <span class="switch-slider"></span>
                    </label>
                </td>`;
        };
        reportArtiStr +=
        `
        <tr>
            <td class="articleNo">
                ${arti.articleNo}
            </td>
            <td>
                ${arti.memNo}
            </td>
            <td>
                <div class="postContent">
                    ${arti.artText}
                </div>
            </td>` + 
            reasonStr +
            `<td>
                ${arti.artReportTime.substr(0, 10)}
            </td>` +
            blockStatusStr +
            `
        </tr>
        `;
    });
    let articleTable = document.getElementById('articleTable');
    articleTable.innerHTML = reportArtiStr;
    doFirst();
};

function setArtiBlockStatus(reportArtiNo, reportStatus){
    let articleNo = reportArtiNo;
    let artStatus = reportStatus;
    let data_info = `articleNo=${articleNo}&artStatus=${artStatus}`;
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            if(artStatus == "0"){
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已屏蔽該話題！';
                  
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已屏蔽該話題");
                loadReportArticle();
            }else if(artStatus == "1"){
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '已解除屏蔽該話題！';
                
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("已解除屏蔽該話題");
                loadReportArticle();
            }
        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "./php/cms_setArtiBlockStatus.php", true);
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
    let btnBlockArti = document.getElementsByClassName('btnBlockArti');
    for(let i=0; i<btnBlockArti.length; i++){
        btnBlockArti[i].addEventListener('click', function(){
            let reportArtiNo = this.parentNode.parentNode.parentNode.getElementsByClassName('articleNo')[0].innerText;
            // console.log(reportArtiNo);
            if(this.checked == true){
                let reportStatus = "0";
                setArtiBlockStatus(reportArtiNo, reportStatus);
            }else{
                let reportStatus = "1";
                setArtiBlockStatus(reportArtiNo, reportStatus);
            };
        });
    };
};

window.addEventListener('load', doFirst);