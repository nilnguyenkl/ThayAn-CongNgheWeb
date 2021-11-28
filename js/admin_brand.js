$(document).ready(function(){
    // Show all brand
    function showAllBrand(){
        $.ajax({
            dataType: 'json',
            url: 'http://localhost:8082/api/brand',
            success: function (data) {     
                var htmls = data.map(function (item) {
                    return `
                        <tr>
                            <td>${item.code}</td>
                            <td><img src="http://localhost:8082/images/brandImages/${item.imagePath}"></td>
                            <td>
                                <h5>${item.name}</h5>
                            </td>
                            <td>
                                <h5>${item.totalProduct}</h5>
                            </td>
                        </tr>
                    `;
                })
                $('#content-all-brand').html(htmls.join(''));
            }
        });
    }
    showAllBrand();
    
    // Add new brand
    $("#submit-new-brand").click(function(e){
        var formData = new FormData();
        var brand = {
            name : $('#name-brand').val(),
            code : $('#codename-brand').val(),
        }
        data =  JSON.stringify(brand);
        formData.append('brand', data);
        formData.append('image', $('#images-brand').get(0).files[0]);
        //console.log($('#images-brand').get(0).files[0]);
        $.ajax({
            type: 'POST',
            contentType: false,
            processData: false,
            url: 'http://localhost:8082/api/brand',
            data: formData,
            success: function (res) {
                showAllBrand();
                window.location.href = "admin_brand.html";
            },
            error: function(res){
                alert("Add brand is failed");
            }
        });
    });
});