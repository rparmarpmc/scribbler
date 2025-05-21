class MenuScroll extends HTMLElement {
    constructor() {
        super()

        this.menuContainer = this.querySelector('.menu-scroll ul')
        this.mouseDown = false
        this.allowClick = true
        this.startX 
        this.previousPossition = 0

        this.setupEventListeners()
    }

    setupEventListeners() {
        this.menuContainer.addEventListener('mousemove', this.move, false)
        this.menuContainer.addEventListener('mousedown', this.startDragging, false)
        this.menuContainer.addEventListener('mouseup', this.stopDragging, false)
        this.menuContainer.addEventListener('mouseleave', this.stopDragging, false)
    }

    startDragging = (e) => {
        this.mouseDown = true;
        this.allowClick = true;
        this.startX = e.pageX

        this.previousPossition = this.menuContainer.scrollLeft
    }

    stopDragging = (e) => {
        if (this.allowClick) {
             e = e || window.e
             var el = e.target || e.srcElement

             if (el instanceof HTMLAnchorElement) {
                 window.location = el.getAttribute('href')
             }
        } 
        
        this.allowClick = true
        this.mouseDown = false
    }

    move = (e) => {
        e.preventDefault();
        if(!this.mouseDown) { return; }

        this.allowClick = false

        const scroll = e.pageX - this.startX
        this.menuContainer.scrollLeft = this.previousPossition - scroll
    }
}

customElements.define('menu-scroll', MenuScroll)
