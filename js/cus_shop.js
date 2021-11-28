var url ="http://localhost:8082/api/products";
var pageParam = GetParameterValues('page');
var titleParam = GetParameterValues('title');


function getUrl() {
    if (titleParam != null && pageParam != null) {
        return url+ '?page='+(pageParam-1)+'&title='+titleParam+'';
    } else if (titleParam != null && pageParam == null) {
        return url+ '?title='+titleParam+'';
    } else if (titleParam == null && pageParam != null) {
        return url+ '?page='+(pageParam-1)+'';
    } else {
        return url;
    }
}

// http://localhost/images/productImages/{name}
function init() {
    // Show all product
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: function (data) {
            var htmls = data.products.map(function (item) {
                var price = formatCash(item.price + '')
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
                            <h4 class="p-price">${price} VND</h4>
                        </a>
                        <button class="buy-btn">Buy Now</button>
                    </div>
                `;
            })
            $('#all-product').html(htmls.join(''));
            if (pageParam === null) {
                pt(data.totalPages, 0, titleParam);
            } else {
                pt(data.totalPages, pageParam - 1,titleParam);
            }
        }
    });
}

function pt(totalPages, currentPage, title) {

    console.log(totalPages, currentPage);
    current = currentPage + 1;
    var page = pagination(current, totalPages);
    console.log(page);
    if (titleParam === null) {
        if (current === 1) {
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}">${pg}</a>
                </li>
                `
                }
            })
            var htmlNext = `
                <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current + 1) + `">Next</a></li>
            `;
            var htmls = html + htmlNext;
        } else if (current >= totalPages) {
            var htmlPre = `
            <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current - 1) + `">Previous</a></li>
            `;
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}">${pg}</a>
                </li>
                `
                }
            })
            var htmls = htmlPre + html;
        } else {
            var htmlPre = `
            <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current - 1) + `">Previous</a></li>
            `;
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}">${pg}</a>
                </li>
                `
                }
            })
            var htmlNext = `
                <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current + 1) + `">Next</a></li>
            `;
            var htmls = htmlPre + html + htmlNext;
        }
    } else {
        if (current === 1) {
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}&title=${title}">${pg}</a>
                </li>
                `
                }
            })
            var htmlNext = `
                <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current + 1) +`&title=${title}">Next</a></li>
            `;
            var htmls = html + htmlNext;
        } else if (current >= totalPages) {
            var htmlPre = `
            <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current - 1) +`&title=${title}">Previous</a></li>
            `;
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}&title=${title}">${pg}</a>
                </li>
                `
                }
            })
            var htmls = htmlPre + html;
        } else {
            var htmlPre = `
            <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current - 1) + `&title=${title}">Previous</a></li>
            `;
            html = page.map(pg => {
                if (pg == currentPage + 1) {
                    return `
                <li class="page-item active">
                    <a class="page-link" href="#" disabled="disabled">${pg}</a>
                </li>
                `
                } else if(pg == '...'){
                    return `
                    <li class="page-item ">
                        <a class="page-link" href="#" disabled="disabled">${pg}</a>
                    </li>
                    `
                } else {
                    return `
                <li class="page-item">
                    <a class="page-link" href="shop.html?page=${pg}&title=${title}">${pg}</a>
                </li>
                `
                }
            })
            var htmlNext = `
                <li class="page-item"><a class="page-link" href="shop.html?page=`+ (current + 1) + `&title=${title}">Next</a></li>
            `;
            var htmls = htmlPre + html + htmlNext;
        }
    }
    

    var paginationHtml = `
    <nav aria-label="..." style="width:100%">
        <ul class="pagination" style="margin-left: 35%;">
            ${htmls}
        </ul>
    </nav>
    `;
    $('#all-product').append(paginationHtml);
    console.log(paginationHtml);
}

function pagination(c, m) {
    var current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range = [],
        rangeWithDots = [],
        l;

    for (let i = 1; i <= last; i++) {
        if (i == 1 || i == last || i >= left && i < right) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    return rangeWithDots;
}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
    return null;
}
// for (let i = 1, l = 20; i <= l; i++)
//     console.log(`Selected page ${i}:`, pagination(i, l));

init();