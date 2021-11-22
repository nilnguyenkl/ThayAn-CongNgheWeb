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
        }else{
            $('#district').empty();
            $('#district').html(`<option value="">None</option>`);
            $('#town').html(`<option value="">None</option>`);
        }
    });

    $('#district').on('change', function () {
        var selectedDistrict = $(this).val();
        if (selectedDistrict){
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
        }else{
            $('#town').empty();
            $('#town').html(`<option value="">None</option>`);
        }   
    });
});