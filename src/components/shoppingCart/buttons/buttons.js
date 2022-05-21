import React, { useEffect, useState, useContext } from "react";
import styles from "./buttons.module.css";
import Cookies from "js-cookie";
import { UserContext } from "../../../context/userState";
import { addToWishlist } from "../../helperFunctions/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";

export const Buttons = (props) => {
  const { verifyUser, updateUser } = useContext(UserContext);
  const [removedItem, setRemovedItem] = useState({});

  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  const findProductIndex = () => {
    return props.inCartProducts.findIndex(
      (elem) => elem.product._id === removedItem._id
    );
  };

  //function to remove product from inCartProducts array
  const removeProduct = () => {
    if (findProductIndex() > -1) {
      props.inCartProducts.splice(findProductIndex(), 1);
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Object.keys(removedItem).length !== 0) {
      if (Cookies.get("token")) {
        verifyUser().then((response) => {
          if (removeProduct()) props.updateUsersDb(response);
        });
      } else {
        if (removeProduct()) props.updateLocalStorage();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedItem]);

  return (
    <>
      <FontAwesomeIcon
        icon={faTimes}
        className={styles.delete}
        onClick={() => setRemovedItem(props.product)}
      />
      <FontAwesomeIcon
        icon={faHeart}
        className={[
          styles.wishlist,
          checkProduct(props.wishlistProducts, props.product) === -1
            ? ""
            : styles.inWishlist,
        ].join(" ")}
        onClick={(e) => {
          addToWishlist(
            e,
            props.product,
            verifyUser,
            updateUser,
            styles.inWishlist
          );
        }}
      />
    </>
  );
};
