import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import "./OrderSummary.css";
import Error from "./Error";
import {
    formatCurrency,
    convertFormatCurrency,
} from "../../../helpers/formatCurrency";

const OrderSummary = ({
    cartContent,
    calculateTotal,
    getTotalShipping,
    calculatePrePayUsed,
}) => {
    const userDetails = useSelector((state) => state.userDetails);
    const [checkoutBlockersAcumulattor, setCheckoutBlockersAcumulattor] =
        useState([]);
    const [shippingCost, setShippingCost] = useState(0);

    const proceedToCheckout = () => {
        let shippingOptionErrors = 0;
        let addressErrors = 0;

        if (!cartContent?.items) {
            setCheckoutBlockersAcumulattor((oldErrors) => [
                ...oldErrors,
                `Your basket is invalid. Please check your items and try again.`,
            ]);
        }

        cartContent?.items?.map((item) => {
            if (item.product_type === "PrePay") {
                return true;
            } else if (Object.hasOwn(item.properties, "_gift_line")) {
                if (
                    !Object.hasOwn(item.properties, "_shipping_name") &&
                    item.properties._shipping_name != false
                )
                    shippingOptionErrors++;
                if (
                    !Object.hasOwn(item.properties, "_shipping_address") &&
                    item.properties._shipping_address != false
                )
                    addressErrors++;
                if (Object.hasOwn(item.properties, "_shipping_address")) {
                    const addressObject = JSON.parse(
                        item.properties["_shipping_address"]
                    );
                    if (
                        addressObject.zip.length === 0 &&
                        addressObject.city.length === 0
                    ) {
                        addressErrors++;
                    }
                }
            } else {
                if (
                    !Object.hasOwn(item.properties, "_shipping_address") &&
                    item.properties._shipping_address != false
                )
                    addressErrors++;
                if (
                    !Object.hasOwn(item.properties, "_shipping_name") &&
                    item.properties._shipping_name != false
                )
                    shippingOptionErrors++;
                if (Object.hasOwn(item.properties, "_shipping_address")) {
                    const addressObject = JSON.parse(
                        item.properties["_shipping_address"]
                    );
                    if (
                        addressObject.zip.length === 0 &&
                        addressObject.city.length === 0
                    ) {
                        addressErrors++;
                    }
                }
            }
        });

        if (shippingOptionErrors > 0)
            setCheckoutBlockersAcumulattor((oldErrors) => [
                ...oldErrors,
                `${shippingOptionErrors} item(s) needs postage method`,
            ]);
        if (addressErrors > 0)
            setCheckoutBlockersAcumulattor((oldErrors) => [
                ...oldErrors,
                `${addressErrors} item(s) need address details`,
            ]);

        if (cartContent?.items && shippingOptionErrors === 0 && addressErrors === 0)
            window.location.href = "/checkout";
    };

    const allowCheckout = cartContent?.items?.every((item) => {
        if (item.product_type === "PrePay") return true;
        if (
            item.properties?._shipping_name?.length > 0 &&
            item.properties?._shipping_address?.length > 0
        )
            return true;
    });

    const continueShopping = () => {
        window.location = "/";
    };

    useEffect(() => {
        getShipping();
    }, [cartContent]);

    const getShipping = async () => {
        const shippingTotal = await getTotalShipping();
        setShippingCost(shippingTotal);
    };

    return (
        <div className="cart-order-summary-wrapper">
            <div className="cart-order-summary-errors">
                {checkoutBlockersAcumulattor.map((error, index) => (
                    <Error key={index} error={error} />
                ))}
            </div>
            <div className="cart-order-summary-title">Order Summary</div>
            <div className="cart-order-summary-product-cost-wrapper">
                <div className="cart-order-summary-product-cost-titler">
                    Product Cost:
                </div>
                <div className="cart-order-summary-product-cost">
                    {cartContent.original_total_price
                        ? formatCurrency(cartContent.original_total_price)
                        : formatCurrency(0)}
                </div>
            </div>
            <div className="cart-order-summary-product-cost-wrapper">
                <div className="cart-order-summary-product-cost-titler">
                    Shipping:
                </div>
                <div className="cart-order-summary-product-cost">
                    {convertFormatCurrency(
                        shippingCost.total_delivery_price
                            ? shippingCost.total_delivery_price * 100
                            : 0
                    )}
                </div>
            </div>
            <div className="cart-order-summary-product-cost-wrapper">
                <div className="cart-order-summary-product-cost-titler">
                    {" "}
                    Discount:
                </div>
                <div
                    className={`cart-order-summary-product-cost ${
                        cartContent.total_discount > 0 ? "activeDiscount" : ""
                    }`}
                >
                    {formatCurrency(
                        cartContent.total_discount
                            ? cartContent.total_discount
                            : 0
                    )}
                </div>
            </div>
            <div className="cart-order-summary-product-cost-wrapper">
                <div className="cart-order-summary-product-cost-titler">
                    PrePay:
                </div>
                <div className="cart-order-summary-product-cost">
                    {calculatePrePayUsed(
                        shippingCost,
                        userDetails?.prepay_credit_balance
                    )}
                </div>
            </div>
            <div className="cart-order-summary-order-total-wrapper">
                <div className="cart-order-summary-order-total-titler">
                    Order total:
                </div>
                <div className="cart-order-summary-order-total">
                    {calculateTotal(
                        cartContent.original_total_price,
                        shippingCost,
                        userDetails?.prepay_credit_balance,
                        cartContent.total_discount
                    )}
                </div>
            </div>
            <button
                className={`cart-order-summary-order-total-checkout ${
                    allowCheckout ? "active" : ""
                }`}
                onClick={() => proceedToCheckout()}
            >
                Proceed to Checkout
            </button>
            <button
                className="cart-order-summary-order-total-shopping"
                onClick={() => continueShopping()}
            >
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderSummary;

OrderSummary.propTypes = {
    cartContent: PropTypes.object.isRequired,
    calculateTotal: PropTypes.func.isRequired,
    getTotalShipping: PropTypes.func.isRequired,
    calculatePrePayUsed: PropTypes.func.isRequired,
};
