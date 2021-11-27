$(document).ready(function(){
    // Show all product
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/products',
        success: function (data) {     
            var htmls = data.products.map(function (item) {
                return `
                    <div class="product text-center col-lg-3 col-mg-4 col-12">
                        <a style = "text-decoration: inherit; color: inherit;" href="sproduct.html?id=${item.id}">
                            <img class="img-fluid mb-3" src="http://localhost:8082/images/productImages/${item.images[0]}">
                            <div class="star">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                            <h5 class="p-name">${item.title}</h5>
                            <h4 class="p-price">${item.price} VND</h4>
                        </a>
                        <button class="buy-btn">Buy Now</button>
                    </div>
                `;
            })
            $('#all-product').html(htmls.join(''));
        }
    });
});
