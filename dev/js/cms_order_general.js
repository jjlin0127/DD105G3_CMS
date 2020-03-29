getOrder();

function getOrder(){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        var orderArr = JSON.parse(xhr.responseText);
        let tbody = document.getElementById("tbody");
        let orderStr = '';
        orderArr.forEach((ord) => {
            orderStr += `
                <tr>
                    <td>${ord.ordNo}</td>
                    <td>${ord.memNo}</td>
                    <td>${ord.ordDatetime}</td>
                    <td>${ord.ordTotal}</td>
                    <td>${ord.ordName}</td>
                    <td>${ord.ordaddr}</td>
                    <td>${ord.ordtel}</td>
                    <td>${ord.ordPay}</td>
                    <td>${ord.box}</td>
                    <td>
                      <label class="switch switch-3d switch-danger">
                          <input class="switch-input btnBlockArti" type="checkbox">
                          <span class="switch-slider"></span>
                      </label>
                    </td>
                </tr>
            `
        });
        tbody.innerHTML = orderStr;
    }
    xhr.open('GET','./php/cms_order_general.php', true);
    xhr.send(null);
}


