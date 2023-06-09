import React, { useEffect, useState } from "react";
import { fetchproductdetails } from "./store/ProductSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addtocart } from "./store/cartSlice";
function MovieDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { singledata, ratings } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchproductdetails(params.id));
  }, []);
  let dataitem = Object.assign({}, singledata, {
    price: parseFloat((Math.random() * 9999).toFixed(2)),
    quantity: 1,
  });
  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="breadcrumbs">
              <Link to="/">Home</Link>

              <span>{singledata.Title}</span>
            </div>
            <div className="content">
              <div className="row">
                <div className="col-md-6">
                  <figure className="movie-poster">
                    <img src={singledata.Poster} alt={singledata.Title} />
                  </figure>
                </div>
                <div className="col-md-6">
                  <h2 className="movie-title">{singledata.Title}</h2>

                  <ul className="movie-meta">
                    <li>
                      <strong> Imdb Rating: </strong>
                      <span style={{ width: "80%" }}>
                        <span className="rating">
                          {singledata.imdbRating} out of 10
                        </span>
                      </span>
                    </li>
                    <h4>Other Ratings</h4>
                    <strong>Source:</strong>
                    {ratings.map((item) => {
                      return (
                        <div key={Math.random() * 10}>
                          <li>{item.Source}</li>
                        </div>
                      );
                    })}
                    <li>
                      <strong>Year:</strong> {dataitem.Year}
                    </li>

                    <li>
                      <strong>Length:</strong> {dataitem.Runtime}
                    </li>
                    <li>
                      <strong>Premiere:</strong> {dataitem.Released} (
                      {dataitem.Country})
                    </li>
                    <li>
                      <strong>Language:</strong> {dataitem.Language}
                    </li>
                    <li></li>
                    <li>
                      <strong>Category:</strong> {dataitem.Genre}
                    </li>
                  </ul>

                  <ul className="starring">
                    <li>
                      <strong>Directors:</strong> {dataitem.Director}
                    </li>
                    <li>
                      <strong>Writers:</strong> {dataitem.Writer}
                    </li>
                    <li>
                      <strong>Actors:</strong> {dataitem.Actors}
                    </li>
                    <li>
                      <strong>ImdbVotes:</strong> {dataitem.imdbVotes}
                    </li>
                    <li>
                      <strong>BoxOffice:</strong> {dataitem.BoxOffice}
                    </li>
                    <li>
                      <strong>Awards:</strong> {dataitem.Awards}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="entry-content">
                <h4>Plot</h4>
                <p>{dataitem.Plot}</p>
              </div>

              <p>${dataitem.price}</p>
              <button onClick={() => dispatch(addtocart(dataitem))}>
                Add To Cart
              </button>
            </div>
            ;
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetail;
