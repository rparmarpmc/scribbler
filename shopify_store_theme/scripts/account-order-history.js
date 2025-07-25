let orders = []

// fetch(`https://livewholesale.scribbler.com/v1/shoppify/private/order_history?logged_in_customer_id=5708817891535`, { method: 'GET', headers: { 'Content-Type': 'application/json', Accept: `application/json` } })
fetch(`/apps/scribblerApi/v1/shoppify/private/order_history`, { method: 'GET', headers: { 'Content-Type': 'application/json', Accept: `application/json` } })
    .then(response => {
        if (!response.ok) {
            throw new Error('HTTP status ' + response.status)
        } else {
            return response.json()
        }
    })
    .then(response => {
        if (response.length > 0) {
            document.getElementById('customer-account-error').innerHTML = ''
            document.getElementById('customer-account-success').innerHTML = ''

            orders = response
            sortOrderList()
            generateOrderList()
            showOrderDetails(0)
        } else {
            document.getElementById('customer-account-error').innerHTML = response.error_msg ? response.error_msg?.map(message => message) : null
            document.getElementById('customer-account-success').innerHTML = ''
        }
    })
    .catch(e => {
        document.getElementById('customer-account-error').innerHTML = e.message
        document.getElementById('customer-account-success').innerHTML = ''
    })
    .finally(() => {})

const sortOrderList = () => {
    const shopifyOrders = []
    const redOrders = []
   
    orders.map(order => {
        if(order.OrderNumber) {
            redOrders.push(order)
        } else {
            shopifyOrders.push(order)
        }
    })

    shopifyOrders.sort(function (a, b) {
        let x = new Date(a.OrderDate)
        let y = new Date(b.OrderDate)

        // Compare the 2 dates
        if (x > y) return -1
        if (x < y) return 1
        return 0
    })

    redOrders.sort(function (a, b) {
        let x = new Date(a.OrderDate)
        let y = new Date(b.OrderDate)

        // Compare the 2 dates
        if (x > y) return -1
        if (x < y) return 1
        return 0
    })

    orders = shopifyOrders.concat(redOrders)
}

const generateOrderList = () => {
    const orderList = document.getElementById('order-list')
    orderList.innerHTML = ''
    let newOrderList = ''

    orders.map((order, index) => {
        let status = (order.order_status ? order.order_status : 'archive').toLowerCase()
        let className = 'order-history-status-despatched' // order-history-status-cancelled, order-history-status-processing
        // Canceled, Refunded, Unpaid, Voided, Unfulfilled
        // Fulfilled
        // Partially fulfilled, Paid, Scheduled, Authorized, Partially refunded, Pending  

        if (status === 'canceled' || status === 'refunded' || status === 'unpaid' || status === 'voided' || status === 'preparing order' || status  === 'archive') {
            className = 'order-history-status-cancelled'
        } else if (status === 'partially fulfilled' || status === 'paid' || status === 'scheduled' || status === 'authorized' || status === 'partially refunded' || status === 'pending') {
            className = 'order-history-status-processing'
        }

        newOrderList += `
            <li class="order-history-list-item">
                 <div>Order No. ${order.OrderNumber ? order.OrderNumber : order.json_obj.name}</div>
                 <div>Total: £${order.OrderGross ? order.OrderGross : order.json_obj.total_price}</div>
                 <div><div class="order-history-status">Status: <div class="${className}">${order.order_status ? order.order_status === 'fulfilled' ? 'Despatched' : order.order_status === 'unfulfilled' ? 'Preparing Order' : order.order_status : 'Archive'}</div></div> <button onclick="showOrderDetails(${index})">View Order</button></div>
            </li>
        `
    })
 
    orderList.innerHTML = newOrderList
}

const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const showOrderDetails = index => {
    const orderDetails = document.getElementById('order-content-details')
    let order = orders[index]
    if(!order.OrderDate) return
    const orderDate = new Date(order.OrderDate)

    orderDetails.innerHTML = `
        <span>Order Number: ${order.OrderNumber ? order.OrderNumber : order.json_obj.name}</span>
        <span>Order Date: ${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}</span>
        <span>Status: ${order.order_status ? capitalizeFirstLetter(order.order_status) : 'Archive'}</span>
        <span>Product Cost: £${order.ItemGross ? order.ItemGross : order.json_obj.total_line_items_price}</span>
        <span>Total: £${order.OrderGross ? order.OrderGross : order.json_obj.total_price}</span>
        ${order?.json_obj?.total_tax ? '<span>Contains VAT of:£' + order.json_obj.total_tax + '</span>' : ''}
        ${(order.order_status && order.order_status.toLowerCase() === 'archive') ? `
    <div class="order-archived-message" style="color:red; margin-top:10px;">
       <p>This order has been archived. Please note that some products in this order may no longer be available. 
        If you require more details, please contact customer service</p>
    </div>
` : ''}
`   
    const orderItems = document.getElementById('order-container-grid')
    const items = order.order_lines ? order.order_lines : order.json_obj.line_items
    orderItems.innerHTML = generateOrderItems(items)
    
}

const showPreview = (pdf) => {
    document.body.classList.add('no-scroll') 
    const previewModal = document.getElementById('order-preview')
    previewModal.style.display = 'flex'

    previewModal.innerHTML = `
        <div class="order-preview-modal"> 
            <object data="${pdf}" type="application/pdf" width="100%" height="500px">
                <p>Unable to display PDF file. <a href="${pdf}">Download</a> instead.</p>
            </object>
        </div>
    `
}

const closePreview = () => {
    document.body.classList.remove('no-scroll')
    const previewModal = document.getElementById('order-preview')

    previewModal.style.display = 'none'
}

const generateOrderItems = items => {
    return items
        .map(
            item => {
                const _shipping_name = item?.properties?.filter(item =>  item.name === '_shipping_name')
                const _shipping_address = item?.properties?.filter(item => item.name === '_shipping_address')
                const _shipping_address_parsed = _shipping_address && _shipping_address[0] ? JSON.parse(_shipping_address[0]?.value) : null
                const productionPDF = item?.properties?.filter( item => item.name === '_production_pdf' )

                return `
                    <div class="order-item-grid">
                        <div class="order-item-grid-top">
                            <div class="order-item-grid-left">
                                ${item.image_json ? getImage(item.image_json) : getPlaceholderImage()}
                            </div>
                            <div class="order-item-grid-right">
                                ${item.title ? '<b> ' + item.title + '</b><br>' : ''}
                                ${item.ProductCode ? '<b>SKU: ' + item.ProductCode + '</b><br>' : '<b>SKU: ' + item.sku + '</b><br>'}
                                ${item.variant_title ? '<b> ' + item.variant_title + '</b><br><br>' : ''}
                                ${_shipping_address_parsed && _shipping_address_parsed.addressType === 'Indirect' ? '<b>Delivery: BTM </b><br>' : ''}
                                ${_shipping_address_parsed && _shipping_address_parsed.addressType !== 'Indirect' ? '<b>Delivery: Directly </b><br>' : ''}
                                ${_shipping_address_parsed ? '<b>Delivering to</b><br>' : ''}
                                ${_shipping_address_parsed ? _shipping_address_parsed.firstName + ' ' + _shipping_address_parsed.firstName + '<br>' : ''}
                                ${_shipping_address_parsed?.address1?.length > 0 ? _shipping_address_parsed.address1 + '<br>' : ''}
                                ${_shipping_address_parsed?.address2?.length > 0 ? _shipping_address_parsed.address2 + '<br>' : ''}
                                ${_shipping_address_parsed?.city?.length > 0 ? _shipping_address_parsed.city + '<br>' : ''}
                                ${_shipping_address_parsed?.country?.length > 0 ? _shipping_address_parsed.country + '<br>' : ''}
                                ${_shipping_address_parsed?.zip?.length > 0 ? _shipping_address_parsed.zip + '<br>' : ''}
                                ${_shipping_name && _shipping_name[0]?.value ? '<b>Postage Type</b><br>' : ''}
                                ${_shipping_name && _shipping_name[0]?.value ? _shipping_name[0].value + '<br>' : ''}
                            </div>
                        </div>
                        <div class="order-item-grid-bottom">
                            <div class="order-item-footer-left">
                                <div class="order-item-price">Price: £${item.ItemGross ? item.ItemGross : item.price}</div>
                            </div>
                            <div class="order-item-footer-center">
                                ${productionPDF?.length > 0 ? 
                                    '<a class="order-item-preview" onClick="showPreview(\''+ productionPDF[0]?.value + '\')">Preview Card</a>'
                                        : 
                                    ''}
                            </div>
                            <div class="order-item-footer-right">
                                <a href="/pages/contact" class="order-contact-support">Contact Support</a>
                            </div>
                        </div>
                    </div>`  
            }
        )
        .join('')
}

const getPlaceholderImage = () => {
   return `<img src="data:image/webp;base64,UklGRkYhAABXRUJQVlA4IDohAABQUAGdASogAyADPpFIo0slpKOhorGpYLASCWlu7ry/uxgsDXdGyT/xGP/lX9v/3/q7+ffx/lnrJLo9qn8x/Tug/sZ/aPEF/JPMKe7OBfcvOnwW/mfUA4PSgR5Sf/h+/Xpj/c//H7IfSSFb5YiNdb/ODJecGS84Ml5wZLzgyXnBkvODJecGS84Ml5wZLzgyXnBkvODJecGS84Ml5wZLzgyXnBkvODJecGS84Ml5wZLzgyXnBkvODJecGS4IgfDm90HMMJnUjJxzrk6sq5XSXnBkvODJecGS84Ml5wZLza0Bbyo96MbyjllUHKo2km3Aux9yCEi88I/Rap0iNdb/ODJecGS84Ml5wZLzbbLa3PUBHPl63+cGC/20dJy/V4a+S5F8lyL5LkXyXIs4RNH1XuMqJby7O2rOHiNd9pQyXk1xd2og6N+GEzpH+g9D8Hga66Ndb/ODI5QPkkRf/hAjalky4gngZyDlUAt51EoTcEuRfHiPNL8T7Xxy1hhM6kKySNmUeVLGoR0bu+cGS84Ml5wYR73gxgbS5/gp5osq8L/ODJecGS84ObF7FA54v2wpwq+1PwXsDn+ZQKp6L/ODJecGFZATMOqeni+Z8GS84Ml5wZLzgwYE+iJ6yrYmM0Y7VlczvHZPVNkuCl1v84Ml5wYTWkRrH8HRrrf5wZLzgyXnBkdTeyfVLTw7ynu5S5XdBprkJKozVpwTERrrf5wOQpga66NdZMYn/9PDylfl89GiY381+8eqWUcZGuuasFW1+UUkxxF4KVyL5LkXyVmY0ExEa6w1XdSih/GXCSf/Xj/9DFqQcI3JCXB5JIj8D7HwesDiTs+OyliSPS4WlC+S5F8lyL2tyIGut/kGIX7kP0cmv+Pv7uQ9B9lUXG7zgj0KK/3bGCK9KL/OByFMDXXRrrf5wOQpga66K2GrZhvRmhnZtMRGuRRw2wGqzBOcYnHHga6zi8FK5F8lyL5KzMaCYiNQ1LInJCYYVgkOKCYiNcj4QTpx0+X6Z4Ml5NfbxGut/nBkvJr7eI11vAGPC1AFuZF8lyLSIaYVTm/pwZLya+3iNdb/ODJeTX28Rrrd+HvCSKjXXRrrEKLElT4xcGS5AlpIjXW/zgyXIEtJEa6xMwutZtdb/ODDdh+S82+5EDXW/zgyXm33Iga6372MWMLrjnL8sRGusNSmXlcgyVpXItX9vEa63+cGS8mvt4jXW7I08LpUMty7SGS84FZYN4spf12MzSVyL2tyIGut/nBkvNvuRA11v4i6ywWMfoE6vo2kRrlEEKpYeF2R1siNdbxa+bro11v84MkLXzddGur/Jekl+wpvqEzUNLv3ddFbDR05gYkkK4NTyJHga6zi8FK5F8lyL5KzMaCYiNdoeX2+0lpvercmE+V0ARaEKGf/BCC3e8SiQeEFtsJOStNchGut/k19vEa63+cGS8mvt4jXP6Ovf7xJDIFckTk8li8rruPd/Zwfxc4jfjDw5Kz/xmLz7V/XntdPfLI2d0pybcMN/N/nA5CmBrro11v84HIUwNdGdmPxHIbtSX0RfZbOrKOQoyYZIwVF3wT0FGbKkSNAZXawfaA03/ZG1+YorUSBCjw78smrip57HNIuI9cpeWIb6X6uRfJci+S4CshpNybbK+WaUGLAkw/sMM6NT8ClDRMr6NpbXJZu4D94abfr8qKNkEVkBg1ZoTFQx085BYu3c+0ZeReXYHuemqnDaMpUuvaKgJf6Tsy0VvApV54MJ9RXktFF4+OWvm1aPnHKhkeWEGuTq89TQJiI11v84MFRpjwjr44fOOCOKORfJ6aD6dLzW/zgyXBBql9XYIbA6wi/M+DJecGS3xs+IxSUOe6WEttDvu3lUq5OQcqjaSbeXZ2/DCZ1Iycg5VG0kwSEHT4TTTL8nqn9mavW4ddGut/nBkvNp7vAgiqOxRom0k28uzt+GEzqRk5ByqNpJt5dnb8J6iMkyMLXzIEpF8lyL5LkXyXLLzXRrrf5wZLzgyXnBkzzSuRfJci+S5F7LPYU7WYSxsItZ0VcKJRYkxDNE+KleAvDyNdGut/nBkvODJecGS84Ml5wOPe8clpyevm+P79HeSQbqcoH7fOsI4waSjepLMd6Bhxzxu0J6nRo/XDYY38q5cVnqKhWMDKuNWSHZtN8kTFQsmsUe+A/Yns5ChKzxUqHxVGFyDMU0d2MptBMRGut/nBkvJrKZUvkgmyY92ZjJRvKskZxjm81MLiWAABIXZRMWxybO/oEJ8rF9DKxwHwr7kjZGgoRD0BBx+KoV3Z+B+3ZGalo7SqNLTUU9sFUiHYPc5IDpwsHlHzYRnfPXw3yQ3OJMuIHixkvODJecGS84HH0nKdfrFK5gSqWLK+e8y5QNE3FOrCV1mYTguC6nQQQmC8Bvd8lz3sKFRD1irOSt797seGUcrIWetil2uN2Pd/nVeU/LbtZ3bOujXW/zgyXnBhGB+a1AuRhXn0Q6DXX9QeMLAODyvP3NEuHzd/wcGUUS4GVn2tpeJcfotQuysjp/XtqYODzeziTJpwDvMtGemiXuGI96DOG9X2krsZ4r38PGSmUNnIR+QoZ/1Un0L4P0aXYBHJFBQ5U5OObIGhqkNawGp9b/ODJecGS84MuJ9AdbZZCuXan56ak/wffufRP2ABJDQSx6n/MRgnyXIvkuRfJci+S5F8lyL5LkXyXItByaLyIXO+rRgZ8GS84Ml5wZLzgyXnBkvODJecGS84MmeaVyL5LkXyXIvkuRfJci+S5BonYF+zr7XcGSbJmudC8lUrF/HLBiUscT22k/CvJiI11v84Ml5wZLhG6P7J/XsddChLuvKFyAymIk4gjx3j/Mit5QsU9C0aJeRmM8c6irB7S9R0W8E2yUS3G81WpgGYDm9cnFcR3MugWKP/+6ZAt/v9jvIsFriBJcX3IvkuRfJci+SrbTF+r4IWQPwGW/dQwes5XbOe53m3tmSAOgVm7lZt3lXhD1cMrUAHkFsfE0z2qunuYXMEf1PDVeQnj2CJrD4VPKy/3MdNLKmTN+GD70DoTWpqHNs2b1ou5/3SJxaWiEHwdJkxbHJuCXIvkuRfJciyhO/Nz/r5FuwRQMbR7gAf1Hj6588HQjkrkUVi/njofg2/7lhsi5AXYEkDbiVxrSZgRBcW//fmt1wFFCDVZ2AfzvqaENMvFRrDMLmLcXSH/gtI7rlDo11v84Ml5wZHKCyTEWbHUl0Bei27t6OgDQhepK9g23sCnK0G2oXV3812kFcccs5IzpW3z6MmmKOXwCgEafxyBCSweSwj3ipMObVJJLabEU9xJN4u/IXS26lwD3wwPPheEtZeYeXnBkvODJecGR84nDoV419WRa7bot/9hQ5XTXdCSbuM/H27loaUoE2cQcl5CuC0P37ICTIMCNEvr1jt/QDVpgL4pW25//9s4VTi3on1LIoMPln4ACYiNdb/ODJecGS+LK5F9Bt4KjRJgE8ucrkXyXIvkuRfJci+S5F8lyL5LkXyXIvkuRfJci+S5F8lyL5LkXyXIvkuRfJci+S5F8lyL5LkXyXIvkuRfJci+S5F8lyL5LkXyXIvkuRfJci+S5F8lyL5LkXyXIvkuRfJci+S5F8lvwAD+/uVAAAAAAC2li7xC0O1/UPeD5CBq+nFCJz1lvucgNfuLBa/33L1EwMrddAMigkY5Q+ilsPoFLJK25dy6z17mnaTIsDcLHZdrFGyIMwR/S7EdyHVRy0bCZWj74kRDxKEvOPrEcg54KA297PUsxQGetLOWki7mW+LaRg7Wt25vaFiIs9GN6isT95HPnzDql95tgNG76zeZxBEGiUStcSGR5AYuAxDAAOJMooZGb5JzLjbwCH7hPWABgYBe5NYQTVYglQxvlymf3qJQ2xToI30bimTTQUfUcFSIUp3eVBgWod4UtnMDjrijmkNPBHNjKSJU2lDvEchSyTbRaz1F1x+Laa2e5MF6Z/5M/Fe6y9wD0Jrmg/gHjHoFOWbcNejhwXjR1vAkWxDYSifXaNH3MsTaPdXAhWT2TtrTE4kZrRP4fEsTYdwbd3/XLDQAaCNkWFYqaUnQeqlcAa+QwoQGnTySI6/zZmDGq0OFpWtxgKZVStLdV926d8+NmFdXUq4RZ+vka2EBz/KoYqNTurodUCLFFf34sY9Fnyz9QJeRugE7ovP5orjIZ90jfgkUUI/cJBdqpkcrJ1u6NeUXqgMcSCfwyJWiqohULgL0SZGsSGXEL1sKX4+Q9Ykue/X8Uob5pTMLbSVC7n+jQa019RFkVr24EcYk9hiy/QY5gvS/qwIO3u6UQ4RNdtp7zMhEzSI/q/GFecnQRMJDWdliiziDXR9sfNVJsNZslYODzDvx8/61qd+jGsoQPbv3137gLgNbE2m4DoBNqmprd1KIump47ym1v0zovxeDPdGFpf7SA/zsw5Zlvr/BPhoecDwZB9QzdO76bKdGfpazI8z/muf0uXOfo4oWwbnPT/fegz3d1IFl+lb3TpE6LP1ZAxxZZtIiCEyFQaTDiw1MtJa42AJlwEDhBhFBfXuuypRfe2JC9Qpcv9prZ0TdAMbPzk+iHHwXO2/mckUF6chBLL3qPwCWCdJ+sbiR5kZmhLSkjkPJIGIjpR66btxdeknVKKBEHtnvJqSt2+DibUh7REHWmhrTJ3745HlirH9EYTrM6EB62WOXtQApMw+h61LhRUmyib804u02m+EnjPSkuXK4k+S5SZ+BISaf3ik0H30cY3sp/snKHMDw5hmhIkOXEDpQ4ZnnWv+otZIQJ9VERGAqxc1J93VJzhKfAwyc8u6l/02mFaBW92kJxSaS2Jj7n2yOf8Hicqu+YeNPjHihWaiCOv54FCSpbW3Zax1yERggSo+4eNOBcB3+NY+CDAjaWyaTg7+TDv+CWWss+Xkagqkw7qeHnm2YQh7sTFljlPaY6vOE0MuAMl0nsb1A5xgeNTBAxgFFCJjxEsDe0wu3l//+hiysxycgAAg4xW/9GA2fw6PFzAEjGmtsTjmc6nWtjAUNoPG5hYLqkknNtaogUAObjwXJVZ2xzfzI+Mt+0j31JUcVSOe2JmhaHLV9T1ET8wiOQts0jTXiiogozrlffCLQQANA1BYnpjsZGs28kFpIzAySR3mLJByja/X/hv2FclEdU24CHvqIt4hI2HpuyhyMDfBRp6rJprY1M9EZoPMeLleEVnw77tl7q3/PBGiWaYip9smkbSKJ89b5lESSk/TLqfGhC+Dy+/KAatF7cH5zGUZx8JrLHFXLa4bBUyYA0hDZkOA4X1QHDOaxQw1McGV6/V/vlsQ0/3C2CRQLAeOfVS5bTgYxGoilkZ6BuM1ctUg+9qWycKJbxZO9Rf9zVzz6w9EJbjjyyjXiDqDk07pMbQJNtq3s1wK7ILKrT2dPcdNZof64BDJyElWY8LpTqTr3eFImdls5+2cDvF2oSC+L1yWC0mgkot3mtdOQF4P+QIBkUrkadBGVSoKWgQZupVs7t/khBcdABv5pXV+7W2PDlWGxbMPCj64Ie6HQ/gMIudpqJ3lRsd12BeeWeG4DFGtcvkBo4XJeGohOSgsQligxQWip+vD/kTvIH8Hcuai4Nh1+sjh9LtxRAqQW06AFbkCYZB4ekopc4oq0Wi6qB07+kRzgb4lT7ZJffyGs86stJMhEwjKv4ngzLBhEcKlYGB0+oaWOiu56GGyaLAFPDHbELQpWqKc1oZN0kaCVqioEYuC3W5s0KYRnSr59XGdiy61lH8gixzqwWAYII1mo167cUByLwTv5o2YA6gznd6g/mbA90eqvd5kf93HAf6xv2FeX6A/b8O+4AKE/Eac0kFOmKwFgcFHegKtLDT3cUTvxPqVAiCp+cl7NxyoSxBsStKByzP6s3IZls37MkkhEfvYzcdnub3hgOFLISA94jsqf4+jlkDS6fLn15sBtZ0rHBgqAFZe4P//bhxQ/QjT+Uo+qA9Uzm2vaQiare9AqNGExKnQwypgnqdeVMEi5QQU/mQYbgdYjmZQ+I9KeqFoOUKTGuMzIfVSq+sC6Z5bPNNy8D+pP7Fn02NBB5CTAFmopgP9NMak4wRy9qsCLBdxXn3Bz+j789+FmX5Mzlw9WqvNWmXfVBt36P+BpiuWUp9Iax8+T9cLc+6DSVK5ZjyyX2GM+hWTdFjTg8O8+sugwHf/4aSNa3ukb7R/NmHITD0NQN0/pSAwOfItWgpAEM+QZZe+fnEVydV+vXsc45m5rL/xqCfCMQBra6ZdVAhvoWmu7Vg7j1TozKpGfhAvOsW8uV+Eqw7rvVN0LCswjtaOCQ602c0Hoi1HHtd0ZgoiSePAn757CO/vHyAY7aL3swc0uAOP6KN3YCb/ik1oSGi6xLYQfvXCsnNDfrpUzDDhcBh6/3LfcojSZek8Sk24zCiezk+J5AijbfPf64x3dudMf4R2Bnmj0FNQVRhcNbA9sjbmQ8W62G0Bk4v3k5QsxgDak5WbcIarRaBWwIhR8LEZFqeEZXaRsOtg3YIGM1i0Wws8VV9FBP/oMvr1ejrevSSc4M95fix+GCQBi+aR7zyJTwllDVukDkg2j7Xdsdl+flvpZo4eSOIe0vhiWMQZ13DpGsjABo3N2CCK8WBX8vwDdTA+A0H442DCJutx4N3PtaCESlOCr6KWTMG40xEgG6MZ+qZP0wAxCHZhjigCifhuBOqcXC83Bx836oCSdO887YzhlbbnwNteaKfSglUPK/GmX3uWxyxssgL8mUQWxmPI6EDIDhY6kCc5RNfh7CwW+7TZ/nw0hnTwcLFbz1H3SOenaqRcNRfckAzhTF5Q0t0lAIAT+1CrRX2OZHkW2f4ZkA8XG7pmsR2npW/WOIX1AkWmy/51MLf1MaDvgTa6NUMxdRho+xgu5VdqzoeofxLDLibWSTxiVLaVxdEzj6HR8xWYrStSr4TGpIJooSIqn1pHH8VTHOw5yRix7hHhMf6ym7pAbgwaHqRWQjVLH05hFi1Pz9e1WZl+aHa4ILhw1UT30+azBdUo40H1sCJF+EVasbqUDsyeREuzSwKzVBoPgrfos1CKX1kf+dpWbRwMp7KRwqlw/A0qbyQyKF6QZdVXZ117t8HjqksU7v8AMkAATq0fVUuRfbPk73utC2YJWrpwskGU8pX6LY9KaONDemydFeY/e0Ncmn2rVaql8RRt7BFRyzHVL/MULUvpMW1qeU1WPCEE8fqyFUU8GGETRm+q79iwQeKDozmjWLZpYyw7IxQiS0nsHrgqqRlRzGFEqmi75DnuOro0qct0KHYpIoDwsy/r3gvRwhf9YHQZSRXenzC4X3qdGc+bNOY4G8j09s3PNKd8pymg/vlKwTJU9TCo5g192niMvClAbcY7d4MxX4zU6WOCAhyiVkrMd/klIQAAENCisBqVE84xGvclkfQ3JlHtu/3fqz4gxb+fRgjB1+yCHsdOmWZ1vrTseARqoXYEnG8a26d9C3fjhFGscp1oIUBOglc6sCHRDeNwm+rWK4GLCP8Epl1SbeQZBZtglXFIHNibB9yFXICEQRhrFJVZNwQU81369mafUfBhjQYugwTDovzveAdIvPzxbY2doUiZ8ht7OWTIJBC2NqatXVIbtrerCRirKoYRfsDbez5DETkcRu0FapE84ktbdBg9vZP9LHj+dtCKQklrrwt0LElkk5iOUOSYSS7m8n3SEIKePKZn6i1bPVEAQQlK3uAFTOn+s6/Gfsr+fKJdlJvsLGv2XkFHMy7y+qMiW5ZkjKVR0yT09K7e8+8flMJW8HhHYgKAs2S20/B1yjDqP6ZVLzPAmvT+msTrl3ychfG0BrpqO/vtfE4zeiAbI5qJTwLcomfIbZ2PkCmYmRLBs13QYHZ0woqkjAnDnXgXgT3sUai+hNJuUYVTvDJ/vzxd5te/Xz4Czi7uZaOhQ3XgLPQ2fUWs/w4JLUyaGZjsfjhCHUEx6yO9zmhwbSik39bjKc6Ax/JErWvomoNYAEzn7li9vQaybenoQk5oiNi+TqAp1jMZHVcpFVWna9TtFtSIWmBm9mWArn3KOBmv94cKUyLk0e9DpUziDajOW3J7OhJ3rIAW705Ms3EMp+Mg2x/bwN1FlihlyaEq3ZDevxY/LUcFotq0xYcwNvCGHVtMckunDVeQkOlAA9hzH6jV/pfo1DlKKx0boiYegHHHo41vuhU/I6+83lYciNfQjs1Pi+RQU//+XW+TiL4d9dGWmgG3r6zqmLWXGdXZW1r8rCCDnfJ3zrGEi9Ov5rcoQDuFcM1t+VCR4cTilbekP5EfRcVEP1CVQ7fqiF1/AFPH5Q1JpahOLLD6HwvyjeNLsEy+0V2np/ZFGSha3FczVRsW/wWu8TgSzrUygm2P7d28Pw68XnmB21Ql4jvn6ph6TXnt57XICH3VZpZT5pptRbemJvwv+fc59ZR39gvwOo+9ICjbhlBjqPEaITiUpM0B9OODPn6CBmBnKITKG3s/MD9c/k0Z/11ByO3Rc9YAzP+nrhrqSlwFibHnsQCO2o9372ZSrvZjl3ADaW21Z+MI8ApS+RR5FkqzbmVDFg7IWj1VTfVczSsYZsZ3qajO1tUqxoTK1O6vew0oqFGkbYWcmRLgLatmSpJbVB0f0mv2y6GuqVkRPtmP/5ArgFsIIYtBQydZGgJ/K3QkogBivGEJiMjujwb6Mv6DcEAsoQU8OyGd1T4XnVlQJxdeNvAbNqbeDjhYdjjjIoPxwTQVmxhDp7Nlz8h/NCILsJWDX15AscPCOlAc5wZsv2cx7Vl+JRy7NLArMKLchIPaN//Uf2MW8NM8p56KfIX/HTSrFnPSdNyB6PyCD0o8IlwqP83efI/O+U+HDoKgB1bptE+zqi745IBFZXswZrHxyejryvkviSHGK9x+7WM6ImcMxXUpgpNcJ7VUNUpqx/+BmxHLnB22/RjkS1V2YPFwgVdyR76iJtoRQHTxCcGNeP3Ckvze7FWBBv6vc32vinmm0UB0pVDvh5GIfswDCL/nSMD92Bl/P7WlnOZrtxe8RVgJnjoUtVGMadJ9e1OJ9/22Bp1Av3sV/KcLXCGLVfpEnT62E0K3llfEp8zEPbiClXI7Z8VL3g3z0KXMF1yHnSK6D2omIhfypjlyxTLDiQ+LU6+kkY5wEoyP2uOrfe+RZlaJNSWEoS/G6XVHSuOq3OTajokUTG+3fhSDB3HUbioITvirKMAAABE0qjzt7Cqk6giQ0EhT50hQlgnUSjQmLhLzkCIaQVSE4AvRNrMo1loLo6YKZQVedtPkFzEjW9xm7ou3WsVf8ScAECO5w8pHcD6sJv5DLPePoahv/KqV41swAAVxHwX50XagW7/WygVCY1/zBORejmSS1iUQg0VBwzPU6fgkx4DiWsB+kMA0HY/CGVSw1sGwIfKm7pH8E0dJZu9e13kEA2chvh2tW3E8+xnjhfhImT9E1groOqZ9KR8s9mB+AtWG9UKpEyp0wbYUaV0JkhJ3JyXe3exeeVKc1I4FqHUscjq15gVjOgkiQy8jNeEoi3UCSs7NuDM8ih0ME0KnokWQi1zKNH4YcLsFgnntXZT/EF2J/871bJhacW3Yj8f9NW3/5h5LI3vF/Z8BO4xKD/1kj4Hw8lMjYnFnL5a6jtrHxYsYitUPTW4NKhVhLdEeRM08TCF1jgaOzxI7nv8GhdlA624PHnFk2qEtyq/1m2FVZE7ceHIBqxA3PeuEe9xDvHAmuYVbQo1Z1kfI3/HEyDka63SO5GJZSO4i00lUCpzYuRWBdi9iTfvvisLVmtzcz5adzrFAUxX7zxgocQrub9kc8hfvfGYx7+7kSzyt3OpOVOku8dtzOYF6722h0h6a2+fTjadJwSz3DyKPh+CAJ7TJWPkMhESv+9fHjkdw8DENzLVgD2HVp2wi5BFwtBSkfPGm6E2hgCSYvgiuS2anJagaiMGHPDruZXhZCpE47KJaSxEnYwNtOK7QMTNUA8G7QWlhgsWj5G7RN15i/IgCzkTSc4EUoKUrCmSW2g6hlR1OLyOaGPw0kKL8lqcYmNvLY/pm1Iaon3ZVrbUckcf8pykT+SxbGnr2YwQBfuwnEA0rWbjJbmTKDEBZFKlG320tWS7+l/Ev6Bacjk1mKw/fCcRawERGYsHvRemIRC0auPyJRA3qZywSfPzRcZ/N5JnFPTMjH8P0EacwckstwUkdm76iM32yO+q7/tv8ffmlkcFiVvqvK0BJxt7bpyUnGJUaTcFdB+vHS5rTru1at43ZsMt1BWj+oaDq3sBMh21S/9+BitXRw4iDrXgXgT3zca24myWBmvmlr/l7e571QVohIFHKTi5GFyUNkqTYCpdb/mkNrBVT4ylYi0r+nbIL3ShS8V5r/jtW9CHpZ6AnFRMR+LLHWzMk53t+hdKSsESlr4GoINDWruATPASZWog0t5yd0C71C/W3KJkxBP+16Nd8wueBRXhuMVscUu9sMF0cMrEGBYlZU9LYYpLZFC/uqNhNgo693L5pFGPhfuQTb48D4ZanmVgNyj0L/wsKhXIIw8bNBPqCyOePUD7eY3SZL2/yR2jKyKKOq8LP5v1lYlvcRQSI8EQVbjkRMbdLWhoc8s8SMD6JyPUi6FxHqjvHx8v75nNSKltqETgiKEqeGSAotb3fh50K4ftPb/rbnMPZBdgskVzQucIeofk8PdWR43s9vKJfGO8yOpQnrbWK34cgxPjmMeaejhxEoI3Ig5ZqUlUninYjDcgCMMgij8Ty9mKz7DALxlIJXOl+G/XWuMO2A7DiFc50cepOmNTJnfy4yqbkTYRFqkYMQzwva8JzXuaD7Rau5S3Ug1PMBdialQHgRSAbYpZesa9chQ431V3MT2cflQe66YFU5dJ0EPAUOeheJ8K82uPOHR/D7JMEIVTXmnomPUo2Mr3T6ca3sqIfiEexi1NBXh0DOR+VVh2pHPMf/6PibaPPTmnwCeKjfYVnvtz7S6mVLqO17KUoS3WjTUOTkxLJ0gcsBbbX6ktLQxlJOsBoyL3vHrqicDjoe2BOuYBXWwnUY04i/F/7tElg5apA/eFJPVEUZY9EsMcHX+A3XifirGfezYTLDQHNPKZYqfkq49BHID+9VqHfieosZw3kosXKROAQHZmEhuRWmkA3cB6BNl7VRjUuKQG6Omb3Drt6AZv/BVr5SStHYai6N09S38k49t+2kjp6h4kT3ahZOtY39a19yZrCnvU1AWpPYWiOYKzM4Bz69hySHfOcMAIX5+ZWXkixNwmAtgmPf1bkf7/BqswfJyHTQ/lYqy7GkNYDUjhfmKfC9TUykoLNU1AzfT5mZErHC+SFuYBKStzYB32oMw572Yt193tbRRSqQOaDZ+3yqTbdS00WWoaqRUWFYIu4OD2YDC+sJeADiSV8gAAAAAAAAAAAA" width="100%" height="auto" />`
}

const getImage = image => {
    // const imagearray = []
    // if (typeof image === 'string') {imagearray = JSON.parse(image)}
    // else {imagearray = image}
    return `<img class="order-view-image" src="${image[0].filename_webp_l}" alt="Favourite Hob Ring Birthday Card" decoding="async" width="100%" height="auto" >`
    // console.log(image)
}
 