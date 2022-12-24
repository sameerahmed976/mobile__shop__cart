import React, { createContext, useContext, useEffect, useReducer } from "react";
const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const reducer = (state, action) => {
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "CLEAR") {
    return { ...state, cart: [] };
  }
  if (action.type === "DISPLAY__ITEMS") {
    // console.log(action.payload);
    return { ...state, loading: false, cart: action.payload };
  }
  if (action.type === "REMOVE") {
    const newItem = state.cart.filter((item) => {
      // console.log(action);

      return item.id !== action.payload;
    });

    // console.log(newItem);
    return { ...state, cart: newItem };
  }
  if (action.type === "INCREASE") {
    let newItem = state.cart.map((item) => {
      if (item.id === action.payload) {
        item = { ...item, amount: item.amount + 1 };
      }
      return item;
    });

    // console.log(newItem);
    return { ...state, cart: newItem };
  }
  if (action.type === "DECREASE") {
    let newItem = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          item = { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);

    // console.log(newItem);
    return { ...state, cart: newItem };
  }
  if (action.type === "GET__TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      { total: 0, amount: 0 }
    );

    total = parseFloat(total.toFixed(2));

    return { ...state, amount, total };
  }
};

const ContextProvider = createContext();
const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      dispatch({ type: "LOADING" });
      const response = await fetch(url);
      const cart = await response.json();
      // console.log(`* ~ file: AppContext.jsx:34 ~ fetchData ~ data`, cart);
      dispatch({ type: "DISPLAY__ITEMS", payload: cart });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const removeCard = (id) => {
    // console.log(id);
    dispatch({ type: "REMOVE", payload: id });
  };
  const increase = (id) => {
    // console.log(id);
    dispatch({ type: "INCREASE", payload: id });
  };
  const decrease = (id) => {
    // console.log(id);
    dispatch({ type: "DECREASE", payload: id });
  };
  const clearAll = () => {
    // console.log(id);
    dispatch({ type: "CLEAR" });
  };

  useEffect(() => {
    dispatch({ type: "GET__TOTAL" });
  }, [state.cart]);

  return (
    <ContextProvider.Provider
      value={{
        state,
        dispatch,
        initialState,
        removeCard,
        increase,
        decrease,
        clearAll,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(ContextProvider);
};

export default AppContext;
