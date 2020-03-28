loadFruitType();

function loadFruitType(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var fruitOriArr = JSON.parse(xhr.responseText);
            // deep copy
            fruitArrCopy = JSON.parse(JSON.stringify(fruitOriArr));
            // console.log(adminArrCopy);
            readInAdmin(fruitArrCopy);
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
    let fruitImgStr = '';
    let fruitOnOffStr = '';
    fruitArr.forEach(function(fruit){
        switch(fruit.healthType){
            case "1":
                healthTypeStr =`
                <td>
                    <select class="form-control selectHealthType">
                        <option name="healthType[]" value="1" selected="">幫助消化</option>
                        <option name="healthType[]" value="2">活化大腦</option>
                        <option name="healthType[]" value="3">保護血管</option>
                        <option name="healthType[]" value="4">其它</option>
                    </select>
                </td>`;
            break;
            case "2":
                healthTypeStr =`
                <td>
                    <select class="form-control selectHealthType">
                        <option name="healthType[]" value="1">幫助消化</option>
                        <option name="healthType[]" value="2" selected="">活化大腦</option>
                        <option name="healthType[]" value="3">保護血管</option>
                        <option name="healthType[]" value="4">其它</option>
                    </select>
                </td>`;
            break;
            case "3":
                healthTypeStr =`
                <td>
                    <select class="form-control selectHealthType">
                        <option name="healthType[]" value="1">幫助消化</option>
                        <option name="healthType[]" value="2">活化大腦</option>
                        <option name="healthType[]" value="3" selected="">保護血管</option>
                        <option name="healthType[]" value="4">其它</option>
                    </select>
                </td>`;
            break;
            default:
                healthTypeStr =`
                <td>
                    <select class="form-control selectHealthType">
                        <option name="healthType[]" value="1">幫助消化</option>
                        <option name="healthType[]" value="2">活化大腦</option>
                        <option name="healthType[]" value="3">保護血管</option>
                        <option name="healthType[]" value="4" selected="">其它</option>
                    </select>
                </td>`;
            break;
        };
        if(fruit.fruitTypePic == null){
            fruitImgStr =`
            <td>
                <label for="upFile"><img class="imgPreview" src="" width="80"></label>
                <input type="file" name="upFile" class="upFile">
            </td>`;
        }else{
            fruitImgStr =`
            <td>
                <label for="upFile"><img class="imgPreview" src="./images/cusFruits/${fruitTypePic}" width="80"></label>
                <input type="file" name="upFile" class="upFile">
            </td>`;
        };
        if(fruit.fruitTypeStatus == "0"){
            fruitOnOffStr =`
            <td>
                <label class="switch switch-3d switch-danger">
                    <input class="switch-input btnOnOffItem" type="checkbox">
                    <span class="switch-slider"></span>
                </label>
            </td>`;
        }else{
            fruitOnOffStr =`
            <td>
                <label class="switch switch-3d switch-danger">
                    <input class="switch-input btnOnOffItem" type="checkbox" checked="">
                    <span class="switch-slider"></span>
                </label>
            </td>`;
        };
        fruitStr +=
        `
        <tr>
            <td class="fruitTypeNo">
                ${fruit.fruitTypeNo}
            </td>` +
            healthTypeStr + 
            `
            <td>
                ${fruit.fruitTypeName}
            </td>
            <td>
                ${fruit.fruitUnitPrice}
            </td>` +
            fruitImgStr +
            fruitOnOffStr +
            `
            <td>
                <button type="button" class="btn btn-pill btn-primary btn-xl btnEditItem">編輯</button>
            </td>
            <td>
                <button type="button" class="btn btn-pill btn-danger btn-xl btnDelItem">刪除</button>
            </td>
        </tr>
        `;
    });
    let fruitTypeTable = document.getElementById('fruitTypeTable');
    fruitTypeTable.innerHTML = fruitStr;
    doFirst();
};

function deleteAdmin(chosedAdmin){
    deleteConfirm = document.getElementById('deleteConfirm');
    deleteConfirm.classList.remove('hidden');
    document.getElementById('cancel_delete_btn').addEventListener('click', function(){
        deleteConfirm.classList.add('hidden');

    });

    document.getElementById('submit_delete_btn').addEventListener('click', function(){
        let chosedAdminNo = chosedAdmin.substr(7);
        let data_info = `adminNo=${chosedAdminNo}`;
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
                loadAdminData();
            }else{
                alert(xhr.status)
            };
        };
        xhr.open("POST", "./php/cms_deleteAdmin.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data_info);
    });
};

function editAdmin(chosedAdminNo, chosedAdminId, chosedAdminPsw, chosedAdminAuthority){
    editConfirm = document.getElementById('editConfirm');
    editConfirm.classList.remove('hidden');
    document.getElementById('cancel_edit_btn').addEventListener('click', function(){
        editConfirm.classList.add('hidden');
    });

    document.getElementById('submit_edit_btn').addEventListener('click', function(){
        if(chosedAdminId == "" || chosedAdminPsw == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '帳號名稱和密碼且需填寫！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
            // alert("帳號名稱和密碼且需填寫");
        }else{
            let adminNo = chosedAdminNo.substr(7);
            let adminId = chosedAdminId;
            let adminPsw = chosedAdminPsw;
            let adminAuthority = chosedAdminAuthority;
            let data_info = `adminNo=${adminNo}&adminId=${adminId}&adminPsw=${adminPsw}&adminAuthority=${adminAuthority}`;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    editConfirm.classList.add('hidden');
                    alertBox.classList.remove('hidden');
                    alertMessage.innerText = '編輯完成！';
                      
                    setTimeout(function(){
                        alertBox.classList.add('hidden');
                    }, 2000);
                    // alert("編輯完成");
                    loadAdminData();
                }else{
                    alert(xhr.status)
                };
            };
            xhr.open("POST", "./php/cms_editAdmin.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data_info);
        };
    });
};

function AddItemCol(){
    let fruitTypeTable = document.getElementById('fruitTypeTable');
    let fruitTypeCol = document.createElement('tr');
    let fruitTypeStr = 
    `
    <td class="fruitTypeNo">
        
    </td>
    <td>
        <select class="form-control selectHealthType">
            <option name="healthType[]" value="1" selected="">幫助消化</option>
            <option name="healthType[]" value="2">活化大腦</option>
            <option name="healthType[]" value="3">保護血管</option>
            <option name="healthType[]" value="4">其它</option>
        </select>
    </td>
    <td>
        <input type="text" class="fruitTypeName" value="">
    </td>
    <td>
        <input type="text" class="fruitUnitPrice" value="">
    </td>
    <td>
        <label for="upFile"><img class="imgPreview" src="" width="80"></label>
        <input type="file" name="upFile" class="upFile" style="">
    </td>
    <td>
        <label class="switch switch-3d switch-danger">
            <input class="switch-input btnOnOffItem" type="checkbox">
            <span class="switch-slider"></span>
        </label>
    </td>
    <td>
    <button type="button" class="btn btn-pill btn-primary btn-xl" id="btnAddItem">新增</button>
    </td>
    <td>
    <button type="button" class="btn btn-pill btn-danger btn-xl" id="btnCancelAddItem">刪除</button>
    </td>
    `;
    fruitTypeCol.innerHTML = fruitTypeStr;
    fruitTypeTable.appendChild(fruitTypeCol);
    btnAddItem = document.getElementById('btnAddItem');
    btnAddItem.addEventListener('click', function(){
        AddItem();
    });
    document.getElementById('AddItem').addEventListener('click', function(){
        fruitTypeTable.removeChild(fruitTypeTable.lastChild);
    });
};

function AddAdmin(){
    addConfirm = document.getElementById('addConfirm');
    addConfirm.classList.remove('hidden');
    document.getElementById('cancel_add_btn').addEventListener('click', function(){
        addConfirm.classList.add('hidden');
    });

    document.getElementById('submit_add_btn').addEventListener('click', function(){
        let adminId = btnAddAdmin.parentNode.parentNode.getElementsByClassName('adminId')[0].value;
        let adminPsw = btnAddAdmin.parentNode.parentNode.getElementsByClassName('adminPsw')[0].value;
        let adminAuthority = btnAddAdmin.parentNode.parentNode.querySelector('option:checked').value;
        // console.log(adminId, adminPsw, adminAuthority);
        if(adminId == "" || adminPsw == ""){
            alertBox.classList.remove('hidden');
            alertMessage.innerText = '帳號名稱和密碼且需填寫！';
              
            setTimeout(function(){
                alertBox.classList.add('hidden');
            }, 2000);
            // alert("帳號名稱和密碼且需填寫");
        }else{
            let data_info = `adminId=${adminId}&adminPsw=${adminPsw}&adminAuthority=${adminAuthority}`;
            let xhr = new XMLHttpRequest();
            xhr.onload = function(){
                if(xhr.status == 200){
                    addConfirm.classList.add('hidden');
                    alertBox.classList.remove('hidden');
                    alertMessage.innerText = '新增成功！';
                      
                    setTimeout(function(){
                        alertBox.classList.add('hidden');
                    }, 2000);
                    // alert("新增成功");
                    loadAdminData();
                }else{
                    alert(xhr.status)
                };
            };
            xhr.open("POST", "./php/cms_addAdmin.php", true);
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data_info);
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

    let btnDelAdmin = document.getElementsByClassName('btnDelAdmin');
    for(let i=0; i<btnDelAdmin.length; i++){
        btnDelAdmin[i].addEventListener('click', function(){
            var chosedAdmin = this.parentNode.parentNode.querySelector('input[type=hidden]').id;
            // var chosedAdminAuthority = this.parentNode.parentNode.querySelector('option:checked').value;
            // console.log(chosedAdmin, chosedAdminAuthority);
            deleteAdmin(chosedAdmin);
        });
    };

    let btnEditAdmin = document.getElementsByClassName('btnEditAdmin');
    for(let j=0; j<btnEditAdmin.length; j++){
        btnEditAdmin[j].addEventListener('click', function(){
            var chosedAdminNo = this.parentNode.parentNode.querySelector('input[type=hidden]').id;
            var chosedAdminId = this.parentNode.parentNode.getElementsByClassName('adminId')[0].value;
            var chosedAdminPsw = this.parentNode.parentNode.getElementsByClassName('adminPsw')[0].value;
            var chosedAdminAuthority = this.parentNode.parentNode.querySelector('option:checked').value;
            editAdmin(chosedAdminNo, chosedAdminId, chosedAdminPsw, chosedAdminAuthority);
        });
    };
};

window.addEventListener('load', doFirst);