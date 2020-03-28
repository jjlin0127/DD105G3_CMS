var admin = '';
function cms_logout(){
  let xhr = new XMLHttpRequest();
  xhr.onload = function(){
    if(xhr.status == 200){
      document.getElementById('adminName').innerText = '';
      sessionStorage.clear();
      window.location.href = "cms_login.html";
    }else{
      alert(xhr.status);
    };
  };
  xhr.open("get","./php/cms_logout.php", true);
  xhr.send(null);
};

// function cms_getLoginInfo(){
//   let xhr = new XMLHttpRequest();
//   xhr.onload = function(){
//     if(xhr.status == 200){
//       admin = JSON.parse(xhr.responseText);
//       if(admin.adminId){
//         document.getElementById("adminName").innerText = admin.adminId + ' 您好';
//         if(admin.adminAuthority == "2"){
//           document.getElementById('adminNav').classList.add('noAuthority');
//           document.getElementById('adminNav').nextElementSibling.classList.add('noAuthority');
//         }
//       }else{
//         window.location.href = "cms_login.html";
//       }
//     }else{
//       alert(xhr.status);
//     };
//   };
//   xhr.open("get", "./php/cms_getLoginInfo.php", true);
//   xhr.send(null);
// };

function cms_getLoginInfo(){
    document.getElementById("adminName").innerText = sessionStorage.getItem('adminId') + ' 您好';

    if(sessionStorage.getItem('adminAuthority') == "2"){
      document.getElementById('adminNav').classList.add('noAuthority');
      document.getElementById('adminNav').nextElementSibling.classList.add('noAuthority');
    };

    if(sessionStorage.getItem('adminNo') == null){
    window.location.href = "cms_login.html";
  };
};

function doFirst(){
    cms_getLoginInfo();
    document.getElementById('btnLogout').addEventListener('click', cms_logout);
};

window.addEventListener('load', doFirst);
