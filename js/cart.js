function addtocart(pid, pimg, price, pname) {
    var pquantity = parseInt($("#quantity").val());
    var cart = localStorage.getItem("cart");
    var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
    //get index of the json array where the productid is there ...
    var present_or_not = pcart.findIndex(item => item.productid == pid);
    //if the item not presnt , is null
    if (cart == null || present_or_not == null || present_or_not == -1) {
        var product = {
            productid: pid,
            productname: pname,
            productImg: pimg,
            pprice: price,
            quantity: pquantity
        };
        pcart.push(product);
        localStorage.setItem("cart", JSON.stringify(pcart));

    } else {
        //get the the json from index...
        var actual_stored_product = pcart[present_or_not];
        pcart.splice(present_or_not, 1); //remove the json array 
        //get the qty which was already prsnt
        var actual_qty = actual_stored_product.quantity == null || actual_stored_product.quantity == "" ? 0 : actual_stored_product.quantity;
        //update the value
        actual_stored_product.quantity = parseInt(actual_qty) + parseInt($("#quantity").val());
        //now..we have updated value..push obj again..
        pcart.push(actual_stored_product);
        //store the json in local Storage
        localStorage.setItem("cart", JSON.stringify(pcart));
    }
    $('#add').attr('disabled',true);
}

function remove(pid) {
    var cart = localStorage.getItem("cart");
    var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
    var present_or_not = pcart.findIndex(item => item.productid == pid);
    pcart.splice(present_or_not, 1);
    localStorage.setItem("cart", JSON.stringify(pcart));
    renderCart();

}

function renderCart() {
    var cartstring = localStorage.getItem("cart");
    var cart = JSON.parse(cartstring);
    // if (cart == null || cart.length == 0) {
    //     console.log("Cart is empty!!!!");
    //     $(".add_cart_wrap").html('0');
    // } else {
    //     // there is some item in the cart
    //     console.log(cart);
    //     $(".add_cart_wrap").html(cartlength);
    // }
    if (cart == null || cart.length == 0) {
        var html = `
            <h2>There are no products in the cart</h2>
        `;
        $('#cart-container').html(html);
        $('#checkout').attr('disabled',true);
    } else {
        var htmls = cart.map(function (item) {
            return `
            <tr class="cart_row">
                <td><a onclick="remove(${item.productid})"><i class="fas fa-trash-alt"></i></a></td>
                <td><img src="http://localhost:8082/images/productImages/${item.productImg}"></td>
                <td>
                    <h5>${item.productname}</h5>
                </td>
                <td>
                    <h5 value="${item.pprice}" id="pprice" class="cart-price">${item.pprice} vnd</h5>
                </td>
                <td>
                    <input value="${item.quantity}" min="1" class="w-25 pl-1 cart-quantity-input" type="number" onchange="updatecart(${item.productid},this.value)">
                </td>
                <td>
                    <h5>
                        <h5 class="sub-total"></h5>
                    </h5>
                </td>
            </tr>
            `;
        })
        $('#cart_body').html(htmls.join(''));
    }
    updatecart(null,null);
}


function updatecart(pid, qtt) {
    if (pid !== null && qtt !== null) {
        var cart = localStorage.getItem("cart");
        var pcart = JSON.parse(cart) != null ? JSON.parse(cart) : [];
        var present_or_not = pcart.findIndex(item => item.productid == pid);
        var actual_stored_product = pcart[present_or_not];
        pcart.splice(present_or_not, 1);
        actual_stored_product.quantity = parseInt(qtt);
        // pcart.push(actual_stored_product);
        pcart.splice(present_or_not, 0,actual_stored_product);
        localStorage.setItem("cart", JSON.stringify(pcart));
    }

    var cart_rows = document.getElementsByClassName("cart_row");
    var total = 0;
    for (var i = 0; i < cart_rows.length; i++) {
        var cart_row = cart_rows[i];
        var price_item = cart_row.getElementsByClassName("cart-price")[0].innerHTML;
        var pprice = price_item.replace(/[^\x00-\x7F]/g, "");
        var quantity_item = cart_row.getElementsByClassName("cart-quantity-input")[0];
        var quantity = parseInt(quantity_item.value);
        var price = parseInt(pprice);
        var subPrice = price * quantity;
        document.getElementsByClassName("sub-total")[i].innerText = formatCash(subPrice + '') + ' VND';
        total = total + (price * quantity);
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = formatCash(total + '') + ' VND';
}

function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
