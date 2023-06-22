import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Prospect = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [dataform, setData] = useState("");
  const navigate = useNavigate();

  const submitform = (data) => {
    setTimeout(() => {
      navigate("/checkout", {
        state: {
          data,
        },
      });
    }, 2000);
  };
  return (
    <main className="main-content">
      <div className="container">
        <form onSubmit={handleSubmit(submitform)}>
          <div className="checkout-box__fields">
            <div className="fields__elements fields__elements--half">
              <label htmlFor="first-name">First Name *</label>
              <input
                type="text"
                name="firstName"
                id="first-name"
                {...register("firstName", { required: true })}
              />

              {errors.firstName && <span>First Name is required</span>}
            </div>
            <div className="fields__elements fields__elements--half">
              <label htmlFor="last-name">Last Name *</label>
              <input
                type="text"
                name="lastName"
                id="last-name"
                className="required"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && <span>Last Name is required</span>}
            </div>
            <div className="fields__elements fields__elements--half">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                name="email"
                id="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>Please enter a valid email id</span>}
            </div>

            <div className="fields__elements">
              <label htmlFor="shipping-address">
                Shipping Address line 1 *
              </label>
              <input
                type="text"
                name="shippingAddress1"
                id="shipping-address"
                {...register("shippingAddress1", { required: true })}
              />
              {errors.shippingAddress1 && (
                <span>Please enter your shipping address line 1</span>
              )}
            </div>
            <div className="fields__elements">
              <label htmlFor="shipping-address">Shipping Address line 2*</label>
              <input
                type="text"
                name="shippingAddress2"
                id="shipping-address"
                {...register("shippingAddress2", { required: true })}
              />
              {errors.shippingAddress1 && (
                <span>Please enter your shipping address line 2</span>
              )}
            </div>

            <div className="fields__elements fields__elements">
              <label htmlFor="country">Country *</label>
              <select
                name="shippingCountry"
                id="country"
                {...register("shippingCountry", { required: true })}
              >
                <option value="US">United States</option>
              </select>
              {errors.shippingCountry && (
                <span>Please enter your shipping country</span>
              )}
            </div>

            <div className="fields__elements fields__elements--half">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                name="shippingCity"
                id="city"
                {...register("shippingCity", { required: true })}
              />
              {errors.shippingCity && (
                <span>Please enter your shipping city</span>
              )}
            </div>

            <div className="fields__elements fields__elements--half">
              <label htmlFor="state">State *</label>

              <select
                name="shippingState"
                id="states"
                {...register("shippingState", { required: true })}
              >
                <option value="">Select Your State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
              {errors.shippingState && (
                <span>Please enter your shipping state</span>
              )}
            </div>

            <div className="fields__elements fields__elements--half">
              <label htmlFor="zip">Zip Code *</label>
              <input
                type="tel"
                name="shippingZip"
                {...register("shippingZip", { required: true })}
              />
              {errors.shippingZip && (
                <span>Please enter your shipping zip</span>
              )}
            </div>
          </div>

          <p>{dataform}</p>
          <button type="submit">Rush to Checkout</button>
        </form>
      </div>
    </main>
  );
};

export default Prospect;
