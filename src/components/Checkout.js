import React, { useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  FUNDING,
} from "@paypal/react-paypal-js";

import {
  useNavigate,
  useLocation,
  Link,
  createSearchParams,
} from "react-router-dom";
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
        <h1>FINAL STEP:</h1>
        <h3>Shipping InFormation</h3>
        {state && (
          <>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    Full Name :
                    {state.data.firstName + " " + state.data.lastName}
                  </td>
                </tr>
                <tr>
                  <td>
                    Shipping Address : {state.data.shippingAddress1},
                    {state.data.shippingAddress2}
                  </td>
                </tr>
                <tr>
                  <td>Shipping City :{state.data.shippingCity}</td>
                </tr>
                <tr>
                  <td>Shipping State :{state.data.shippingState}</td>
                </tr>
                <tr>
                  <td>Shipping Zip :{state.data.shippingZip}</td>
                </tr>
                <tr>
                  <td>Country :{state.data.shippingCountry}</td>
                </tr>
              </tbody>
            </table>
            <button type="button">
              <Link to="/prospect">Update Shipping Information</Link>
            </button>
          </>
        )}

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
          {/* <!--paypal shipping details--> */}
          <PayPalButtons
            fundingSource={FUNDING.PAYPAL}
            createOrder={(data, actions) => {
              console.log(state.data);
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
                  setTimeout(() => {
                    var r = createSearchParams({
                      orderid: orderdata.value.id,
                    }).toString();
                    navigate(
                      "/Thank-you?" + r,

                      { state: orderdata }
                    );
                  }, 3000);
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
