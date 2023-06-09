import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link to="/" id="branding">
            <img src="images/logo.png" alt="" className="logo" />
          </Link>

          <div className="main-navigation">
            <button type="button" className="menu-toggle">
              <i className="fa fa-bars"></i>
            </button>
            <ul className="menu">
              <li className="menu-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Homeee
                </Link>
              </li>
              <li className="menu-item">
                <Link className="nav-link" to="/MovieList">
                  Movies
                </Link>
              </li>

              <li className="menu-item">
                <Link className="nav-link" to="/cart">
                  Cart
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </Link>
              </li>
              <li className="menu-item">
                <Link className="nav-link" to="/cart">
                  wishlist
                  <span className="top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart.length}
                  </span>
                </Link>
              </li>
            </ul>

            {/* <form action="#" className="search-form">
							<input type="text" placeholder="Search..."/>
							<button><i className="fa fa-search"></i></button>
						</form> */}
          </div>

          <div className="mobile-navigation"></div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
