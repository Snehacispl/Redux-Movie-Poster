import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch } from "react-redux";
import { addtocart } from "./store/cartSlice";

const MovieList = () => {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();
  // const movieitem = useSelector((state) => state.cart);
  const fetchProduct = async () => {
    await fetch("http://www.omdbapi.com/?s=inception&apikey=b3b3b78").then(
      async (response) => {
        const data = await response.json();
        setproducts(data.Search);
      }
    );
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <>
      <h1>MovieList</h1>
      {products.map((item) => {
        item.price = parseFloat((Math.random() * 999).toFixed(2));
        item.quantity = 1;
        return (
          <div className="card" style={{ width: "18rem" }} key={item.imdbID}>
            <img
              src={item.Poster !== "N/A" ? item.Poster : noimg}
              className="card-img-top"
              alt={item.Title}
            />
            <div className="card-body">
              <h5 className="card-title">{item.Title}</h5>
              <p className="card-text"> {item.Year}</p>

              <p className="card-text"> Rs.{item.price}</p>
            </div>
            <button onClick={() => dispatch(addtocart(item))}>
              Add To Cart
            </button>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
