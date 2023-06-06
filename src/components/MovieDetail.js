import React, { useEffect, useState } from "react";
import { fetchproductdetails } from "./store/ProductSlice";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function MovieDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const { singledata, ratings } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchproductdetails(params.id));
  }, []);
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
                  {/* <div className="movie-summary">
                    <p>{singledata.Plot}</p>
                  </div> */}
                  <ul className="movie-meta">
                    <li>
                      <strong> Imdb Rating: </strong>
                      <span style={{ width: "80%" }}>
                        <span className="rating">
                          {singledata.imdbRating} out of 10
                        </span>
                      </span>
                      {/* <div className="star-rating" title="Rated 4.00 out of 5">
                        <span style={{ width: "80%" }}>
                          <strong className="rating">
                            {singledata.imdbRating} out of 10
                          </strong>
                        </span>
                      </div> */}
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
                      <strong>Year:</strong> {singledata.Year}
                    </li>

                    <li>
                      <strong>Length:</strong> {singledata.Runtime}
                    </li>
                    <li>
                      <strong>Premiere:</strong> {singledata.Released} (
                      {singledata.Country})
                    </li>
                    <li>
                      <strong>Language:</strong> {singledata.Language}
                    </li>
                    <li></li>
                    <li>
                      <strong>Category:</strong> {singledata.Genre}
                    </li>
                  </ul>

                  <ul className="starring">
                    <li>
                      <strong>Directors:</strong> {singledata.Director}
                    </li>
                    <li>
                      <strong>Writers:</strong> {singledata.Writer}
                    </li>
                    <li>
                      <strong>Actors:</strong> {singledata.Actors}
                    </li>
                    <li>
                      <strong>ImdbVotes:</strong> {singledata.imdbVotes}
                    </li>
                    <li>
                      <strong>BoxOffice:</strong> {singledata.BoxOffice}
                    </li>
                    <li>
                      <strong>Awards:</strong> {singledata.Awards}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="entry-content">
                <h4>Plot</h4>
                <p>{singledata.Plot}</p>
              </div>
            </div>
            ;
          </div>
        </div>
      </main>
    </>
  );
}

export default MovieDetail;
