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
  },
});
export const { setproducts, setstatus, settotalresult } = productSlice.actions;
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
