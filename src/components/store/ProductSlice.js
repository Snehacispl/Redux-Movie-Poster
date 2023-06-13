import axios from "axios";
const { createSlice } = require("@reduxjs/toolkit");

const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    singledata: [],
    ratings: [],
    searchdata: [],
    wishlistproduct: [],
    status: STATUSES.IDLE,
    totalresult: 0,
  },
  reducers: {
    setproducts(state, action) {
      state.data = action.payload;
    },
    setstatus(state, action) {
      state.status = action.payload;
    },
    settotalresult(state, action) {
      state.totalresult = action.payload;
    },
    setsingleproduct(state, action) {
      state.singledata = action.payload;
    },
    setratings(state, action) {
      state.ratings = action.payload;
    },
    searchproducts(state, action) {
      state.searchdata = action.payload;
    },
    setwishlistproduct(state, action) {
      const duplicate = state.wishlistproduct.find(
        (item) => item.imdbID === action.payload.imdbID
      );
      if (!duplicate) {
        state.wishlistproduct = [...state.wishlistproduct, action.payload];
      }
    },
    removefromwishlist(state, action) {
      state.wishlistproduct = state.wishlistproduct.filter(
        (item) => item.imdbID !== action.payload.imdbID
      );
    },
  },
});
export const {
  setproducts,
  setstatus,
  settotalresult,
  setsingleproduct,
  setratings,
  searchproducts,
  setwishlistproduct,
  removefromwishlist,
} = productSlice.actions;
export default productSlice.reducer;

export function fetchproducts(page) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`https://www.omdbapi.com/?s=batman&apikey=b3b3b78&&page=${page}`)

        .then((response) => {
          dispatch(settotalresult(response.data.totalResults));

          let newdata = response.data.Search.map((item) =>
            Object.assign({}, item, {
              price: parseFloat((Math.random() * 9999).toFixed(2)),
              quantity: 1,
            })
          );
          console.log(newdata);
          dispatch(setproducts(newdata));
          dispatch(setstatus(STATUSES.IDLE));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function fetchproductdetails(imdbid) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`https://www.omdbapi.com/?&apikey=b3b3b78&i=${imdbid}`)

        .then((response) => {
          let singleproddetail = Object.assign({}, response.data, {
            price: parseFloat((Math.random() * 9999).toFixed(2)),
            quantity: 1,
          });

          dispatch(setsingleproduct(singleproddetail));
          dispatch(setratings(response.data.Ratings));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function fetchwishlistdetails(imdbid) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`https://www.omdbapi.com/?&apikey=b3b3b78&i=${imdbid}`)

        .then((response) => {
          let wishlistdata = Object.assign({}, response.data, {
            price: parseFloat((Math.random() * 9999).toFixed(2)),
            quantity: 1,
          });
          dispatch(setwishlistproduct(wishlistdata));
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
export function searchproductbytitle(title) {
  return async function fetchproductsthunk(dispatch, getstate) {
    dispatch(setstatus(STATUSES.LOADING));
    try {
      axios
        .get(`https://www.omdbapi.com/?&apikey=b3b3b78&t=${title}`)

        .then((response) => {
          let searchdataitem = Object.assign({}, response.data, {
            price: parseFloat((Math.random() * 9999).toFixed(2)),
            quantity: 1,
          });

          dispatch(searchproducts(searchdataitem));
          dispatch(setstatus(STATUSES.IDLE));
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
