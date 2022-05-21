import React, { useEffect, useState, useContext } from "react";
import styles from "./buttons.module.css";
import { addToCart, addToWishlist } from "../../helperFunctions/helper";
import { UserContext } from "../../../context/userState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faHeart,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

export const Buttons = (props) => {
  const { verifyUser, updateUser } = useContext(UserContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const fillProducts = async () => {
    if (Cookies.get("token")) {
      await verifyUser().then((response) => {
        const cartProducts = response.data.user.cartProducts;
        const wishlistProducts = response.data.user.wishlistProducts;
        setCartProducts([...cartProducts]);
        setWishlist([...wishlistProducts]);
      });
    } else {
      const cartProducts = localStorage.getItem("inCartProducts")
        ? JSON.parse(localStorage.getItem("inCartProducts"))
        : [];
      const wishlist = localStorage.getItem("wishlistProducts")
        ? JSON.parse(localStorage.getItem("wishlistProducts"))
        : [];
      setCartProducts([...cartProducts]);
      setWishlist([...wishlist]);
    }
  };

  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  useEffect(() => {
    fillProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.buttons}>
      <button
        className={
          checkProduct(wishlist, props.product) === -1
            ? styles.wishlistIcon
            : styles.inWishlist
        }
        onClick={(e) => {
          addToWishlist(
            e,
            props.product,
            verifyUser,
            updateUser,
            styles.random
          );
          fillProducts();
        }}
      >
        <FontAwesomeIcon
          icon={faHeart}
          className={
            checkProduct(wishlist, props.product) === -1
              ? styles.likeIcon
              : styles.likeIconActive
          }
        />
      </button>
      <button
        className={
          checkProduct(cartProducts, props.product) === -1
            ? styles.addBtn
            : styles.addedToCart
        }
        onClick={(e) => {
          addToCart(
            e,
            props.product,
            props.chosenOption,
            props.chosenPrice,
            verifyUser,
            updateUser,
            styles.random
          );
          fillProducts();
        }}
      >
        <>
          {checkProduct(cartProducts, props.product) !== -1 && (
            <FontAwesomeIcon icon={faCheck} className={styles.check} />
          )}
          {checkProduct(cartProducts, props.product) === -1 ? (
            <p>Add to cart </p>
          ) : (
            <p className={styles.added}>Added to cart</p>
          )}
          {checkProduct(cartProducts, props.product) === -1 && (
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={styles.cartIcon}
            />
          )}
        </>
      </button>
      <button
        className={[styles.addBtn, styles.addToWishlist].join(" ")}
        id={styles.wishlistBtn}
        onClick={(e) => {
          addToWishlist(
            e,
            props.product,
            verifyUser,
            updateUser,
            styles.random
          );
          fillProducts();
        }}
      >
        {checkProduct(wishlist, props.product) === -1 ? (
          <>
            <p>Add to wishlist</p>
            <FontAwesomeIcon icon={faHeart} className={styles.heartIcon} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faCheck} className={styles.check} />
            <p className={styles.added}> added to wishlist</p>
          </>
        )}
      </button>
    </div>
  );
};
