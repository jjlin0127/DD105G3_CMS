var storage = sessionStorage;
var admin = '';
function cms_login(){
    let adminId = document.getElementById("adminId").value;
    let adminPsw = document.getElementById("adminPsw").value; 
    let data_info = `adminId=${adminId}&adminPsw=${adminPsw}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if(xhr.status == 200){
            if(xhr.responseText.indexOf('error') == -1){
                admin = JSON.parse(xhr.responseText);
                // console.log(admin.adminNo)
                storage.setItem("adminNo", `${admin.adminNo}`);
                storage.setItem("adminId", `${admin.adminId}`);
                storage.setItem("adminAuthority", `${admin.adminAuthority}`);
                window.location.href = "cms_index.html";
            }else{
                alert('帳密錯誤，請重新輸入!');
        }
        }else{
            alert(xhr.status);
        };
    };
    xhr.open("POST", "php/cms_login.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);

    document.getElementById('adminId').value = '';
    document.getElementById('adminPsw').value = '';
};

function doFirst(){
    // getLoginInfo();
    document.getElementById('btnLogin').addEventListener('click', cms_login);
};

window.addEventListener('load', doFirst);