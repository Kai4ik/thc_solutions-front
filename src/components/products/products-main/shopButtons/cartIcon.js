import React, { useContext, useState, useEffect } from "react";
import styles from "./cartIcon.module.css";
import { UserContext } from "../../../../context/userState";
import { addToCart, addToWishlist } from "../../../helperFunctions/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faHeart } from "@fortawesome/free-solid-svg-icons";
import addedToCart from "../imgs/addedToCart.png";
import Cookies from "js-cookie";

export const ShopButtons = (props) => {
  const { verifyUser, updateUser } = useContext(UserContext);
  const [chosenOption, setChosenOption] = useState(null);
  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  useEffect(() => {
    if (props.product.options) {
      let optionTitle = null;
      props.product.options.forEach((option) => {
        if (props.product.price === option.price) optionTitle = option.title;
      });
      setChosenOption(optionTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={[styles.shopIcons, "icons"].join(" ")}
        id={styles.shopCart}
        title="Add to shopping cart"
        onClick={(e) => {
          addToCart(
            e,
            props.product,
            chosenOption,
            props.product.price,
            verifyUser,
            updateUser,
            styles.added
          );
          props.checkProducts();
        }}
      >
        {checkProduct(props.cartProducts, props.product) === -1 ? (
          <>
            <img
              src={addedToCart}
              id={styles.addedToCart}
              alt="Add to cart"
            ></img>
            <FontAwesomeIcon icon={faShoppingCart} id={styles.cartAnimation} />
          </>
        ) : (
          <img
            src={addedToCart}
            className={styles.inCartProduct}
            alt="Added to cart"
          ></img>
        )}
      </div>
      <div
        className={[
          styles.shopIcons,
          checkProduct(props.wishlistProducts, props.product) === -1
            ? ""
            : styles.inWishlist,
          "icons",
        ].join(" ")}
        id={styles.wishlist}
        onClick={(e) => {
          addToWishlist(
            e,
            props.product,
            verifyUser,
            updateUser,
            styles.inWishlist
          );
          props.checkProducts();
        }}
      >
        <FontAwesomeIcon icon={faHeart} />
      </div>
    </>
  );
};
