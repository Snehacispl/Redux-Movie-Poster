import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

import { useNavigate, useLocation } from "react-router-dom";
import { cartTotal } from "./store/cartSlice";
import { useSelector } from "react-redux";
const Checkout = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const totalprice = useSelector(cartTotal).toFixed(2);
  const { state } = useLocation();
  const cartitemnames = [];
  cart.map((item) => {
    if (!cartitemnames.includes(item.Title)) {
      cartitemnames.push(item.Title + ", ");
    }
  });
  console.log(state);
  return (
    <main className="main-content">
      <div className="container">
        <h2>Checkout</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Item Name</th>
              <th scope="col">Item Quantity</th>
              <th scope="col">Item Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return (
                <tr>
                  <td>{item.Title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <h1>Total: ${totalprice}</h1>
        <PayPalScriptProvider
          options={{
            "client-id":
              "ARNMywa98AcRZjmGQ7KVSI0XfjxdOsjZecD9q60VJoykSYFsGvA2n-mzirC8xJM6dVKjcIHxqz_yYyGZ",
          }}
        >
          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    description: JSON.stringify(cartitemnames),
                    amount: {
                      // value: totalp.current.getAttribute("price"),
                      value: 0.01,
                    },
                    shipping: {
                      name: {
                        full_name:
                          state.data.firstName + " " + state.data.lastName,
                      },
                      address: {
                        address_line_1: state.data.shippingAddress1,
                        address_line_2: state.data.shippingAddress2,
                        admin_area_2: state.data.shippingCity,
                        admin_area_1: state.data.shippingState,
                        postal_code: state.data.shippingZip,
                        country_code: state.data.shippingCountry,
                      },
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                // const name = details.payer.name.given_name;
                const orderdata = actions.order.capture();
                console.log(orderdata);
                setTimeout(() => {
                  navigate("/Thank-you", { state: orderdata });
                }, 3000);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </main>
  );
};

export default Checkout;
