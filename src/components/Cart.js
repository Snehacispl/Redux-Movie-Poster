import React, { useEffect, useRef } from "react";
import "../assets/css/cartpage.css";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  removefromcart,
  clearCart,
  cartTotal,
  inccartquantity,
  deccartquantity,
  cartTotalqty,
} from "./store/cartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const totalprice = useSelector(cartTotal).toFixed(2);
  const totalqty = useSelector(cartTotalqty);
  // const paypal = useRef();

  // const paypalfunc = () => {
  //   const cartitemnames = [];
  //   cart.map((item) => {
  //     if (!cartitemnames.includes(item.Title)) {
  //       cartitemnames.push(item.Title + ", ");
  //       // let paypalitem = new Set(cartitemnames);
  //     }
  //   });
  //   window.paypal
  //     .Buttons({
  //       createOrder: (data, actions, err) => {
  //         return actions.order.create({
  //           intent: "CAPTURE",
  //           purchase_units: [
  //             {
  //               description: JSON.stringify(cartitemnames),
  //               amount: {
  //                 currency_code: "USD",
  //                 //value: totalprice,
  //                 value: 1.0,
  //               },
  //             },
  //           ],
  //         });
  //       },
  //       onApprove: (data, actions) => {
  //         const order = actions.order.capture();
  //         console.log(data.orderID);
  //       },
  //       onError: (err) => {
  //         console.log(err);
  //       },
  //     })
  //     .render(paypal.current);
  // };

  // useEffect(() => {
  //   //  paypalfunc();
  // });
  return (
    <div className="CartContainer">
      <div className="Header">
        <h3 className="Heading">Shopping Cart</h3>
        <h5 className="Action" onClick={() => dispatch(clearCart(cart))}>
          Remove All
        </h5>
      </div>
      {cart &&
        cart.map((item) => {
          return (
            <div className="Cart-Items" key={item.imdbID}>
              <div className="image-box">
                <img
                  src={item.Poster}
                  style={{ height: "120px" }}
                  alt={item.Title}
                />
              </div>
              <div className="about">
                <h1 className="title">{item.Title}</h1>
                <h3 className="subtitle">{item.Year}</h3>
              </div>
              <div className="counter">
                <div
                  className="btn"
                  onClick={() => dispatch(inccartquantity(item, item.quantity))}
                >
                  +
                </div>
                <div className="count">{item.quantity}</div>
                <div
                  className="btn"
                  onClick={() => dispatch(deccartquantity(item, item.quantity))}
                >
                  -
                </div>
              </div>
              <div className="prices">
                <div className="amount">${item.price}</div>
                <div className="save">
                  <u>Save for later</u>
                </div>
                <div
                  className="remove"
                  onClick={() => dispatch(removefromcart(item))}
                >
                  Remove
                </div>
              </div>
            </div>
          );
        })}
      {cart.length === 0 && <p>Cart is Empty . Continue Shopping</p>}

      <hr />
      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal">Sub-Total</div>
            <div className="items">{totalqty} items</div>
          </div>
          <div className="total-amount" style={{ color: "white" }}>
            ${totalprice}
          </div>
        </div>
        <div>{/* <div ref={paypal}></div> */}</div>
        <PayPalScriptProvider
          options={{
            "client-id":
              "ARNMywa98AcRZjmGQ7KVSI0XfjxdOsjZecD9q60VJoykSYFsGvA2n-mzirC8xJM6dVKjcIHxqz_yYyGZ",
          }}
        >
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: 0.01,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Cart;
