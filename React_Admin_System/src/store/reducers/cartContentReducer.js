import { API_GET_CART_CONTENT_SUCCESS } from '../actions/actionTypes'

const initialState = {}

const cartContentReducer = (state = initialState, action) => {
    switch (action.type) {
        case API_GET_CART_CONTENT_SUCCESS:
            document.getElementById('cart-icon-bubble').innerHTML = `
            <svg width="36" height="40" viewBox='0 0 40 40' xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
                <defs>
                <style>
                    .cls-1 {
                    fill: none;
                    stroke: #1d1d1b;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 2px;
                    }
                    .cls-2 {
                    font-family: BrandonGrotesque-Regular, &#x27;Brandon Grotesque&#x27;;
                    font-size: 18.7px;
                    }
                </style>
                </defs>
                <polygon class="cls-1" id="svg_2" points="32.900001525878906,38.70000076293945 2.6000003814697266,38.70000076293945 5.799999237060547,13.200000762939453 29.700000762939453,13.200000762939453 32.900001525878906,38.70000076293945 "/>
                <path class="cls-1" d="m10.6,19.6l0,-10.3c0,-4 3.2,-7.2 7.2,-7.2l0,0c4,0 7.2,3.2 7.2,7.2l0,10.3" id="svg_3"/>
            </svg>
            <p>Basket</p>
            <div class="cart-count-bubble"><span aria-hidden="true">${action.payload.item_count}</span></div>`

            return action.payload
        default:
            return state
    }
}

export default cartContentReducer
