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
    xhr.open("GET", "./php/getAdminData.php", true);
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
                <input type="text" class="adminId" value="${admin.adminId}">
            </td>
            <td>
                <input type="text" class="adminPsw" value="${admin.adminPsw}">
            </td>
            <td id="lastLoginTime">
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
    editConfirm = document.getElementById('editConfirm');
    editConfirm.classList.remove('hidden');
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
                alert("刪除帳號成功");
                loadAdminData();
            }else{
                alert(xhr.status)
            };
        };
        xhr.open("POST", "./php/deleteAdmin.php", true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.send(data_info);
    });
};

// function editAdmin(chosedAdmin, chosedAdminId, chosedAdminPsw, chosedAdminAuthority){
//     document.getElementById('cancel_delete_btn').addEventListener('click', function(){
//         deleteConfirm.classList.add('hidden');
//     });
// };

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
      <button type="button" class="btn btn-pill btn-primary btn-xl btnEditAdmin">編輯</button>
    </td>
    <td>
      
    </td>
    `;

    adminCol.innerHTML = adminStr;
    adminTable.appendChild(adminCol);
    doFirst();
};

function doFirst(){
    let btnAddAdmin = document.getElementById('btnAddAdmin');
    btnAddAdmin.addEventListener('click', AddAdminCol);

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
            var chosedAdmin = this.parentNode.parentNode.querySelector('input[type=hidden]').id;
            var chosedAdminId = this.parentNode.parentNode.getElementsByClassName('adminId')[0].value;
            var chosedAdminPsw = this.parentNode.parentNode.getElementsByClassName('adminPsw')[0].value;
            var chosedAdminAuthority = this.parentNode.parentNode.querySelector('option:checked').value;
            var lastLoginTime = this.parentNode.parentNode.querySelector('#lastLoginTime').innerText;
            // console.log(chosedAdmin, chosedAdminAuthority);
            if(lastLoginTime){
                let allAdminAdminAuthority = document.getElementsByClassName('adminAuthority');
                let authorityArr = [];
                for(let k=0; k<allAdminAdminAuthority.length; k++){
                    authorityArr.push(allAdminAdminAuthority[k].selectedIndex);
                };
                if(authorityArr.indexOf(0) == -1){
                    alert("至少需要一位最高權限管理員");
                }else{
                    editAdmin(chosedAdmin, chosedAdminId, chosedAdminPsw, chosedAdminAuthority);
                }
            }else{
                AddAdminCol(chosedAdminId, chosedAdminPsw, chosedAdminAuthority);
            };
            
        });
    };
};

window.addEventListener('load', doFirst);