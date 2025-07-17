const countryToCode=e=>{var t=new Map;return t.set("United Kingdom","GB"),t.set("United States","US"),t.set("Afghanistan","AF"),t.set("Albania","AL"),t.set("Algeria","DZ"),t.set("American Samoa","AS"),t.set("Andorra","AD"),t.set("Angola","AO"),t.set("Anguilla","AI"),t.set("Antarctica","AQ"),t.set("Antigua and Barbuda","AG"),t.set("Argentina","AR"),t.set("Armenia","AM"),t.set("Aruba","AW"),t.set("Australia","AU"),t.set("Austria","AT"),t.set("Azerbaijan","AZ"),t.set("Bahamas","BS"),t.set("Bahrain","BH"),t.set("Bangladesh","BD"),t.set("Barbados","BB"),t.set("Belarus","BY"),t.set("Belgium","BE"),t.set("Belize","BZ"),t.set("Benin","BJ"),t.set("Bermuda","BM"),t.set("Bhutan","BT"),t.set("Bolivia, Plurinational State Of","BO"),t.set("Bosnia and Herzegovina","BA"),t.set("Botswana","BW"),t.set("Bouvet Island","BV"),t.set("Brazil","BR"),t.set("British Indian Ocean Territory","IO"),t.set("Brunei Darussalam","BN"),t.set("Bulgaria","BG"),t.set("Burkina Faso","BF"),t.set("Burundi","BI"),t.set("Cambodia","KH"),t.set("Cameroon","CM"),t.set("Canada","CA"),t.set("Cape Verde","CV"),t.set("Cayman Islands","KY"),t.set("Central African Republic","CF"),t.set("Chad","TD"),t.set("Chile","CL"),t.set("China","CN"),t.set("Christmas Island","CX"),t.set("Cocos (Keeling) Islands","CC"),t.set("Colombia","CO"),t.set("Comoros","KM"),t.set("Congo","CG"),t.set("Congo, The Democratic Republic of The","CD"),t.set("Cook Islands","CK"),t.set("Costa Rica","CR"),t.set("Côte D&apos;Ivoire","CI"),t.set("Croatia","HR"),t.set("Cuba","CU"),t.set("Cyprus","CY"),t.set("Czech Republic","CZ"),t.set("Denmark","DK"),t.set("Djibouti","DJ"),t.set("Dominica","DM"),t.set("Dominican Republic","DO"),t.set("Ecuador","EC"),t.set("Egypt","EG"),t.set("El Salvador","SV"),t.set("Equatorial Guinea","GQ"),t.set("Eritrea","ER"),t.set("Estonia","EE"),t.set("Ethiopia","ET"),t.set("Falkland Islands (MALVINAS)","FK"),t.set("Faroe Islands","FO"),t.set("Fiji","FJ"),t.set("Finland","FI"),t.set("France","FR"),t.set("French Guiana","GF"),t.set("French Polynesia","PF"),t.set("French Southern Territories","TF"),t.set("Gabon","GA"),t.set("Gambia","GM"),t.set("Georgia","GE"),t.set("Germany","DE"),t.set("Ghana","GH"),t.set("Gibraltar","GI"),t.set("Greece","GR"),t.set("Greenland","GL"),t.set("Grenada","GD"),t.set("Guadeloupe","GP"),t.set("Guam","GU"),t.set("Guatemala","GT"),t.set("Guernsey","GG"),t.set("Guinea","GN"),t.set("Guinea-Bissau","GW"),t.set("Guyana","GY"),t.set("Haiti","HT"),t.set("Heard Island And McDonald Islands","HM"),t.set("Holy See (Vatican City State)","VA"),t.set("Honduras","HN"),t.set("Hong Kong","HK"),t.set("Hungary","HU"),t.set("Iceland","IS"),t.set("India","IN"),t.set("Indonesia","ID"),t.set("Iran, Islamic Republic Of","IR"),t.set("Iraq","IQ"),t.set("Ireland","IE"),t.set("Isle Of Man","IM"),t.set("Israel","IL"),t.set("Italy","IT"),t.set("Jamaica","JM"),t.set("Japan","JP"),t.set("Jersey","JE"),t.set("Jordan","JO"),t.set("Kazakhstan","KZ"),t.set("Kenya","KE"),t.set("Kiribati","KI"),t.set("Korea, Democratic People&apos;s Republic of","KP"),t.set("Korea, Republic of","KR"),t.set("Kuwait","KW"),t.set("Kyrgyzstan","KG"),t.set("Lao People&apos;s Democratic Republic","LA"),t.set("Latvia","LV"),t.set("Lebanon","LB"),t.set("Lesotho","LS"),t.set("Liberia","LR"),t.set("Libyan Arab Jamahiriya","LY"),t.set("Liechtenstein","LI"),t.set("Lithuania","LT"),t.set("Luxembourg","LU"),t.set("Macao","MO"),t.set("Macedonia, The Former Yugoslav Republic Of","MK"),t.set("Madagascar","MG"),t.set("Malawi","MW"),t.set("Malaysia","MY"),t.set("Maldives","MV"),t.set("Mali","ML"),t.set("Malta","MT"),t.set("Marshall Islands","MH"),t.set("Martinique","MQ"),t.set("Mauritania","MR"),t.set("Mauritius","MU"),t.set("Mayotte","YT"),t.set("Mexico","MX"),t.set("Micronesia, Federated States of","FM"),t.set("Moldova, Republic of","MD"),t.set("Monaco","MC"),t.set("Mongolia","MN"),t.set("Montenegro","ME"),t.set("Montserrat","MS"),t.set("Morocco","MA"),t.set("Mozambique","MZ"),t.set("Myanmar","MM"),t.set("Namibia","NA"),t.set("Nauru","NR"),t.set("Nepal","NP"),t.set("Netherlands","NL"),t.set("Netherlands Antilles","AN"),t.set("New Caledonia","NC"),t.set("New Zealand","NZ"),t.set("Nicaragua","NI"),t.set("Niger","NE"),t.set("Nigeria","NG"),t.set("Niue","NU"),t.set("Norfolk Island","NF"),t.set("Northern Mariana Islands","MP"),t.set("Norway","NO"),t.set("Oman","OM"),t.set("Pakistan","PK"),t.set("Palau","PW"),t.set("Palestinian Territory, Occupied","PS"),t.set("Panama","PA"),t.set("Papua New Guinea","PG"),t.set("Paraguay","PY"),t.set("Peru","PE"),t.set("Philippines","PH"),t.set("Pitcairn","PN"),t.set("Poland","PL"),t.set("Portugal","PT"),t.set("Puerto Rico","PR"),t.set("Qatar","QA"),t.set("Réunion","RE"),t.set("Romania","RO"),t.set("Russian Federation","RU"),t.set("Rwanda","RW"),t.set("Saint Barthélemy","BL"),t.set("Saint Helena","SH"),t.set("Saint Kitts and Nevis","KN"),t.set("Saint Lucia","LC"),t.set("Saint Martin","MF"),t.set("Saint Pierre And Miquelon","PM"),t.set("Saint Vincent and the Grenadines","VC"),t.set("Samoa","WS"),t.set("San Marino","SM"),t.set("Sao Tome and Principe","ST"),t.set("Saudi Arabia","SA"),t.set("Senegal","SN"),t.set("Serbia","RS"),t.set("Seychelles","SC"),t.set("Sierra Leone","SL"),t.set("Singapore","SG"),t.set("Slovakia","SK"),t.set("Slovenia","SI"),t.set("Solomon Islands","SB"),t.set("Somalia","SO"),t.set("South Africa","ZA"),t.set("South Georgia And The South Sandwich Islands","GS"),t.set("Spain","ES"),t.set("Sri Lanka","LK"),t.set("Sudan","SD"),t.set("Suriname","SR"),t.set("Svalbard And Jan Mayen","SJ"),t.set("Swaziland","SZ"),t.set("Sweden","SE"),t.set("Switzerland","CH"),t.set("Syrian Arab Republic","SY"),t.set("Taiwan, Province Of China","TW"),t.set("Tajikistan","TJ"),t.set("Tanzania, United Republic Of","TZ"),t.set("Thailand","TH"),t.set("Timor-Leste","TL"),t.set("Togo","TG"),t.set("Tokelau","TK"),t.set("Tonga","TO"),t.set("Trinidad and Tobago","TT"),t.set("Tunisia","TN"),t.set("Turkey","TR"),t.set("Turkmenistan","TM"),t.set("Turks and Caicos Islands","TC"),t.set("Tuvalu","TV"),t.set("Uganda","UG"),t.set("Ukraine","UA"),t.set("United Arab Emirates","AE"),t.set("United States Minor Outlying Islands","UM"),t.set("Uruguay","UY"),t.set("Uzbekistan","UZ"),t.set("Vanuatu","VU"),t.set("Venezuela, Bolivarian Republic Of","VE"),t.set("Vietnam","VN"),t.set("Virgin Islands, British","VG"),t.set("Virgin Islands, U.S.","VI"),t.set("Wallis and Futuna","WF"),t.set("Western Sahara","EH"),t.set("Yemen","YE"),t.set("Zambia","ZM"),t.set("Zimbabwe","ZW"),t.get(e)||"GB"};function addFavourite(e,a){var t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({shoppify_product_id:a})};e.children[0].classList.add("loading"),e.children[1].children[1].style.fill="#cbd81d",e.children[1].children[1].style.stroke="#cbd81d",fetch("/apps/scribblerApi/v1/shoppify/private/favourite",t).then(e=>e.json()).then(e=>{var t=JSON.parse(localStorage.getItem("favorites")||"[]");t.includes(a)||t.push(a),localStorage.setItem("favorites",JSON.stringify(t)),window.eventBus.publish("FAVOURITES_ITEM",e)}).catch(e=>{console.error(e)}).finally(()=>{e.children[0].classList.remove("loading"),e.setAttribute("favourite","true"),e.setAttribute("onclick","removeFavourite(this,"+a+")")})}function removeFavourite(e,t){var a={method:"DELETE",headers:{"Content-Type":"application/json",Accept:"application/json"}};e.children[0].classList.add("loading"),e.children[1].children[1].style.stroke="#6e6d6d",e.children[1].children[1].style.fill="none",fetch("/apps/scribblerApi/v1/shoppify/private/favourite/"+t,a).then(e=>e.json()).then(e=>{window.eventBus.publish("FAVOURITES_ITEM",e),loadFavourites()}).catch(e=>{console.error(e)}).finally(()=>{e.setAttribute("favourite","false"),e.children[0].classList.remove("loading"),e.setAttribute("onclick","addFavourite(this,"+t+")")})}async function addExpirationDates(e,t){var a;0<e?.length&&0<e[0]?.delivery_options?.length&&(a=new Date(e[0].delivery_options[0].deliverTo),t.append("properties[_shipping_id]",e[0].delivery_options[0].delivery_id),t.append("properties[_shipping_name]",e[0].delivery_options[0].delivery_name),e[0].delivery_options[0].deliverFrom!==e[0].delivery_options[0].deliverTo&&(e=new Date(e[0].delivery_options[0].deliverFrom),t.append("properties[Delivery from]",("0"+e.getDate()).slice(-2)+"/"+("0"+(e.getMonth()+1)).slice(-2)+"/"+e.getFullYear())),t.append("properties[Delivery to]",("0"+a.getDate()).slice(-2)+"/"+("0"+(a.getMonth()+1)).slice(-2)+"/"+a.getFullYear()))}async function addToBasket(s,e,i,r){s.children[0].classList.add("loading"),0<s.getElementsByClassName("cart-error").length&&(t=s.getElementsByClassName("cart-error"),s.removeChild(t[0]));var t=fetchConfig("javascript"),o=(t.headers["X-Requested-With"]="XMLHttpRequest",delete t.headers["Content-Type"],new FormData);o.append("id",e),o.append("sections",["cart-icon-bubble"]),o.append("sections_url",window.location.pathname),await addExpirationDates(await async function(){var a=document.querySelector('[name="default_shipping_address"]')?.value;if(0<a?.length){o.append("properties[_shipping_address]",a);a=JSON.parse(a);o.append("properties[Shipping address]",`${a.firstName} ${a.lastName}, ${a.address1}, ${a.address2?a.address2+",":""} ${a.city}, ${a.province?a.province+",":""} ${a.country}, ${a.zip}, ${a.phone?a.phone+",":""} `+a.addressType);let e=1,t=1;switch(i){case"Cards":e=1,t=r.includes("Standard")?1:2;break;case"Gifts":e=2;break;case"Alcohol":e=3;break;default:e=1}a=[{product_type:e,product_size:t,product_quantity:1,address:{line:`${a.address1}, ${a.address2?a.address2+",":""} `+a.city,postcode:a.zip,country:countryToCode(a.country)},attached_products:[]}];return(await fetch("/apps/scribblerApi/v1/delivery-options",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(a)})).json()}}(),o),t.body=o,fetch(""+routes.cart_add_url,t).then(e=>e.json()).then(e=>{var t,a;e.status?((t=document.createElement("div")).classList.add("cart-error"),a=document.createTextNode(e.description),t.appendChild(a),s.appendChild(t)):e.sections["cart-icon-bubble"]&&(console.log(e),document.getElementById("cart-icon-bubble").innerHTML=e.sections["cart-icon-bubble"].replace('class="shopify-section"',""),this.stickyHeader=document.querySelector("sticky-header"),this.stickyHeader.reveal(),document.getElementById("added-to-basket-info").classList.add("open"),setTimeout(()=>{document.getElementById("added-to-basket-info").classList.remove("open")},6e3))}).catch(e=>{console.error(e)}).finally(()=>{s.children[0].classList.remove("loading")})}function generateFavIconHTML(e,t){var a="",a=t.products[0].is_user_favorite?`<button type="button" name="Add to Favourites" favourite="true" onclick="removeFavourite(this,${t.products[0].id})" class="add-to-favourites-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#cbd81d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`:`<button type="button" name="Add to Favourites" favourite="false" onclick="addFavourite(this,${t.products[0].id})" class="add-to-favourites-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="33" viewBox="0 0 35 33" fill="#cbd81d" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`;return e?a:`<button type="button" aria-label="Add to Favourites" name="Add to Favourites" class="add-to-favourites-button" onclick="window.location='/account/login'">  
                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>`}function generateAddToCartHTML(e){return`<button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${e.products[0].variants[0].id}, '${e.products[0].product_type}', '${e.products[0].variants[0].title}')" class="add-to-basket-button">
                <div class="product-add-loader"></div>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.9" d="M17.9143 34.5332C27.2635 34.5332 34.8425 26.9542 34.8425 17.605C34.8425 8.25577 27.2635 0.676758 17.9143 0.676758C8.5651 0.676758 0.986084 8.25577 0.986084 17.605C0.986084 26.9542 8.5651 34.5332 17.9143 34.5332Z" fill="#E6E6E6"/>
                    <path d="M27.8029 11.7388C28.641 11.7388 29.2276 12.4092 29.1438 13.2472L26.9649 23.8064C26.7973 25.3987 25.7079 26.6557 24.367 26.6557H11.4614C10.1205 26.6557 9.03108 25.4825 8.86347 23.8064L6.68459 13.2472C6.60079 12.4092 7.27121 11.7388 8.02544 11.7388H27.8029Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M13.8916 11.2357C13.8916 7.71599 17.9141 7.88359 17.9141 7.88359C17.9141 7.88359 21.9367 7.71599 21.9367 11.2357" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.77393 16.5991H28.2219" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M8.86353 21.6274H26.965" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M13.9753 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                    <path d="M21.9368 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                </svg>
            </button>`}function convertGiftPriceAndFormatCurrency(e){return Intl.NumberFormat(window.Shopify.currency.countryCode,{style:"currency",currency:window.Shopify.currency.active}).format(e*window.Shopify.currency.rate)}function generatePrice(e){return e.products[0].variants[0].compare_at_price&&"0.00"!==e.products[0].variants[0].compare_at_price?`<div class="collection-gift-slider-price">
            <p class="compare-price">${convertGiftPriceAndFormatCurrency(e.products[0].variants[0].compare_at_price).replace(".00","")}</p>
            <p class="compare-actual-price">${convertGiftPriceAndFormatCurrency(e.products[0].variants[0].price).replace(".00","")}</p>
        </div>`:`<div class="collection-gift-slider-price">${convertGiftPriceAndFormatCurrency(e.products[0].variants[0].price).replace(".00","")}</div>`}function generateImage(e){return e.products[0].image.src?`<a href="/products/${e.products[0].handle}">
                    <img src="${e.products[0].image.src}${e.products[0].image.src.includes("shopify")?"&width=309":""}"
                        alt="${e.products[0].image.alt||e.products[0].title}"
                        width="309"
                        decoding="async"
                        height="430" />
                </a>`:`<a href="/products/${e.products[0].handle}"></a>`}function generateCardAction(e,t){return`<div class="card-actions">
                <div class="card-actions-favourites">${generateFavIconHTML(t.isLoggedIn,e)}</div>
                    <div class="card-actions-vendor-logo">
                        <a href="/collections/vendors?q=${encodeURIComponent(e.products[0].vendor)}">
                            <img src="${""!==e.products[0].vendor_image_path?e.products[0].vendor_image_path:t.default_vendor_logo}" alt="${e.products[0].vendor}" width="60" height="60" decoding="async" />
                        </a>
                    </div>
                <div class="card-actions-buy">${generateAddToCartHTML(e)}</div>
            </div>`}function generateGiftAction(e,t){return`<div class="gift-actions">
                <div class="gift-actions-favourites">${generateFavIconHTML(t.isLoggedIn,e)}</div>
                <div class="gift-actions-name">
                    <span style="display: -webkit-box; -webkit-box-orient: vertical; line-clamp: 2; -webkit-line-clamp: 2;">${e.products[0].title}</span>
                </div>
                ${"gift"===t.type?generatePrice(e):""}
                <button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${e.products[0].variants[0].id}, '${e.products[0].product_type}', '${e.products[0].variants[0].title}')" class="gift-actions-buy">
                    Add Gift
                    <div class="product-add-loader"></div>
                </button>
            </div>`}function createCardSlide(i,r){return new Promise(async(e,t)=>{var a=i.map(e=>{e=e.id;return"string"==typeof e&&e.startsWith("gid://")?e.split("/").pop():e});try{var s=a.map(e=>{return t=e,fetch("/apps/scribblerApi/v1/shoppify/public/products/"+t,{method:"GET",headers:{"Content-Type":"application/json",Accept:"application/json"}}).then(e=>{if(e.ok)return e.json();throw new Error("HTTP error! status: "+e.status)}).catch(e=>(console.error(`Error fetching data for product ID ${t}:`,e),null));var t});e((await Promise.all(s)).filter(e=>null!==e).map(e=>`<div class="collection-slider-item">
                        <div class="collection-slider-item-product">
                            ${generateImage(e)}
                            ${("card"===r.type?generateCardAction:generateGiftAction)(e,r)}
                        </div>
                    </div>`).join(""))}catch(e){console.error("Error fetching product data:",e),t(e)}})}async function getFilteredProducts(e){var t=`
        query {
            collections(first: 1, query: "title:${e.collection_title}") {
                edges {
                    node {
                        id
                        handle
                    }
                }
            }
        }
    `;try{var a=await fetch("/admin/api/2024-07/graphql.json",{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Access-Token":e.shopify_token,Accept:"application/json"},body:JSON.stringify({query:t})});if(!a.ok)throw new Error("HTTP status "+a.status);var s=(await a.json()).data.collections.edges[0].node.id,i=("manual"==e.sort_order?e.sort_order="MANUAL":"best-selling"==e.sort_order?e.sort_order="BEST_SELLING":"created-descending"==e.sort_order?e.sort_order="CREATED reverse: true":"random"==e.sort_order?e.sort_order="MANUAL":"price-descending"==e.sort_order?e.sort_order="PRICE reverse: true":"price-ascending"==e.sort_order?e.sort_order="PRICE":"created-ascending"==e.sort_order?e.sort_order="CREATED":"manual-best-selling"==e.sort_order&&(e.sort_order="MANUAL"),`
            query {
            collection(id: "${s}") {
                    products(first: ${e.limit}, sortKey: ${e.sort_order}) {
                         edges {
                            node {
                                id
                                title
                                handle
                                description
                                vendor
                                productType
                                tags
                                featuredImage {
                                    url
                                    id
                                    altText
                                }
                                priceRange {
                                    minVariantPrice {
                                        amount
                                        currencyCode
                                    }
                                }
                                variants(first: 1){
                                    edges{
                                        node{
                                            id
                                            title
                                            sku
                                            compareAtPrice
                                            price
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `);try{var r=await fetch("/admin/api/2024-07/graphql.json",{method:"POST",headers:{"Content-Type":"application/json","X-Shopify-Access-Token":e.shopify_token,Accept:"application/json"},body:JSON.stringify({query:i})});if(r.ok)return await r.json();throw new Error("HTTP status "+r.status)}catch(e){throw console.error("Error fetching products:",e),e}}catch(e){throw console.error("Error fetching collection:",e),e}}async function getRelatedProducts(e){return await fetch("/apps/scribblerApi/v1/shoppify/public/products/recommended",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({vendor_name:e.vendor_name,product_type:e.product_type,rude:!0,limit:e.limit,tags:e.tags})}).then(e=>{if(e.ok)return e.json();throw new Error("HTTP status "+e.status)})}function createCardRecommendationSlide(e,o){return e.map(e=>{let t="",a=(t=e?.image?.src?`<a href="/products/${e?.handle}">
                                        <img src="${e?.image?.src}${e?.image?.src.includes("shopify")?"&width=309":""}"
                                            alt="${e?.image?.alt?e.image.alt:e?.title}"
                                            width="309"
                                            decoding="async"
                                            height="430" />
                                    </a>`:`<a href="/products/${e?.handle}"></a>`,"");a=e?.is_user_favorite?`<button type="button" name="Add to Favourites" favourite="true" onclick="removeFavourite(this,${e.id})" class="add-to-favourites-button">
                                <div class="product-add-loader"></div>
                                <svg width="35" height="33" viewBox="0 0 35 33" fill="#cbd81d" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#cbd81d" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>`:`<button type="button" name="Add to Favourites" favourite="false" onclick="addFavourite(this,${e.id})" class="add-to-favourites-button">
                                <div class="product-add-loader"></div>
                                <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                                    <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </button>`;var s=`<button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${e?.variants[0]?.id}, '${e?.product_type}', '${e?.variants[0]?.title}')" class="add-to-basket-button">
                                    <div class="product-add-loader"></div>
                                    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.9" d="M17.9143 34.5332C27.2635 34.5332 34.8425 26.9542 34.8425 17.605C34.8425 8.25577 27.2635 0.676758 17.9143 0.676758C8.5651 0.676758 0.986084 8.25577 0.986084 17.605C0.986084 26.9542 8.5651 34.5332 17.9143 34.5332Z" fill="#E6E6E6"/>
                                        <path d="M27.8029 11.7388C28.641 11.7388 29.2276 12.4092 29.1438 13.2472L26.9649 23.8064C26.7973 25.3987 25.7079 26.6557 24.367 26.6557H11.4614C10.1205 26.6557 9.03108 25.4825 8.86347 23.8064L6.68459 13.2472C6.60079 12.4092 7.27121 11.7388 8.02544 11.7388H27.8029Z" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13.8916 11.2357C13.8916 7.71599 17.9141 7.88359 17.9141 7.88359C17.9141 7.88359 21.9367 7.71599 21.9367 11.2357" stroke="black" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M7.77393 16.5991H28.2219" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M8.86353 21.6274H26.965" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M13.9753 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                        <path d="M21.9368 26.6557V11.7388" stroke="black" stroke-width="1.3" stroke-miterlimit="10"/>
                                    </svg>
                                </button>`;let i="",r=(i=e?.variants[0]?.compare_at_price&&"0.00"!==e?.variants[0]?.compare_at_price?`<div class="collection-gift-slider-price">
                                    <p class="compare-price">${convertGiftPriceAndFormatCurrency(e?.variants[0]?.compare_at_price).replace(".00","")}</p>
                                    <p class="compare-actual-price">${convertGiftPriceAndFormatCurrency(e.variants[0].price).replace(".00","")}</p>
                                </div>`:`<div class="collection-gift-slider-price">${convertGiftPriceAndFormatCurrency(e.variants[0].price).replace(".00","")}</div>`,"");return"card"===o.type?r=`<div class="card-actions">
                                    <div class="card-actions-favourites">${o.isLoggedIn?a:`<button type="button" aria-label="Add to Favourites" name="Add to Favourites" class="add-to-favourites-disabled">  
                                        <svg width="35" height="33" viewBox="0 0 35 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.9" d="M17.1252 32.2173C26.4744 32.2173 34.0534 25.0052 34.0534 16.1087C34.0534 7.21209 26.4744 0 17.1252 0C7.77604 0 0.197021 7.21209 0.197021 16.1087C0.197021 25.0052 7.77604 32.2173 17.1252 32.2173Z" fill="#E6E6E6"/>
                                            <path d="M24.4161 11.0845C23.4943 10.0478 22.3211 9.56934 21.1478 9.56934C19.9746 9.56934 18.8013 10.0478 17.8795 11.0845L17.1253 11.9617L16.371 11.0845C15.4492 10.0478 14.276 9.56934 13.1027 9.56934C11.9295 9.56934 10.7562 10.0478 9.83441 11.0845C7.99074 13.1579 7.99074 16.5072 9.83441 18.5806L10.5886 19.4578L16.2872 25.997C16.7063 26.4754 17.4605 26.4754 17.8795 25.997L23.5781 19.4578L24.3323 18.5806C26.176 16.5072 26.176 13.1579 24.3323 11.0845H24.4161Z" stroke="#333333" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>`}</div>
                                    <div class="card-actions-vendor-logo">
                                        <a href="/collections/vendors?q=${encodeURIComponent(e?.vendor)}">
                                            <img src="${""!==e?.vendor_image_path?e?.vendor_image_path:o.default_vendor_logo}" alt="${e?.vendor}" width="60" height="60" decoding="async" />
                                        </a>
                                    </div>
                                    <div class="card-actions-buy">${s}</div>
                                </div>`:"gift"===o.type&&(r=`<div class="gift-actions">
                                    <div class="gift-actions-name">
                                        <span style="display: -webkit-box; -webkit-box-orient: vertical; line-clamp: 2; -webkit-line-clamp: 2;">${e?.title}</span>
                                    </div>
                                    ${i}
                                    <button type="button" aria-label="Add to Basket" name="Add to Basket" onclick="addToBasket(this,${e?.variants[0]?.id}, '${e?.product_type}', '${e?.variants[0]?.title}')" class="gift-actions-buy">
                                        Add Gift
                                        <div class="product-add-loader"></div>
                                    </button>
                                </div>`),`<div class="collection-slider-item">
                        <div class="collection-slider-item-product">
                            ${t}
                            ${r}
                        </div>
                    </div>`}).join("")}