import "./App.css";
import MovieList from "./components/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./components/store/store";
import Cart from "./components/Cart";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Provider>
    </div>
  );
}

export default App;
