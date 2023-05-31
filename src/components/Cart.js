import React from "react";
import "../assets/css/cartpage.css";
import { useDispatch, useSelector } from "react-redux";
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
                <div className="amount">Rs.{item.price}</div>
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
          <div className="total-amount">${totalprice}</div>
        </div>
        <button className="button">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
