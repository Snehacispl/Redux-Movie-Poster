import React, { useEffect } from "react";
import Slider from "react-touch-drag-slider";

import { useSelector, useDispatch } from "react-redux";
import { fetchproductsimages } from "./store/ProductSlice";
const Banner = () => {
  const { images } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(fetchproductsimages(6));
  }, []);
  return (
    <div className="main2">
      <Slider>
        {images.map((item) => (
          <div key={item.imdbID}>
            <img src={item.Poster} alt={item.Poster} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
