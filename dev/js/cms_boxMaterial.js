getBoxImg();

function getBoxImg(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var boxOriArr = JSON.parse(xhr.responseText);
            // deep copy
            boxArrCopy = JSON.parse(JSON.stringify(boxOriArr));
            // console.log(adminArrCopy);
            readInbox(boxArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getBox.php", true);
    xhr.send();
};

function readInbox(boxArr){       
    let boxStr = '';
    let boxOnOffStr = '';
    boxArr.forEach(function(box){
        if(box.boxImgStatus == "0"){
            boxOnOffStr =`
            <div>
                <label class="switch switch-3d switch-success onOffItem">
                    <input class="switch-input btnOnOffItem" type="checkbox">
                    <span class="switch-slider"></span>
                </label>
            </div>`;
        }else if(box.boxImgStatus == "1"){
            boxOnOffStr =`
            <div>
                <label class="switch switch-3d switch-success onOffItem">
                    <input class="switch-input btnOnOffItem" type="checkbox" checked>
                    <span class="switch-slider"></span>
                </label>
            </div>`;
        };
        boxStr +=
        `<form id="boxMaterialForm${box.boxImgNo}">
            <div class="boxMaterialTable">
                <div class="boxImgNo">
                    ${box.boxImgNo}
                </div>
                <div>
                    <input type="text" class="boxImgName" value="${box.boxImgName}" size="10" maxlength="10">     
                </div>
                <div>
                    <img class="imgPreview" src="./images/box/${box.boxImgPath}" width="80">
                </div>` +
                boxOnOffStr +
                `
                <div>
                    <button type="button" class="btn btn-pill btn-primary btn-xl btnEditItem">編輯</button>
                </div>
                <div>
                    <button type="button" class="btn btn-pill btn-danger btn-xl btnDelItem">刪除</button>
                </div>
            </div>
        </form>
        `;
    });
    let boxMaterialWrapper = document.getElementById('boxMaterialWrapper');
    boxMaterialWrapper.innerHTML = boxStr;
    doFirst();
};

function deleteItem(chosedItemNo){
    deleteConfirm = document.getElementById('deleteConfirm');
    deleteConfirm.classList.remove('hidden');
    document.getElementById('cancel_delete_btn').addEventListener('click', function(){
        deleteConfirm.classList.add('hidden');

    });

    document.getElementById('submit_delete_btn').addEventListener('click', function(){
        let boxImgNo = chosedItemNo;
        let data_info = `boxImgNo=${boxImgNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                deleteConfirm.classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '刪除成功！';
                  
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                getBoxImg();
            }else{
                alert(xhr.status)
            };
        };
        xhr.open("POST", "./php/cms_deleteBoxMaterial.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    });
};

function editItem(itemNo, chosedItemName, chosedItemStatus){
    editConfirm = document.getElementById('editConfirm');
    editConfirm.classList.remove('hidden');
    document.getElementById('cancel_edit_btn').addEventListener('click', function(){
        editConfirm.classList.add('hidden');
    });

    document.getElementById('submit_edit_btn').addEventListener('click', function(){
        if(chosedItemName == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請填寫名稱！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
        }else{
            let boxImgNo = itemNo;
            let boxImgName = chosedItemName;
            let boxImgStatus = chosedItemStatus;
            let data_info = `boxImgNo=${boxImgNo}&boxImgName=${boxImgName}&boxImgStatus=${boxImgStatus}`;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    editConfirm.classList.add('hidden');
                    alertBox.classList.remove('hidden');
                    alertMessage.innerText = '編輯成功！';
                      
                    setTimeout(function(){
                        alertBox.classList.add('hidden');
                    }, 2000);

                    getBoxImg();
                }else{
                    alert(xhr.status)
                };
            };
            xhr.open("POST", "./php/cms_editBoxMaterial.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data_info);
        };
    });
};

function AddItemCol(){
    let boxMaterialWrapper = document.getElementById('boxMaterialWrapper');
    let boxMaterialCol = document.createElement('form');
    let boxMaterialStr = 
    `
    <div class="boxMaterialTable">
        <div class="boxImgNo">
            
        </div>
        <div>
            <input type="text" name="boxImgName" value="" size="10" maxlength="10" id="boxImgName">
        </div>
        <div>
            <label for="upFile"><img id="imgPreview" src="./images/box/gift.png" width="80"></label>
            <input type="file" name="upFile" id="upFile">
        </div>
        <div>
            <label class="switch switch-3d switch-success onOffItem">
                <input class="switch-input btnOnOffItem" type="checkbox" id="btnOnOffItem">
                <span class="switch-slider"></span>
            </label>
        </div>
        <div>
            <button type="button" class="btn btn-pill btn-primary btn-xl" id="btnAddItem">新增</button>
        </div>
        <div>
            <button type="button" class="btn btn-pill btn-danger btn-xl" id="btnCancelAddItem">刪除</button>
        </div>
    </div>
    `;
    boxMaterialCol.innerHTML = boxMaterialStr;
    boxMaterialCol.id = "addBoxMaterialForm";
    boxMaterialWrapper.insertBefore(boxMaterialCol, boxMaterialWrapper.firstChild);
    
    document.getElementById("upFile").addEventListener('change', function(e){
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = function(e){
			document.getElementById("imgPreview").src = reader.result;
		};
		reader.readAsDataURL(file);
	});

    btnAddItem = document.getElementById('btnAddItem');
    btnAddItem.addEventListener('click', function(){
        AddItem();
    });
    document.getElementById('btnCancelAddItem').addEventListener('click', function(){
        boxMaterialWrapper.removeChild(boxMaterialWrapper.firstChild);
    });
};

function AddItem(){
    addConfirm = document.getElementById('addConfirm');
    addConfirm.classList.remove('hidden');
    document.getElementById('cancel_add_btn').addEventListener('click', function(){
        addConfirm.classList.add('hidden');
    });

    document.getElementById('submit_add_btn').addEventListener('click', function(){
        let boxImgName = document.getElementById('boxImgName').value;
        if(boxImgName == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請填寫名稱！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);

        }else{
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    addConfirm.classList.add('hidden');
                    alertBox.classList.remove('hidden');
                    alertMessage.innerText = '新增成功！';
                      
                    setTimeout(function(){
                        alertBox.classList.add('hidden');
                    }, 2000);

                    getBoxImg();
                }else{
                    alert(xhr.status)
                };
            };
            let addBoxMaterialForm = new FormData(document.getElementById('addBoxMaterialForm'));
            xhr.open("POST", "./php/cms_addBoxMaterial.php", true);
            xhr.send(addBoxMaterialForm);
        };
    });
};

function doFirst(){
    alertBox = document.getElementById('alertBox');
    alertMessage = document.getElementById('alertMessage');
    close_alert_btn = document.getElementById('close_alert_btn');
    close_alert_btn.addEventListener('click', function(){
        alertBox.classList.add('hidden');
    });
    let btn_add_item = document.getElementById('btn_add_item');
    btn_add_item.addEventListener('click', AddItemCol);

    let btnDelItem = document.getElementsByClassName('btnDelItem');
    for(let i=0; i<btnDelItem.length; i++){
        btnDelItem[i].addEventListener('click', function(){
            var chosedItemNo = this.parentNode.parentNode.getElementsByClassName('boxImgNo')[0].innerText;
            deleteItem(chosedItemNo);
        });
    };

    let btnEditItem = document.getElementsByClassName('btnEditItem');
    for(let j=0; j<btnEditItem.length; j++){
        btnEditItem[j].addEventListener('click', function(){
            var chosedFormNo = this.parentNode.parentNode.parentNode.id;
            var itemNo = chosedFormNo.substr(15);
            console.log(itemNo);
            var chosedItemName = this.parentNode.parentNode.getElementsByClassName('boxImgName')[0].value;
            let btnOnOffItem = this.parentNode.parentNode.getElementsByClassName('btnOnOffItem')[0];
            var chosedItemStatus = ""
            if(btnOnOffItem.checked == true){
                chosedItemStatus = "1";
            }else{
                chosedItemStatus = "0";
            }
            editItem(itemNo, chosedItemName, chosedItemStatus);
        });
    };
};

window.addEventListener('load', doFirst);