import React from "react";

import { useGlobalContext } from "./AppContext";
import CartItems from "./CartItems";

const CartContainer = () => {
  const {
    state: { cart, total },
    clearAll,
  } = useGlobalContext();
  // console.log(cart);

  if (cart.length === 0) {
    return (
      <section className="empty__container">
        <h2 className="empty__title">your bag</h2>
        <p className="empty__paragraph">is currently empty</p>
      </section>
    );
  }

  return (
    <>
      <main className="cart__container">
        <h2 className="cart__text">your bag</h2>

        <section className="cart__items">
          {cart.map((item) => {
            return <CartItems key={item.id} {...item} />;
          })}
        </section>
        <hr className="underline" />
        <div className="main__total">
          <h2 className="total__text">Total</h2>
          <p className="amount">₹ {total}</p>
        </div>

        <button className="btn btn--clear" onClick={clearAll}>
          clear cart
        </button>
      </main>
    </>
  );
};

export default CartContainer;
