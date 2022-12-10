import React from "react";
import Hero from "./Hero";
import WishlistAd from "./WishlistAd";
import ItemAd from "./ItemAd";
import styles from "../style";

const Homepage = () => {
  return (
    <section>
      <div>
        <Hero />
      </div>

      <WishlistAd />
      <ItemAd />
    </section>
  );
};

export default Homepage;
