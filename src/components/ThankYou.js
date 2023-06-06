import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ThankYou = (orderdata) => {
  const location = useLocation();
  const data = location.state;

  return (
    <main className="main-content">
      <div className="container">
        <p>Order id :{data && data.value.id} </p>
        {data &&
          data.value.purchase_units.map((item) => {
            return (
              <>
                <h2>Shipping Address</h2>
                <span>
                  Full name: {item.shipping.name.full_name}
                  <br />
                  Address: {item.shipping.address.address_line_1},
                  {item.shipping.address.admin_area_1},
                  {item.shipping.address.admin_area_2},
                  <br />
                  Country Code:
                  {item.shipping.address.country_code},
                  <br />
                  Zip Code:
                  {item.shipping.address.postal_code}
                </span>
                <br></br>
                <h2>Total</h2>
                Total : {item.amount.value}
                {item.amount.currency_code}
              </>
            );
          })}
      </div>
    </main>
  );
};

export default ThankYou;
