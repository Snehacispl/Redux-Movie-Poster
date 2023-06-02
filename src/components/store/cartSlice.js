const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],

  reducers: {
    addtocart(state, action) {
      const duplicate = state.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (!duplicate) {
        state.push(action.payload);
      }
    },
    removefromcart(state, action) {
      return state.filter((item) => item.imdbID !== action.payload.imdbID);
    },
    clearCart(state) {
      return (state = []);
    },
    inccartquantity(state, action) {
      state.map((item) => {
        if (item.imdbID === action.payload.imdbID) {
          item.quantity = item.quantity + 1;
        }
      });
    },
    deccartquantity(state, action) {
      if (action.payload.quantity >= 1) {
        state.map((item) => {
          if (item.imdbID === action.payload.imdbID) {
            if (item.quantity >= 1) {
              item.quantity = item.quantity - 1;
            }
          }
        });
      } else {
        return state.filter((item) => item.imdbID !== action.payload.imdbID);
      }
    },
  },
});
// export const gettotal = (state) => {
//   let totalprice = 0;
//   state.cart.map((item) => {
//     return (totalprice += item.price);
//   });
// };
// export const gettotal = (state) => {
//   // state.cart.reduce((totalprice, curElem) => {
//   //   let { price, quantity } = curElem;
//   //   totalprice = totalprice + price * quantity;
//   //   console.log(totalprice);
//   // }, 0);
//   let totalprice = 0;
//   state.cart.map((item) => {
//     return (totalprice += item.price * item.quantity);
//   });
// };

export const cartTotal = (state) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);
export const cartTotalqty = (state) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

export const {
  addtocart,
  removefromcart,
  clearCart,
  inccartquantity,
  deccartquantity,
} = cartSlice.actions;
export default cartSlice.reducer;
