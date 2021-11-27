$(document).ready(function(){
    // Analysis
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/analysis',
        success: function (data) {
            $(`<h3 class="fs-2">${data.totalBrand}</h3>`).insertBefore("#title-brand");
            $(`<h3 class="fs-2">${data.totalProduct}</h3>`).insertBefore("#title-product");
            $(`<h3 class="fs-2">${data.totalOrder}</h3>`).insertBefore("#title-order");
        }
    });

    // All product
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/products?size=1000',
        success: function (data) {
            var htmls = data.products.map(function (item) {
                return `
                <tr>
                    <td>${item.id}</td>
                    <td><img src="http://localhost:8082/images/productImages/${item.images}"></td>
                    <td>
                        <h5>${item.title}</h5>
                    </td>
                    <td>
                        <h5>${item.brandName}</h5>
                    </td>
                    <td>
                        <h5>${item.price} VND</h5>
                    </td>
                    <td>
                        <h5>
                            <h5>${item.quantity}</h5>
                        </h5>
                    </td>
                </tr>
                `;
            })
            $('#content-all-product').html(htmls.join(''));
        }
    });
});