
$('#search').keypress(function(event){
    var search_value = $('#search').val();
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        window.location.href = "shop.html?title="+search_value;   
    }
});

