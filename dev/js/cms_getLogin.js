function $id(id){
	return document.getElementById(id);
}	

let admin;
function cms_logout(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status == 200){
      $id('adminName').innerText = '';
      window.location.href = "cms_login.html";
    }else{
      alert(xhr.status);
    };
  };
  xhr.open("get","./php/cms_logout.php", true);
  xhr.send(null);
};

function cms_getLoginInfo(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status == 200){
      admin = JSON.parse(xhr.responseText);
      if(admin.adminId){
        $id("adminName").innerText = admin.adminId + ' 您好';
        if(admin.adminAuthority == "2"){
          $id('adminNav').classList.add('noAuthority');
          $id('adminNav').nextElementSibling.classList.add('noAuthority');
        }
      }else{
        window.location.href = "cms_login.html";
      }
    }else{
      alert(xhr.status);
    };
  };
  xhr.open("get", "./php/cms_getLoginInfo.php", true);
  xhr.send(null);
};

function doFirst(){
    cms_getLoginInfo();
    $id('btnLogout').addEventListener('click', cms_logout);
};

window.addEventListener('load', doFirst);
