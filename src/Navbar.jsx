import React from "react";

import { FaCartPlus } from "react-icons/fa";
import { useGlobalContext } from "./AppContext";

const Navbar = () => {
  const {
    state: { amount },
  } = useGlobalContext();

  return (
    <>
      <nav className="navbar">
        <a href="#" className="logo">
          <h1>Mobile Shop</h1>
        </a>

        <div className="cart">
          <span className="cart__icon">
            <FaCartPlus />
          </span>
          <h2 className="cart__total">{amount}</h2>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
