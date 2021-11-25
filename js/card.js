function addtocart(pid, pname) {
    var quantity = $("#quantity").val() != "" ? parseInt($("#quantity").val()) : 0;
    var price = $("#pprice").text();
    var pprice = price.replace(/[^\x00-\x7F]/g, "");
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
            pprice: pprice,
            quantity: quantity
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
        actual_stored_product.quantity = parseInt(actual_qty) + quantity;
        //now..we have updated value..push obj again..
        pcart.push(actual_stored_product);
        //store the json in local Storage
        localStorage.setItem("cart", JSON.stringify(pcart));
    }
    console.log(JSON.stringify(pcart));
    updatecart();
}

// function updatecart() {
//     var cartstring = localStorage.getItem("cart");
//     console.log(JSON.parse(cartstring));
//     var cart = JSON.parse(cartstring);
//     console.log(cart.pprice);
//     var cartlength = cart.length;
//     if (cart == null || cart.length == 0) {
//         console.log("Cart is empty!!!!");
//         $(".add_cart_wrap").html('0');
//     } else {
//         // there is some item in the cart
//         console.log(cart);
//         $(".add_cart_wrap").html(cartlength);
//     }
// }



function updatecart() {
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
        document.getElementsByClassName("sub-total")[i].innerText = formatCash(subPrice+'')+' VND';
        total = total + (price * quantity);
    }
    document.getElementsByClassName("cart-total-price")[0].innerText = formatCash(total+'') + ' VND';
}

function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}