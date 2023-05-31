import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
const MovieList = () => {
  const [products, setproducts] = useState([]);

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
            </div>
            <button>Add To Cart</button>
          </div>
        );
      })}
    </>
  );
};

export default MovieList;
