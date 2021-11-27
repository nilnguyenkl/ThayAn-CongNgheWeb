$(document).ready(function(){
    
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

    // Show product detail
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/products/' + id,
        success: function (data) {
            var total_images = data.images.length;
            var getImages = '';
            for (let i = 0; i < total_images; i++ ){
                getImages = getImages + `
                    <div class="small-img-col">
                        <img id="${i}" onclick= "previewImg(this.id)" src="http://localhost:8082/images/productImages/${data.images[i]}" width="100%" class="small-img">
                    </div>
                `;
            }
            htmls =  `
                <div class="row">
                    <div class="col-lg-5 col-md-12 col-12">
                        <img id="main-image" class="img-fluid w-100" src="http://localhost:8082/images/productImages/${data.images[0]}">
                        <div id="getImage" class="small-img-group">
                            <div class="small-img-group">`
                            +
                                getImages
                            +
                        `   </div>  
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-12 col-12">
                        <h6>Home / ${data.brandName}</h6>
                        <h3>${data.title}</h3>
                        <h2>${data.price} VND</h2>
                        <h4 class="mt-4">Product Details</h4>
                        <span>
                            Quantity : ${data.quantity} <br>
                            Brand Name : ${data.brandName} <br>
                            Sex : ${data.gioiTinh} <br>
                            Color Name : ${data.colorName} <br>
                            Material : ${data.chatLieuName} <br>
                            Descript : ${data.describes} <br> 
                        </span>
                        <div class="mt-4">
                            <input type="number" value="1">
                            <button class="buy-btn">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            `;
            $('#sproduct-container').html(htmls);
        }
    });


    
    // Add comment
    $('#add-comment').click(function(){
        var comment = {
            fullname : $('#nameCus').val(),
            email : $('#emailCus').val(),
            phoneNumber : $('#phoneCus').val(),
            content : $('#content').val(),
            rate: 5
        }
        data =  JSON.stringify(comment);

        $.ajax({
            contentType: "application/json",
            type: "POST",
            dataType: 'json',
            url: 'http://localhost:8082/api/comments/' + id,
            data: data,
            success: function (res) {
                showComment();
            },
            error: function(res){
                alert(res);
            }
        });
    });


    // Show all comment
    function showComment(){
        $.ajax({
            dataType: 'json',
            url: 'http://localhost:8082/api/comments/' + id,
            success: function (data) {
                var htmls = data.map(function (item) {
                    return `
                        <div class="row mb-3">
                            <div class="col-mg-4 ml-3 mr-3">
                                <img style="width: 60px; height: 60px;" class="rounded-circle" src="../images/featured/1.jpg">
                            </div>
                            <div class="col-mg-6">
                                <span>${item.fullname}</span>
                                <br>
                                <span class="star">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </span>
                                <br>
                                <span style="color:lightslategrey; font-size: 12px;">${item.createdDate}</span>
                                <br>
                                <span>${item.content}</span>
                            </div>
                        </div>
                    `;
                })
                $('#all-comment').html(htmls.join(''));
            }
        });
    }
    showComment();
});

function previewImg(id){
    var attr = $("#"+id).attr("src");
    $('#main-image').attr("src", attr);
}
