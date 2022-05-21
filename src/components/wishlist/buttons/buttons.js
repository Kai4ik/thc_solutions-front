import React, { useContext, useEffect, useState } from "react";
import styles from "./buttons.module.css";
import Cookies from "js-cookie";
import { UserContext } from "../../../context/userState";
import { addToCart } from "../../helperFunctions/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import addedToCart from "../../products/products-main/imgs/addedToCart.png";

export const Buttons = (props) => {
  const { verifyUser, updateUser } = useContext(UserContext);
  const [removedItem, setRemovedItem] = useState({});
  const [chosenOption, setChosenOption] = useState(null);

  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  /* ------ functions needed to remove item ------ */
  //function to remove product from wishlistProducts array
  const removeProduct = () => {
    const index = props.wishlistProducts.findIndex(
      (elem) => elem.product._id === removedItem._id
    );
    if (index > -1) {
      props.wishlistProducts.splice(index, 1);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Object.keys(removedItem).length !== 0) {
      if (Cookies.get("token")) {
        verifyUser().then((response) => {
          const cartProducts = response.data.user.cartProducts;
          const transactions = response.data.user.transactions;
          if (removeProduct()) {
            updateUser(cartProducts, props.wishlistProducts, transactions);
            props.fillProducts();
          }
        });
      } else {
        if (removeProduct())
          localStorage.setItem(
            "wishlistProducts",
            JSON.stringify(props.wishlistProducts)
          );
        props.setWishlistProducts([
          ...JSON.parse(localStorage.getItem("wishlistProducts")),
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedItem]);

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
    <div className={styles.buttons}>
      <div
        className={styles.shopIcons}
        onClick={() => setRemovedItem(props.product)}
        title="Remove from wishlist"
      >
        <FontAwesomeIcon icon={faTrash} />
      </div>
      <div
        className={styles.shopIcons}
        id={styles.shopCart}
        title={
          checkProduct(props.cartProducts, props.product) === -1
            ? "Add to shopping cart"
            : "In your shopping bag"
        }
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
        }}
      >
        {checkProduct(props.cartProducts, props.product) === -1 ? (
          <>
            <img
              src={addedToCart}
              id={styles.addedToCart}
              alt="Added to cart"
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
      <div className={styles.price}>${props.product.price}</div>
    </div>
  );
};
