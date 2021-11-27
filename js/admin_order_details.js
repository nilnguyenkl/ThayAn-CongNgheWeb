function GetParameterValues(param) {  
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
    for (var i = 0; i < url.length; i++) {  
        var urlparam = url[i].split('=');  
        if (urlparam[0] == param) {  
            return urlparam[1];  
        }  
    }  
}
var id = GetParameterValues('id');
// Show all order by id
function showInfor(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/orders/' + id,
        success: function (data) {     
            var htmls = `
                <h4>Ma Don Hang: ${data.id}</h4>
                <h4>Ho Va Ten: ${data.fullname}</h4>
                <h4>Date: ${data.createdDate}</h4>
                <h4>Total: total VND</h4>
                `;
            $('#inforCus').html(htmls);
        }
    });
}

// Show all product by id order
function showAllProduct(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/orders/' + id,
        success: function (data) {     
            var htmls = data.listItem.map(function (item) {
                return `
                <tr>
                    <th scope="row">${item.productId}</th>
                    <td><img style="height: 50px; width: 50px;" src="http://localhost:8082/images/productImages/${item.image}"></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                </tr>
                `;
            })
            $('#productByOrder').html(htmls.join(''));
        }
    });
}

showInfor();
showAllProduct();

