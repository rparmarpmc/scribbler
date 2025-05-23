import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import eventBus from './event-bus'

import DrawerMenu from './containers/DrawerMenu/DrawerMenu'
import CartPage from './containers/CartPage/CartPage'

// const DrawerMenu = React.lazy(() => import('./containers/DrawerMenu/DrawerMenu'))
// const CartPage = React.lazy(() => import('./containers/CartPage/CartPage'))

window.eventBus = eventBus

const renderSwitch = (data) => {
    if (data.widget_type === 'drawer-menu') {
        return <DrawerMenu data={data} />
    }
    if (data.widget_type === 'cart-page') {
        return <CartPage data={data} />
    }
}

eventBus.subscribe('ADD_WIDGET', (data) => {
    const rootElement = ReactDOM.createRoot(document.getElementById(data.mounting_point))
    rootElement.render(<Provider store={store}>{renderSwitch(data)}</Provider>)
})
