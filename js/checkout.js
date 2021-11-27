$(document).ready(function () {

    $.ajax({
        dataType: 'json',
        url: 'http://localhost:8082/api/address/TTP',
        success: function (data1) {
            var htmls = data1.map(function (item) {
                return `<option value='${item.matp}'>${item.name}</option>`;
            })
            $('#province').html(`<option value="">None</option>` + htmls.join(''));
        }
    });

    $('#province').on('change', function () {
        var selectedProvince = $(this).val();
        if (selectedProvince) {
            $.ajax({
                dataType: 'json',
                url: 'http://localhost:8082/api/address/QH?matp=' + selectedProvince,
                success: function (data2) {
                    var htmls = data2.map(function (item) {
                        return `<option value='${item.maqh}'>${item.name}</option>`;
                    })
                    $('#district').html(htmls.join(''));
                }
            });
        } else {
            $('#district').empty();
            $('#district').html(`<option value="">None</option>`);
            $('#town').html(`<option value="">None</option>`);
        }
    });

    $('#district').on('change', function () {
        var selectedDistrict = $(this).val();
        if (selectedDistrict) {
            $.ajax({
                dataType: 'json',
                url: 'http://localhost:8082/api/address/XPTT?maqh=' + selectedDistrict,
                success: function (data3) {
                    var htmls = data3.map(function (item) {
                        return `<option value='${item.maqh}'>${item.name}</option>`;
                    })
                    $('#town').html(htmls.join(''));
                }
            });
        } else {
            $('#town').empty();
            $('#town').html(`<option value="">None</option>`);
        }
    });
});


function checkout() {
    let lastname = $('#lastname').val();
    let firtname = $('#firtname').val();
    let fullname = lastname + ' ' + firtname;
    let email = $('#email').val();
    let phonenumber = $('#phonenumber').val();
    let province = $('#province :selected').text();
    let district = $('#district :selected').text();
    let town = $('#town :selected').text();
    let addressdt = $('#dt').val();
    let address = addressdt + ', ' + town + ', ' + district + ', ' + province;
    let note = $('#note').val();

    var cart = localStorage.getItem("cart");
    var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
    if (pcart.length == 0) {
        alert("No product in cart");
        window.location.href = "shop.html";
    } else {
        var total = 0;

        var listItem = [];
        pcart.forEach(element => {
            total += element.pprice * element.quantity;
            let item = {
                productId: element.productid,
                quantity: element.quantity,
                price: element.pprice
            }
            listItem.push(item);
        });

        var order = {
            fullname: fullname,
            phoneNumber: phonenumber,
            email: email,
            address: address,
            total: total,
            note: note,
            items: listItem
        }

        data = JSON.stringify(order);
        console.log(data);
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: 'http://localhost:8082/api/orders',
            data: data,
            success: function (res) {
                console.log("them thanh cong");
                window.location.href = "shop.html";
            },
            error: function (res) {
                console.log(res);
            }
        });
    }
}


