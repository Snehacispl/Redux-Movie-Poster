import React from "react";
import { Link } from "react-router-dom";
function Banner() {
  return (
    <>
      <div className="slider">
        <ul className="slides">
          <li>
            <Link to="/">
              <img src="images/slide-1.jpg" alt="Slide 1" />
            </Link>
          </li>
          ;
          <li>
            <Link to="/">
              <img src="images/slide-1.jpg" alt="Slide 1" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src="images/slide-2.jpg" alt="Slide 2" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <img src="images/slide-3.jpg" alt="Slide 3" />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Banner;
