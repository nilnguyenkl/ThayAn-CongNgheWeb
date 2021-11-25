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
        var formData = new FormData();
        var total_file = $('#gallery-photo-add').get(0).files.length; 
        for (let i = 0; i < total_file; i++ ){
            formData.append('images', $('#gallery-photo-add').get(0).files[i]);
        }
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
        }
        data =  JSON.stringify(product);
        formData.append('product', data);
        $.ajax({
            type: 'POST',
            contentType: false,
            processData: false,
            url: 'http://localhost:8082/api/admin/products',
            data: formData,
            success: function (res) {
                alert(res);
            },
            error: function(res){
                alert(res);
            }
        });
    });
});