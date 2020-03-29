getBoxImg();

function getBoxImg(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var boxImgArr = JSON.parse(xhr.responseText);
        let tbody = document.getElementById("tbody");
        let boxImgStr = '';
        boxImgArr.forEach((img) => {
            boxImgStr += `
                <tr>
                    <td>${img.boxImgNo}</td>
                    <td>${img.boxImgName}</td>
                    <td>${img.boxImgPath}</td>
            `;
            switch (`${img.boxImgStatus}`){
                case "0":
                    boxImgStr += `
                        <td>
                            <label class="switch switch-3d switch-danger">
                                <input class="switch-input btnBlockArti" type="checkbox">
                                <span class="switch-slider"></span>
                            </label>
                        </td>
                    </tr>
                    `
                    break;
                case "1":
                    boxImgStr += `
                        <td>
                            <label class="switch switch-3d switch-danger">
                                <input class="switch-input btnBlockArti" type="checkbox" checked="">
                                <span class="switch-slider"></span>
                            </label>
                        </td>
                    </tr>
                    `
                    break;

            }
        });
        tbody.innerHTML = boxImgStr;
    }
    xhr.open('GET','./php/cms_boxMaterial.php', true);
    xhr.send(null);
}


function changeStatus(){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        
    };
    xhr.open('GET','./php/changeBoxImgStatus.php',true);
    xhr,send(null);
}

function doFirst(){
    let switchBtn = document.querySelectorAll('.switch-input');
    for(let i = 0; i < switchBtn.length; i++){
        switchBtn[i].addEventListener('click',changeStatus);
    }
}


window.addEventListener('load', doFirst);