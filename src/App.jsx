import { HashRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";

import Layout from "./layouts/layout/Layout";

import Home from "./pages/Home/home";
import Todo from "./pages/To-Do/Todo";
import Calculator from "./pages/calculator/calculator";
import Animation from "./pages/animation/animation";
import Componant from "./pages/componant/componant";
import Product from "./pages/products/Product";
import Cart from "./pages/carts/Cart";
import Login from "./pages/Login/Login";

import "./App.css";
import { fetchProduct } from "./datas/products";

const initpage = "home";

function App() {
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  const [token, setToken] = useState("x");

  const [tab, setTab] = useState("");

  useEffect(() => {
    setTab(initpage);
    setProducts(fetchProduct());
  }, []); // only in first loaded

  useEffect(() => {
    console.log(products);
  }, [products]);

  if (token === "") {
    return <Login setToken={setToken} />;
  } else {
    return (
      <div className="App-container">
        <HashRouter>
          <Routes>
            <Route
              element={
                <Layout
                  tab={tab}
                  setTab={setTab}
                  products={products}
                  carts={carts}
                  setToken={setToken}
                />
              }
            >
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/animation" element={<Animation />} />
              <Route path="/componant" element={<Componant />} />
              <Route
                path="/product"
                element={
                  <Product
                    products={products}
                    carts={carts}
                    setCarts={setCarts}
                  />
                }
              />
              <Route
                path="/cart"
                element={<Cart carts={carts} setCarts={setCarts} />}
              />
            </Route>
          </Routes>
        </HashRouter>
      </div>
    );
  }
}

export default App;
