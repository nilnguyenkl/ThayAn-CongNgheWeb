
// Fetch data table
function getProductC(temp, status){
    $.ajax({
        dataType: 'json',
        url: temp,
        success: function (data) {
            var htmls = data.products.map(function (item) {
                str =  `
                        <tr>
                            <td>${item.id}</td>
                            <td><img src="http://localhost:8082/images/productImages/${item.images}"></td>
                            <td>
                                <h5>${item.title}</h5>
                            </td>
                            <td>
                                <h5>${item.price} VND</h5>
                            </td>
                            <td>
                                <h5>${item.quantity}</h5>
                            </td>
                            <td>
                                <a href="admin_update_product.html?id=${item.id}" class="btn btn-success"><i class="far fa-edit"></i></a>
                                <button id="${item.id}" onclick= "deleteProduct(this.id)" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `;
                if (status === 'active'){
                    str =  `
                        <tr>
                            <td>${item.id}</td>
                            <td><img src="http://localhost:8082/images/productImages/${item.images}"></td>
                            <td>
                                <h5>${item.title}</h5>
                            </td>
                            <td>
                                <h5>${item.price} VND</h5>
                            </td>
                            <td>
                                <h5>${item.quantity}</h5>
                            </td>
                            <td>
                                <a href="admin_update_product.html?id=${item.id}" class="btn btn-success"><i class="far fa-edit"></i></a>
                                <button id="${item.id}" onclick= "deleteProduct(this.id)" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                            </td>
                        </tr>
                    `;
                }else{
                    str =  `
                        <tr>
                            <td>${item.id}</td>
                            <td><img src="http://localhost:8082/images/productImages/${item.images}"></td>
                            <td>
                                <h5>${item.title}</h5>
                            </td>
                            <td>
                                <h5>${item.price} VND</h5>
                            </td>
                            <td>
                                <h5>${item.quantity}</h5>
                            </td>
                            <td>None</td>
                        </tr>
                    `;
                }
                return str;
            })
            $('#fetch-all-product').html(htmls.join(''));
        }
    });
}

// // Show data product into table
function showProductC(){
    getProductC('http://localhost:8082/api/admin/products?size=1000', 'active');
    $('#filterbyStatus').change(function(){
        var val = $('#filterbyStatus').val();
        if (val === 'deactive'){
            temp = 'http://localhost:8082/api/admin/products?status=deactive&size=1000';
            getProductC(temp, 'deactive')
        }
        if (val === 'active'){
            temp = 'http://localhost:8082/api/admin/products?size=1000';
            getProductC(temp, 'active')
        }
    });
}
showProductC();


function deleteProduct(id){
    $.ajax({
        contentType: "application/json",
        type: "DELETE",
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/products/' + id,
        success: function (res) {
            //
        },
        error: function(res){
            showProductC(); 
        }
    });
}