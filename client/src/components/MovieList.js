import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./store/cartSlice";

import {
  fetchproducts,
  searchproductbytitle,
  fetchwishlistdetails,
} from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
const MovieList = () => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [title, settitle] = useState("");

  const [display, setdisplay] = useState(false);
  const { data, totalresult, searchdata } = useSelector(
    (state) => state.product
  );

  const handlePageClick = (e) => {
    dispatch(fetchproducts(e.selected + 1));
  };
  useEffect(() => {
    return () => dispatch(fetchproducts(page));
  }, []);

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
                data.map((item) => {
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
                      <button
                        onClick={() =>
                          dispatch(fetchwishlistdetails(item.imdbID))
                        }
                      >
                        Add To WishList <i className="fa fa-heart"></i>
                      </button>
                    </div>
                  );
                })}
              {display && searchdata && (
                <div
                  className="movie"
                  style={{ resultwidth: "18rem" }}
                  key={searchdata.imdbID}
                >
                  <figure className="movie-poster">
                    <img
                      src={
                        searchdata.Poster !== "N/A" ? searchdata.Poster : noimg
                      }
                      className="card-img-top"
                      alt={searchdata.Title}
                    />
                  </figure>
                  <div className="movie-title">{searchdata.Title}</div>
                  <p className="card-text"> {searchdata.Year}</p>
                  {searchdata.imdbID && (
                    <p className="card-text"> ${searchdata.price}</p>
                  )}
                  {searchdata.imdbID && (
                    <>
                      {" "}
                      <button onClick={() => dispatch(addtocart(searchdata))}>
                        Add To Cart
                      </button>
                      <button
                        onClick={() =>
                          dispatch(fetchwishlistdetails(searchdata.imdbID))
                        }
                      >
                        Add To WishList <i className="fa fa-heart"></i>
                      </button>
                    </>
                  )}
                </div>
              )}
              {!searchdata.imdbID && title && display && (
                <p>No Movies Found By This Title</p>
              )}
            </div>

            <div className="pagination">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(totalresult / 10)}
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
