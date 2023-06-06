import React, { useEffect, useState } from "react";
import noimg from "../assets/images/No_Image_Available.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "./store/cartSlice";

import { fetchproducts } from "./store/ProductSlice";
import ReactPaginate from "react-paginate";
const MovieList = () => {
  const dispatch = useDispatch();
  const [page, setpage] = useState(1);
  const [productsitem, setproductlist] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const { data, totalresult } = useSelector((state) => state.product);

  const handlePageClick = (e) => {
    dispatch(fetchproducts(e.selected + 1));
  };
  useEffect(() => {
    dispatch(fetchproducts(page));

    setPageCount(Math.ceil(totalresult / 10));
  }, [page]);

  let products = data.map((item) =>
    Object.assign({}, item, {
      price: parseFloat((Math.random() * 999).toFixed(2)),
      quantity: 1,
    })
  );

  return (
    <>
      <main className="main-content">
        <div className="container">
          <div className="page">
            <div className="movie-list">
              <h1>MovieList</h1>

              {products.map((item) => {
                // item.price = parseFloat((Math.random() * 999).toFixed(2));
                // item.quantity = 1;

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
            </div>

            <div className="pagination">
              {/* <Link
                className="page-number prev"
                onClick={
                  page !== 1 ? () => setpage(page - 1) : () => setpage(page)
                }
              >
                <i className="fa fa-angle-left"></i>
              </Link>

              <span
                className={page === 1 ? "page-number current" : "page-number"}
                onClick={() => setpage(1)}
              >
                1
              </span>
              <Link
                className={page === 2 ? "page-number current" : "page-number"}
                onClick={() => setpage(2)}
              >
                2
              </Link>
              <Link
                className={page === 3 ? "page-number current" : "page-number"}
                onClick={() => setpage(3)}
              >
                3
              </Link>
              <Link
                className={page === 4 ? "page-number current" : "page-number"}
                onClick={() => setpage(4)}
              >
                4
              </Link>
              <Link
                className={page === 5 ? "page-number current" : "page-number"}
                onClick={() => setpage(5)}
              >
                5
              </Link>

              <Link
                className="page-number next"
                onClick={
                  page !== 5 ? () => setpage(page + 1) : () => setpage(page)
                }
              >
                <i className="fa fa-angle-right"></i>
              </Link> */}

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

// <div className="card" style={{ width: "18rem" }} key={item.imdbID}>
//   <img
//     src={item.Poster !== "N/A" ? item.Poster : noimg}
//     className="card-img-top"
//     alt={item.Title}
//   />
//   <div className="card-body">
//     <h5 className="card-title">{item.Title}</h5>
//     <p className="card-text"> {item.Year}</p>

//     <p className="card-text"> Rs.{item.price}</p>
//   </div>
//   <button onClick={() => dispatch(addtocart(item))}>
//     Add To Cart
//   </button>
// </div>
