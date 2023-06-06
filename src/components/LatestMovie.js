import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchproducts } from "./store/ProductSlice";
import { useSelector, useDispatch } from "react-redux";
function LatestMovie(props) {
  const { data } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchproducts(1));
  }, [data]);
  return (
    <div>
      <div className="row">
        <h1 className="text-center">Latest Movies</h1>
        {data.slice(0, 4).map((item) => {
          return (
            <div className="col-sm-6 col-md-3" key={item.imdbID}>
              <div className="latest-movie">
                <Link to={`/MovieDetails/${item.imdbID}`}>
                  <img src={item.Poster} alt={item.Title} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LatestMovie;
