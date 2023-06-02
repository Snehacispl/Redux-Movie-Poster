import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" href="#">
              Ecomm-Movie-Poster
            </Link>
            <Link className="nav-link" to="/">
              MovieList
            </Link>
            <Link className="nav-link" to="/cart">
              <span className="position-relative">
                Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cart.length}
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>  */}
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
                  Home
                </Link>
              </li>
              <li className="menu-item">
                <Link className="nav-link" to="/MovieList">
                  Movies
                </Link>
              </li>
              {/* <li className="menu-item">
                <Link className="nav-link"  to="/MovieDetail">
                  Movies Details
                </Link>
              </li> */}
              {/* <li className="menu-item">
                <Link className="nav-link"  to="/contact">
                  Contact
                </Link>
              </li> */}
              <li className="menu-item">
                <Link className="nav-link" to="/cart">
                  Cart
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
