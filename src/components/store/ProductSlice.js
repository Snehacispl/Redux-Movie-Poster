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
  },
});
export const {
  setproducts,
  setstatus,
  settotalresult,
  setsingleproduct,
  setratings,
  searchproducts,
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
          dispatch(setproducts(response.data.Search));
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
          dispatch(setsingleproduct(response.data));
          dispatch(setratings(response.data.Ratings));
          console.log(response.data.Ratings);
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
          dispatch(searchproducts(response.data));
          console.log(response.data);
        });
    } catch (err) {
      console.log(err);
      dispatch(setstatus(STATUSES.ERROR));
    }
  };
}
