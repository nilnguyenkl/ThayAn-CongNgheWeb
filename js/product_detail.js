$(document).ready(function(){
    
    // Fetch brand
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/brand',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#brand').html(`<option value="">None</option>` + htmls.join(''));
        }
    });
    
    
    // Fetch color
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/color',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#color').html(`<option value="">None</option>` + htmls.join(''));
        }
    });

    // Fetch material
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/chatlieu',
        success: function (data) {
            var htmls = data.map(function (item) {
                return `<option value='${item.code}'>${item.name}</option>`;
            })
            $('#material').html(`<option value="">None</option>` + htmls.join(''));
        }
    });

    // Send data
    $('#submit').click(function(){
        // Data
        var product = {
            title : $('#name').val(),
            productCode : $('#code').val(),
            price : $('#price').val(),
            quantity : $('#quantity').val(),
            describes : $('#descript').val(),
            brandCode : $('#brand').val(),
            gioiTinh : $('#sex').val(),
            colorCode : $('#color').val(),
            chatLieuCode : $('#material').val(),
            images: [
                "thu1.jpg",
                "thu2.jpg",
                "thu3.jpg",
                "thu4.jpg"
            ]
        }
        // data =  JSON.stringify(product);
        // alert(data);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: 'http://localhost:8082/api/products',
            data: JSON.stringify(product),
            // data: product,
            success: function (res) {
                alert(res);
            },
            error: function(res){
                alert(res);
            }
        });
    });
});