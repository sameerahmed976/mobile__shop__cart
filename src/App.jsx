import React from "react";
import { useGlobalContext } from "./AppContext";
import CartContainer from "./CartContainer";
import Navbar from "./Navbar";

const App = () => {
  const {
    state: { loading },
  } = useGlobalContext();
  // console.log(`* ~ file: App.jsx:7 ~ App ~ loading`, loading);

  if (loading) {
    return (
      <main className="main__loading">
        <h2 className="loading">Loading...</h2>
      </main>
    );
  }

  return (
    <>
      <Navbar />
      <CartContainer />
    </>
  );
};

export default App;
