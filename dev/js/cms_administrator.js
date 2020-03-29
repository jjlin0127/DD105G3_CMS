loadAdminData();

function loadAdminData(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        // if(xhr.staus == 200){
            var adminOriArr = JSON.parse(xhr.responseText);
            // deep copy
            adminArrCopy = JSON.parse(JSON.stringify(adminOriArr));
            // console.log(adminArrCopy);
            readInAdmin(adminArrCopy);
        // }else{
        //     alert(xhr.status);
        // };
    };
    xhr.open("GET", "./php/cms_getAdminData.php", true);
    xhr.send();
};

function readInAdmin(adminArr){       
    let adminStr = '';
    let adminAutorityStr = '';
    let adminDelStr = '';
    adminArr.forEach(function(admin){
        switch(admin.adminAuthority){
            case "1":
                adminAutorityStr =`
                <td>
                    <select class="form-control adminAuthority" disabled>
                    <option name="adminAuthority[]" value="1" selected="">最高</option>
                    <option name="adminAuthority[]" value="2">一般</option>
                    </select>
                </td>`;

                adminDelStr = `
                <td>
                    <button type="button" class="btn btn-pill btn-danger btn-xl btnDelAdmin" disabled>刪除</button>
                </td>`;
            break;
            case "2":
                adminAutorityStr =`
                <td>
                    <select class="form-control adminAuthority">
                    <option name="adminAuthority[]" value="1">最高</option>
                    <option name="adminAuthority[]" value="2" selected="">一般</option>
                    </select>
                </td>`;

                adminDelStr = `
                <td>
                    <button type="button" class="btn btn-pill btn-danger btn-xl btnDelAdmin">刪除</button>
                </td>`;
            break;

            default:
                adminAutorityStr =`
                <td>
                    <select class="form-control adminAuthority">
                    <option name="adminAuthority[]" value="1">最高</option>
                    <option name="adminAuthority[]" value="2" selected="">一般</option>
                    </select>
                </td>`;

                adminDelStr = `
                <td>
                    <button type="button" class="btn btn-pill btn-danger btn-xl btnDelAdmin" disabled>刪除</button>
                </td>`;
        };
        adminStr +=
        `
        <tr>
            <td>
                <input type="text" class="adminId" value="${admin.adminId}" size="20">
            </td>
            <td>
                <input type="text" class="adminPsw" value="${admin.adminPsw}" size="20">
            </td>
            <td class="lastLoginTime">
                ${admin.lastLoginTime}
            </td>` +
            adminAutorityStr +
            `
            <td>
                <button type="button" class="btn btn-pill btn-primary btn-xl btnEditAdmin">編輯</button>
            </td>
            <input type="hidden" id="adminNo${admin.adminNo}">` +
            adminDelStr +
        `</tr>
        `;
    });
    let adminTable = document.getElementById('adminTable');
    adminTable.innerHTML = adminStr;
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

function AddAdminCol(){
    let adminTable = document.getElementById('adminTable');
    let adminCol = document.createElement('tr');
    let adminStr = 
    `
    <td>
      <input type="text" class="adminId" value="">
    </td>
    <td>
      <input type="text" class="adminPsw" value="">
    </td>
    <td>

    </td>
    <td>
      <select class="form-control adminAuthority">
        <option name="adminAuthority[]" value="1">最高</option>
        <option name="adminAuthority[]" value="2" selected="">一般</option>
      </select>
    </td>
    <td>
      <button type="button" class="btn btn-pill btn-primary btn-xl" id="btnAddAdmin">新增</button>
    </td>
    <td>
        <button type="button" class="btn btn-pill btn-danger btn-xl" id="btnCancelAddAdmin">刪除</button>
    </td>
    `;
    adminCol.innerHTML = adminStr;
    adminTable.insertBefore(adminCol, adminTable.firstChild);
    btnAddAdmin = document.getElementById('btnAddAdmin');
    btnAddAdmin.addEventListener('click', function(){
        AddAdmin();
    });
    document.getElementById('btnCancelAddAdmin').addEventListener('click', function(){
        adminTable.removeChild(adminTable.firstChild);
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
    let btn_add_admin = document.getElementById('btn_add_admin');
    btn_add_admin.addEventListener('click', AddAdminCol);

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