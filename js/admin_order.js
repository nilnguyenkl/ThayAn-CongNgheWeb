// Show all order
function showOrder(){
    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/admin/orders/',
        success: function (data) {     
            var htmls = data.map(function (item) {
                return `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.fullname}</td>
                    <td>${item.phoneNumber}</td>
                    <td>${item.email}</td>
                    <td>${item.address}</td>
                    <td>${item.total} VND</td>
                    <td>${item.createdDate}</td>
                    <td>${item.orderState}</td>
                    <td><a href="admin_order_details.html?id=${item.id}" class="btn btn-primary"><i class="fas fa-eye"></i></a></td>
                </tr>
                `;
            })
            $('#content-order').html(htmls.join(''));
        }
    });
}
showOrder();

