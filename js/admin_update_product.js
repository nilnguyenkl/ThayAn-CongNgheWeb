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

function setValueDefault(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/products/' + id,
        success: function (data) {
            $('#codeProduct').val(`${data.productCode}`);
            $('#nameProduct').val(`${data.title}`);
            $('#priceProduct').val(`${data.price}`);
            $('#quantityProduct').val(`${data.quantity}`);
            $('#descriptProduct').val(`${data.describes}`);
            $("#brandProduct").val(data.brandCode).change();
            $("#colorProduct").val(data.colorCode).change();
            $("#materialProduct").val(data.chatLieuCode).change();
            $("#sexProduct").val(data.gioiTinh).change();
        }
    });
}

// Fetch brand
function fetchBrand(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/brand',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#brandProduct').html(htmls.join(''));
            fetchColor();
        }
    });
}


// Fetch color
function fetchColor(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/color',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#colorProduct').html(htmls.join(''));
            fetchMaterial();
        }
    });
}

    
// Fetch material
function fetchMaterial(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/chatlieu',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#materialProduct').html(htmls.join(''));
            setValueDefault();
        }
    });
}

// Update
function updateProduct(){
    $('#sbUpdate').click(function(event){
        
        event.preventDefault();

        // Data
        var product = {
            title : $('#nameProduct').val(),
            productCode : $('#codeProduct').val(),
            price : $('#priceProduct').val(),
            quantity : parseInt($('#quantityProduct').val()),
            describes : parseInt($('#descriptProduct').val()),
            brandCode : $('#brandProduct').val(),
            gioiTinh : $('#sexProduct').val(),
            colorCode : $('#colorProduct').val(),
            chatLieuCode : $('#materialProduct').val(),
        }
        data =  JSON.stringify(product);
        console.log(data);

        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json',
            url: 'http://localhost:8082/api/admin/products/' + id,
            data: data,
            success: function (res) {
               alert("Change product is successful");
               window.location.href = "admin_product.html";
            },
            error: function(res){
                alert("Change product is failed");
            }
        });
    });
}

fetchBrand();
updateProduct();



    

