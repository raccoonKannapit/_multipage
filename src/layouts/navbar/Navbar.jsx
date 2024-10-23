import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ tab, setTab, products, carts, setToken }) {
  return (
    <div className="navbar-container">
      <Link to="/home">
        <button
          className={
            "nav-button btn " + (tab === "home" ? " btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to="/calculator">
        <button
          className={
            "nav-button btn " +
            (tab === "calculator" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>

      <Link to="/animation">
        <button
          className={
            "nav-button btn " +
            (tab === "animation" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>

      <Link to="/componant">
        <button
          className={
            "nav-button btn " +
            (tab === "componant" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("componant")}
        >
          Componant
        </button>
      </Link>

      <Link to="/todo">
        <button
          className={
            "nav-button btn " + (tab === "todo" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("todo")}
        >
          Todo
        </button>
      </Link>

      <Link to="/product">
        <button
          className={
            "nav-button btn " + (tab === "product" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("product")}
        >
          Product({products.length})
        </button>
      </Link>

      <Link to="/cart">
        <button
          className={
            "nav-button position-relative btn " +
            (tab === "cart" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("cart")}
        >
          Cart{" "}
          {
            carts.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {carts.length < 10 ? carts.length : "9+"}
                <span className="visually-hidden">unread messages</span>
              </span>
            )

            // : carts.length < 100
            // ? carts.length
            // : "99+"
          }
        </button>
      </Link>

      <button
      style={{margin : "0 0.5rem"}}
          className={
            "nav-button btn " + (tab === "logout" ? "btn-danger" : "btn-outline-danger")
          }
          onClick={() => {setToken('')}}
        >
          Logout
        </button>

    </div>
  );
}

export default Navbar;
