import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGlobalContext } from "./AppContext";
const CartItems = ({ id, price, img, amount, title }) => {
  const { removeCard, increase, decrease } = useGlobalContext();

  return (
    <>
      <article className="card">
        <img src={img} alt={title} className="card__image" />
        <div className="card__content">
          <h2 className="card__title">{title}</h2>
          <p className="card__price"> ₹ {price}</p>
          <button className="btn btn--remove" onClick={() => removeCard(id)}>
            remove
          </button>
        </div>
        <div className="card__buttons">
          <button className="btn btn--up" onClick={() => increase(id)}>
            <FaAngleUp />
          </button>

          <h2 className="card__quantity">{amount}</h2>

          <button className="btn btn--down" onClick={() => decrease(id)}>
            <FaAngleDown />
          </button>
        </div>
      </article>
    </>
  );
};

export default CartItems;
