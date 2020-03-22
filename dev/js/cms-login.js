//此段處理登入登出
function $id(id) {
    return document.getElementById(id);
}

let member;

function showLoginForm() {
    if ($id('spanLogin').innerHTML == "登入" || $id("mobilespanLogin").innerHTML == "登入") {
        $id('spanLogin').location = location.href = "login.html";
        $id('mobileloginLink').location = location.href = "login.html";
    } else { //登出
        $id('spanLogin').location = window.location.href;
        $id('mobileloginLink').location = window.location.href;
        //-----------回server登出session
        let xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status == 200) { //自server正確的登出
                $id("memNo").value = '&nbsp';
                $id('memNickname').innerHTML = '&nbsp';
                $id('spanLogin').innerHTML = '登入';
                //以下漢堡內的變化
                $id("mobilememNickname").innerHTML = '&nbsp';
                $id("mobilespanLogin").innerHTML = "登入";
            } else {
                alert(xhr.status);
            }
        }
        xhr.open("get", "./php/logout.php", true);
        xhr.send(null);
    }
} //showLoginForm

function sendForm(e) {
    // e.preventDefault();
    //=====使用Ajax 回server端,取回登入者的相關資訊, 放到頁面上  
    let memId = $id("memId").value;
    let memPsw = $id("memPsw").value;
    let data_info = `memId=${memId}&memPsw=${memPsw}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            member = xhr.responseText;
            if (member == "error") {
                alert("帳密錯誤請重新輸入");
            } else {
                success = JSON.parse(xhr.responseText)
                $id("memNickname").innerText = member.memNickname;
                $id("spanLogin").innerText = "登出";
                window.history.back();
            }

        } else { alert(xhr.status); }

    }
    xhr.open("Post", "./php/ajaxLogin.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
    return false;
}

function mobilesendForm(e) {
    // e.preventDefault();
    //=====使用Ajax 回server端,取回登入者的相關資訊, 放到頁面上  
    let memId = $id("mobilememId").value;
    let memPsw = $id("mobilememPsw").value;
    let data_info = `memId=${memId}&memPsw=${memPsw}`;

    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            member = xhr.responseText;
            if (member == "error") {
                alert("帳密錯誤請重新輸入");
            } else {
                success = JSON.parse(xhr.responseText)
                $id("memNickname").innerText = member.memNickname;
                $id("spanLogin").innerText = "登出";
                window.history.back();
            }
        } else { alert(xhr.status); }
    }
    xhr.open("Post", "./php/ajaxLogin.php", true);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send(data_info);
    return false;
}

function getLoginInfo() {
    let xhr = new XMLHttpRequest();
    xhr.onload = function() {
        member = JSON.parse(xhr.responseText);

        if (member.memId) {
            $id("memNo").value = member.memNo;
            $id("memNickname").innerText = member.memNickname;
            $id("spanLogin").innerText = "登出";
            //以下漢堡內的變化
            $id("mobilememNickname").innerText = `${member.memNickname}，您好`;
            $id("mobilespanLogin").innerText = "登出";
        }
    }
    xhr.open("get", "./php/getLoginInfo.php", true);
    xhr.send(null);

};
//以上登入登出結束

//此段處理註冊
function registerfun(e) {
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    pswRule = /\w{5,17}$/;
    if ($('.registeremail').val() != "" &&
        $('.firsttimepsw').val() != "" &&
        $('.confirmpsw').val() != "" &&
        $('.regisnickname').val() != "") { //表單都有填寫
        if ($('.registeremail').val().match(emailRule)) { //email有確實填
            if ($('.firsttimepsw').val().match(pswRule)) { //密碼字母開頭，長度在6~18間，只能包含字母、數字、下底線
                if ($('.whiteform .firsttimepsw').val() === $('.whiteform .confirmpsw').val()) { //密碼與確認密碼輸入一致
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.responseText == 'success') { //恭喜經過一切驗證, 終成天然甘會員
                                alert('註冊成功! 歡迎加入天然甘, 請重新登入');
                                $(location).attr('href', './login.html');
                            } else if (xhr.responseText.match('23000')) { //email重複
                                alert('Email已存在, 請重新輸入!');
                            } else {
                                alert(xhr.responseText);
                            }
                        }
                    }
                    let regisnickname = $('.regisnickname').val();
                    let regismemId = $('.registeremail').val();
                    let regispsw = $('.registerinput1').val();
                    let member_data = `memNickname=${regisnickname}&memId=${regismemId}&memPsw=${regispsw}`;
                    let url = "./php/register.php";
                    xhr.open("post", url, true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(member_data);
                } else {
                    alert('請檢查兩次密碼輸入是否一致');
                    $('.whiteform .firsttimepsw').val('').focus();
                    $('.whiteform .confirmpsw').val('');
                }
            } else {
                alert('密碼須為字母開頭，長度在6~18間，只能包含字母、數字、下底線')
            }
        } else {
            alert('請檢查您輸入的email是否正確')
        }
    } else {
        alert('請輸入完整訊息再送出!');
    }

}

function mobileregisterfun(e) {
    e.preventDefault();
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    pswRule = /\w{5,17}$/;
    if ($('#mobilelogintab2 .registeremail').val() != "" &&
        $('#mobilelogintab2 .firsttimepsw').val() != "" &&
        $('#mobilelogintab2 .confirmpsw').val() != "" &&
        $('#mobilelogintab2 .regisnickname').val() != "") { //表單都有填寫
        if ($('#mobilelogintab2 .registeremail').val().match(emailRule)) { //email有確實填
            if ($('#mobilelogintab2 .firsttimepsw').val().match(pswRule)) { //密碼字母開頭，長度在6~18間，只能包含字母、數字、下底線
                if ($('#mobilelogintab2 .firsttimepsw').val() === $('#mobilelogintab2 .confirmpsw').val()) { //密碼與確認密碼輸入一致
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            if (xhr.responseText == 'success') { //恭喜經過一切驗證, 終成天然甘會員
                                alert('註冊成功! 歡迎加入天然甘, 請重新登入');
                                $(location).attr('href', './login.html');
                            } else if (xhr.responseText.match('23000')) { //email重複
                                alert('Email已存在, 請重新輸入!');
                            } else {
                                alert(xhr.responseText);
                            }
                        }
                    }
                    let regisnickname = $('#mobilelogintab2 .regisnickname').val();
                    let regismemId = $('#mobilelogintab2 .registeremail').val();
                    let regispsw = $('#mobilelogintab2 .registerinput1').val();
                    let member_data = `memNickname=${regisnickname}&memId=${regismemId}&memPsw=${regispsw}`;
                    let url = "./php/register.php";
                    xhr.open("post", url, true);
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                    xhr.send(member_data);
                } else {
                    alert('請檢查兩次密碼輸入是否一致');
                    $('#mobilelogintab2 .firsttimepsw').val('').focus();
                    $('#mobilelogintab2 .confirmpsw').val('');
                }
            } else {
                alert('密碼須為字母開頭，長度在6~18間，只能包含字母、數字、下底線')
            }
        } else {
            alert('請檢查您輸入的email是否正確')
        }
    } else {
        alert('請輸入完整訊息再送出!');
    }
}


window.addEventListener("load", function() {
    //檢查是否已登入
    getLoginInfo();

    //轉跳登入頁
    $id('spanLogin').onclick = showLoginForm;
    $id('mobilespanLogin').onclick = showLoginForm;

    //送出登入表單
    if (window.location.href.indexOf("login") > -1) { //沒有這個if在login.html以外的分頁會報錯
        $id('btnLogin').onclick = sendForm;
        $id('mobilebtnLogin').onclick = mobilesendForm;
        //送出註冊表單
        $id('btnRegis').onclick = registerfun;
        $id('mobilebtnRegis').onclick = mobileregisterfun;
    }
}, false);