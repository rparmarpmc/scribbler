// class CartDrawer extends HTMLElement {
//     constructor() {
//         super() 

//         this.addEventListener('keyup', evt => evt.code === 'Escape' && this.close())
//         this.setHeaderCartIconAccessibility()
//     }

//     setHeaderCartIconAccessibility() {
//         const cartLink = document.querySelector('#cart-icon-bubble')
//         cartLink.setAttribute('role', 'button')
//         cartLink.setAttribute('aria-haspopup', 'dialog')
//         cartLink.addEventListener('click', event => {
//             event.preventDefault()
//             this.open(cartLink)
//         })
//         cartLink.addEventListener('keydown', event => {
//             if (event.code.toUpperCase() === 'SPACE') {
//                 event.preventDefault()
//                 this.open(cartLink)
//             }
//         })
//     }

//     open() {
//         // Hide the cookie bar
//         // var cookieBar = document.querySelector('.cookie-bar')
//         // if (cookieBar) {
//         //     cookieBar.style.display = 'none'
//         // }
//         // Publish the OPEN_CART event
//         // window.eventBus.publish('OPEN_CART', {})
//         window.location = '/cart'
//     }

//     close() {
//         // Show the cookie bar
//         // var cookieBar = document.querySelector('.cookie-bar')
//         // if (cookieBar) {
//         //     cookieBar.style.display = 'block'
//         // }
//         // Publish the CLOSE_CART event
//         // window.eventBus.publish('CLOSE_CART', {})
//     }

//     renderContents(parsedState) {
//         window.eventBus.publish('ADD_ITEM', parsedState)

//         this.getSectionsToRender().forEach(section => {
//             const sectionElement = section.selector ? document.querySelector(section.selector) : document.getElementById(section.id)
//             sectionElement.innerHTML = this.getSectionInnerHTML(parsedState.sections[section.id], section.selector)
//         })
//     }

//     getSectionInnerHTML(html, selector = '.shopify-section') {
//         return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML
//     }

//     getSectionsToRender() {
//         return [
//             {
//                 id: 'cart-icon-bubble'
//             }
//         ]
//     }

//     setActiveElement(element) {
//         this.activeElement = element
//     }
// }

// customElements.define('cart-drawer', CartDrawer)
