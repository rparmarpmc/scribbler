import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import EmptyCart from "../../components/Cart/EmptyCart/EmptyCart";
import Cart from "../../components/Cart/Cart";
import {
    apiGetCartContent,
    apiGetAddresses,
    apiGetUserDetails,
} from "../../store/actions";
import eventBus from "../../event-bus";
window.eventBus = eventBus;

const CartPage = ({ data: { is_logged_in, customer_name } }) => {
    const dispatch = useDispatch();
    const cartContent = useSelector((state) => state.cartContent);
    let filteredItems = [];
    let filteredGifts = [];
    const groups = [];

    let caontent = cartContent?.items?.sort(function (a, b) {
        return a.id > b.id;
    });
    cartContent.items = caontent;

    useEffect(() => {
        dispatch(apiGetCartContent());
        if (is_logged_in) dispatch(apiGetAddresses());
        if (is_logged_in) dispatch(apiGetUserDetails());
    }, []);

    //filter items
    cartContent?.items?.map((newItem) => {
        if (!Object.hasOwn(newItem.properties, "_gift_line")) {
            filteredItems.push(Object.assign({}, newItem));
        }
    });

    //filter attached gift items
    cartContent?.items?.map((newGiftItem) => {
        if (Object.hasOwn(newGiftItem.properties, "_gift_line")) {
            filteredGifts.push(Object.assign({}, newGiftItem));
        }
    });

    //attach gift to product
    filteredItems?.length > 0 &&
        filteredItems.map((item) => {
            if (Object.hasOwn(item.properties, "_connected_gift_id")) {
                filteredGifts.map((gift) => {
                    if (
                        gift.properties._gift_line ==
                        item.properties._connected_gift_id
                    ) {
                        item.gift = Object.assign({}, gift);
                    }
                });
            }
        });

    //create groups
    filteredItems?.length > 0 &&
        filteredItems.map((item) => {
            if (Object.hasOwn(item.properties, "_shipping_address")) {
                if (groups.length > 0) {
                    const inserted = groups.map(
                        (externalArray, externalIndex) => {
                            if (
                                externalArray.findIndex(
                                    (internalArray) =>
                                        internalArray.properties
                                            ._shipping_address ===
                                        item.properties._shipping_address
                                ) === -1
                            ) {
                                return false;
                            } else {
                                groups[externalIndex].push(item);
                                return true;
                            }
                        }
                    );
                    if (!inserted.includes(true)) {
                        groups.push([item]);
                    }
                } else {
                    groups.push([item]);
                }
            } else {
                groups.push([item]);
            }
        });

    return cartContent?.item_count === 0 ? (
        <EmptyCart isLoggedIn={is_logged_in} />
    ) : (
        <Cart
            isLoggedIn={is_logged_in}
            customerName={customer_name}
            cartContent={cartContent}
            groups={groups}
        />
    );
};

export default CartPage;

CartPage.propTypes = {
    data: PropTypes.object.isRequired,
};
