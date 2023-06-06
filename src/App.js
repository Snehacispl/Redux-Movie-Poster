import "./App.css";
import Home from "./components/Home";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./components/store/store";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import ThankYou from "./components/ThankYou";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/MovieList" element={<MovieList />} />

            <Route path="/MovieDetails/:id" element={<MovieDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/Thank-you" element={<ThankYou />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
