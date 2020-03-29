loadFruitType();

function loadFruitType(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var fruitOriArr = JSON.parse(xhr.responseText);
            // deep copy
            fruitArrCopy = JSON.parse(JSON.stringify(fruitOriArr));
            // console.log(adminArrCopy);
            readInFruitType(fruitArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getFruitType.php", true);
    xhr.send();
};

function readInFruitType(fruitArr){       
    let fruitStr = '';
    let healthTypeStr = '';
    let fruitOnOffStr = '';
    fruitArr.forEach(function(fruit){
        switch(fruit.healthyType){
            case "1":
                healthTypeStr =`
                <div>
                    <select class="form-control healthyType" name="healthyType" id="healthyType${fruit.fruitTypeNo}">
                        <option value="1" selected>幫助消化</option>
                        <option value="2">活化大腦</option>
                        <option value="3">保護血管</option>
                        <option value="4">其它</option>
                    </select>
                </div>`;
            break;
            case "2":
                healthTypeStr =`
                <div>
                    <select class="form-control healthyType" name="healthyType" id="healthyType${fruit.fruitTypeNo}">
                        <option value="1">幫助消化</option>
                        <option value="2" selected>活化大腦</option>
                        <option value="3">保護血管</option>
                        <option value="4">其它</option>
                    </select>
                </div>`;
            break;
            case "3":
                healthTypeStr =`
                <div>
                    <select class="form-control healthyType" name="healthyType" id="healthyType${fruit.fruitTypeNo}">
                        <option value="1">幫助消化</option>
                        <option value="2">活化大腦</option>
                        <option value="3" selected>保護血管</option>
                        <option value="4">其它</option>
                    </select>
                </div>`;
            break;
            default:
                healthTypeStr =`
                <div>
                    <select class="form-control healthyType" name="healthyType" id="healthyType${fruit.fruitTypeNo}">
                        <option value="1">幫助消化</option>
                        <option value="2">活化大腦</option>
                        <option value="3">保護血管</option>
                        <option value="4" selected>其它</option>
                    </select>
                </div>`;
            break;
        };
        if(fruit.fruitTypeStatus == "0"){
            fruitOnOffStr =`
            <div>
                <label class="switch switch-3d switch-success onOffItem">
                    <input class="switch-input btnOnOffItem" type="checkbox">
                    <span class="switch-slider"></span>
                </label>
            </div>`;
        }else{
            fruitOnOffStr =`
            <div>
                <label class="switch switch-3d switch-success onOffItem">
                    <input class="switch-input btnOnOffItem" type="checkbox" checked>
                    <span class="switch-slider"></span>
                </label>
            </div>`;
        };
        fruitStr +=
        `<form id="fruitTypeForm${fruit.fruitTypeNo}">
            <div class="fruitTypeTable">
                <div class="fruitTypeNo">
                    ${fruit.fruitTypeNo}
                </div>` +
                healthTypeStr + 
                `
                <div>
                    <input type="text" class="fruitTypeName" value="${fruit.fruitTypeName}" size="10" maxlength="10">     
                </div>
                <div>
                    <input type="text" class="fruitUnitPrice" value="${fruit.fruitUnitPrice}" size="10" maxlength="10">
                </div>` + `
                <div>
                    <img class="imgPreview" src="./images/cusFruits/${fruit.fruitTypePic}" width="80">
                </div>` +
                fruitOnOffStr +
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
    let fruitTypeWrapper = document.getElementById('fruitTypeWrapper');
    fruitTypeWrapper.innerHTML = fruitStr;
    doFirst();
};

function deleteItem(chosedItemNo){
    deleteConfirm = document.getElementById('deleteConfirm');
    deleteConfirm.classList.remove('hidden');
    document.getElementById('cancel_delete_btn').addEventListener('click', function(){
        deleteConfirm.classList.add('hidden');

    });

    document.getElementById('submit_delete_btn').addEventListener('click', function(){
        let fruitTypeNo = chosedItemNo;
        let data_info = `fruitTypeNo=${fruitTypeNo}`;
        let xhr = new XMLHttpRequest();
        xhr.onload = function(){
            if(xhr.status == 200){
                deleteConfirm.classList.add('hidden');
                alertBox.classList.remove('hidden');
                alertMessage.innerText = '刪除成功！';
                  
                setTimeout(function(){
                    alertBox.classList.add('hidden');
                }, 2000);
                // alert("刪除成功");
                loadFruitType();
            }else{
                alert(xhr.status)
            };
        };
        xhr.open("POST", "./php/cms_deleteFruitType.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    });
};

function editItem(itemNo, chosedItemType, chosedItemName, chosedItemPrice, chosedItemStatus){
    editConfirm = document.getElementById('editConfirm');
    editConfirm.classList.remove('hidden');
    document.getElementById('cancel_edit_btn').addEventListener('click', function(){
        editConfirm.classList.add('hidden');
    });

    document.getElementById('submit_edit_btn').addEventListener('click', function(){
        if(chosedItemName == "" || chosedItemPrice == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請填寫名稱和價格！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
        }else{
            let fruitTypeNo = itemNo;
            let healthyType = chosedItemType;
            let fruitTypeName = chosedItemName;
            let fruitUnitPrice = chosedItemPrice;
            let fruitTypeStatus = chosedItemStatus;
            let data_info = `fruitTypeNo=${fruitTypeNo}&healthyType=${healthyType}&fruitTypeName=${fruitTypeName}&fruitUnitPrice=${fruitUnitPrice}&fruitTypeStatus=${fruitTypeStatus}`;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    editConfirm.classList.add('hidden');
                    alertBox.classList.remove('hidden');
                    alertMessage.innerText = '編輯成功！';
                      
                    setTimeout(function(){
                        alertBox.classList.add('hidden');
                    }, 2000);

                    loadFruitType();
                }else{
                    alert(xhr.status)
                };
            };
            // let editfruitTypeForm = new FormData(document.getElementById(`"${chosedFormNo}"`));
            // editfruitTypeForm.append("fruitTypeStatus", fruitTypeStatus);
            xhr.open("POST", "./php/cms_editFruitType.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            // console.log(editfruitTypeForm);
            xhr.send(data_info);
        };
    });
};

function AddItemCol(){
    let fruitTypeWrapper = document.getElementById('fruitTypeWrapper');
    let fruitTypeCol = document.createElement('form');
    let fruitTypeStr = 
    `
    <div class="fruitTypeTable">
        <div class="fruitTypeNo">
            
        </div>
        <div>
            <select class="form-control healthyType" name="healthyType" id="healthyType">
                <option value="1" selected>幫助消化</option>
                <option value="2">活化大腦</option>
                <option value="3">保護血管</option>
                <option value="4">其它</option>
            </select>
        </div>
        <div>
            <input type="text" name="fruitTypeName" value="" size="10" maxlength="10" id="fruitTypeName">
        </div>
        <div>
            <input type="text" name="fruitUnitPrice" value="" size="10" maxlength="10" id="fruitUnitPrice">
        </div>
        <div>
            <label for="upFile"><img id="imgPreview" src="./images/cusFruits/fruit.png" width="80"></label>
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
    fruitTypeCol.innerHTML = fruitTypeStr;
    fruitTypeCol.id = "addfruitTypeForm";
    // fruitTypeCol.action = "./php/cms_addFruitType.php";
    // fruitTypeCol.method = "post";
    // fruitTypeCol.enctype = "multipart/form-data";
    fruitTypeWrapper.insertBefore(fruitTypeCol, fruitTypeWrapper.firstChild);
    
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
        fruitTypeWrapper.removeChild(fruitTypeWrapper.firstChild);
    });
};

function AddItem(){
    addConfirm = document.getElementById('addConfirm');
    addConfirm.classList.remove('hidden');
    document.getElementById('cancel_add_btn').addEventListener('click', function(){
        addConfirm.classList.add('hidden');
    });

    document.getElementById('submit_add_btn').addEventListener('click', function(){
        // let healthyType = document.getElementById('healthyType').value;
        // let btnOnOffItem = document.getElementById('btnOnOffItem');
        // let fruitTypeStatus = ""
        // if(btnOnOffItem.checked == true){
        //     fruitTypeStatus = "1";
        // }else{
        //     fruitTypeStatus = "0";
        // }
        let fruitTypeName = document.getElementById('fruitTypeName').value;
        let fruitUnitPrice = document.getElementById('fruitUnitPrice').value;
        if(fruitTypeName == "" || fruitUnitPrice == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '請填寫名稱和價格！';
              
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

                    loadFruitType();
                }else{
                    alert(xhr.status)
                };
            };
            let addfruitTypeForm = new FormData(document.getElementById('addfruitTypeForm'));
            xhr.open("POST", "./php/cms_addFruitType.php", true);
            xhr.send(addfruitTypeForm);
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
            var chosedItemNo = this.parentNode.parentNode.getElementsByClassName('fruitTypeNo')[0].innerText;
            // console.log(chosedItemNo);
            deleteItem(chosedItemNo);
        });
    };

    let btnEditItem = document.getElementsByClassName('btnEditItem');
    for(let j=0; j<btnEditItem.length; j++){
        btnEditItem[j].addEventListener('click', function(){
            var chosedFormNo = this.parentNode.parentNode.parentNode.id;
            var itemNo = chosedFormNo.substr(13);
            var chosedItemType = this.parentNode.parentNode.getElementsByClassName('healthyType')[0].value;
            var chosedItemName = this.parentNode.parentNode.getElementsByClassName('fruitTypeName')[0].value;
            var chosedItemPrice = this.parentNode.parentNode.getElementsByClassName('fruitUnitPrice')[0].value;
            let btnOnOffItem = this.parentNode.parentNode.getElementsByClassName('btnOnOffItem')[0];
            var chosedItemStatus = ""
            if(btnOnOffItem.checked == true){
                chosedItemStatus = "1";
            }else{
                chosedItemStatus = "0";
            }
            // console.log(itemNo, chosedItemType, chosedItemName, chosedItemPrice, chosedItemStatus);
            editItem(itemNo, chosedItemType, chosedItemName, chosedItemPrice, chosedItemStatus);
        });
    };
};

window.addEventListener('load', doFirst);