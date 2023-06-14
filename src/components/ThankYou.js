import React from "react";
import { useLocation } from "react-router-dom";

const ThankYou = (orderdata) => {
  const location = useLocation();
  const data = location.state;

  return (
    <main className="main-content">
      <div className="container">
        <h1>Thank You For Your Order</h1>
        <h3>Transaction ID</h3>
        <p>{data && data.value.id} </p>
        {data &&
          data.value.purchase_units.map((item) => {
            return (
              <div key={item}>
                <h3>Item Ordered</h3>
                <ul>
                  <li>{JSON.parse(item.description)}</li>
                </ul>
                <h3>Shipping Address</h3>
                <span>
                  <b>Full name: </b> {item.shipping.name.full_name}
                  <br />
                  <b>Address: </b> {item.shipping.address.address_line_1},
                  {item.shipping.address.admin_area_1},
                  {item.shipping.address.admin_area_2}
                  <br />
                  <b>Country Code: </b>
                  {item.shipping.address.country_code}
                  <br />
                  <b>Zip Code: </b>
                  {item.shipping.address.postal_code}
                </span>
                <br></br>
                <h3>Total</h3>${item.amount.value}
                {/* {item.amount.currency_code} */}
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default ThankYou;
