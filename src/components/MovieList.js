import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./store/cartSlice";

import { fetchproducts, searchproductbytitle } from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
const MovieList = () => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [title, settitle] = useState("");

  const [pageCount, setPageCount] = useState(1);
  const [display, setdisplay] = useState(false);
  const { data, totalresult, searchdata } = useSelector(
    (state) => state.product
  );

  const handlePageClick = (e) => {
    dispatch(fetchproducts(e.selected + 1));
  };
  useEffect(() => {
    dispatch(fetchproducts(page));

    setPageCount(Math.ceil(totalresult / 10));
  }, [page]);

  let products = data.map((item) =>
    Object.assign({}, item, {
      price: parseFloat((Math.random() * 9999).toFixed(2)),
      quantity: 1,
    })
  );

  let result = Object.assign({}, searchdata, {
    price: parseFloat((Math.random() * 9999).toFixed(2)),
    quantity: 1,
  });
  const onsearchhandler = (e) => {
    dispatch(searchproductbytitle(title));
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
              <h1>MovieList</h1>

              {!title &&
                products.map((item) => {
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
                      <button onClick={() => dispatch(addtocart(item))}>
                        Add To Cart
                      </button>
                    </div>
                  );
                })}
              {display && result && (
                <div
                  className="movie"
                  style={{ resultwidth: "18rem" }}
                  key={result.imdbID}
                >
                  <figure className="movie-poster">
                    <img
                      src={result.Poster !== "N/A" ? result.Poster : noimg}
                      className="card-img-top"
                      alt={result.Title}
                    />
                  </figure>
                  <div className="movie-title">{result.Title}</div>
                  <p className="card-text"> {result.Year}</p>
                  {result.imdbID && (
                    <p className="card-text"> ${result.price}</p>
                  )}
                  {result.imdbID && (
                    <button onClick={() => dispatch(addtocart(result))}>
                      Add To Cart
                    </button>
                  )}
                </div>
              )}
              {!result.imdbID && title && <p>No Movies Found By This Title</p>}
            </div>

            <div className="pagination">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MovieList;
