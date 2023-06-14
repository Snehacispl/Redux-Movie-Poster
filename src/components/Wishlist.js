import React, { useState } from "react";
import { removefromwishlist } from "./store/ProductSlice";

import { useDispatch, useSelector } from "react-redux";
import noimg from "../assets/images/No_Image_Available.jpg";
import { addtocart } from "./store/cartSlice";

function MovieDetail() {
  const dispatch = useDispatch();
  const { wishlistproduct } = useSelector((state) => state.product);

  const [title, settitle] = useState("");
  const [display, setdisplay] = useState(false);

  const onsearchhandler = (e) => {
    setdisplay(true);
  };
  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <input
                type="text"
                placeholder="Search By Movie Title"
                onChange={(e) => settitle(e.target.value)}
              />
              <button onClick={onsearchhandler}>Search</button>
              <h1>My WishList Collection</h1>

              {!display &&
                wishlistproduct.map((item) => {
                  return (
                    <div
                      className="movie"
                      style={{ width: "18rem" }}
                      key={item.imdbID}
                    >
                      <figure className="movie-poster">
                        <img
                          src={item.Poster !== "N/A" ? item.Poster : noimg}
                          className="card-img-top"
                          alt={item.Title}
                        />
                      </figure>
                      <div className="movie-title">{item.Title}</div>
                      <p className="card-text"> {item.Year}</p>
                      <p className="card-text"> ${item.price}</p>
                      <button
                        onClick={() => dispatch(removefromwishlist(item))}
                      >
                        Remove From Collection
                      </button>
                      <button onClick={() => dispatch(addtocart(item))}>
                        Add To Cart
                      </button>
                    </div>
                  );
                })}
              {display &&
                wishlistproduct
                  .filter((item) =>
                    item.Title.toLowerCase().includes(title.toLowerCase())
                  )

                  .map((item) => {
                    return (
                      <div
                        className="movie"
                        style={{ width: "18rem" }}
                        key={item.imdbID}
                      >
                        <figure className="movie-poster">
                          <img
                            src={item.Poster !== "N/A" ? item.Poster : noimg}
                            className="card-img-top"
                            alt={item.Title}
                          />
                        </figure>
                        <div className="movie-title">{item.Title}</div>
                        <p className="card-text"> {item.Year}</p>
                        <p className="card-text"> ${item.price}</p>
                        <button
                          onClick={() => dispatch(removefromwishlist(item))}
                        >
                          Remove From Collection
                        </button>
                        <button onClick={() => dispatch(addtocart(item))}>
                          Add To Cart
                        </button>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetail;
