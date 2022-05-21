import React, { useContext, useEffect } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import styles from "./productCard.module.css";
import { ProductContext } from "../../../../context/productsState";
import { UserContext } from "../../../../context/userState";
import { useHistory } from "react-router-dom";
import { ShopButtons } from "../shopButtons/cartIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { addToWishlist } from "../../../helperFunctions/helper";
import { WishlistIcon } from "../inWishlist/inWishlist";

export const ProductCard = (props) => {
  const history = useHistory();
  const { verifyUser, updateUser } = useContext(UserContext);
  const { saveCurrentFilters } = useContext(ProductContext);
  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  const hoverEffect = (e) => {
    $(e.currentTarget)
      .children(".details")
      .children(".icons")
      .css("left", "100px");
  };

  const leaveEffect = (e) => {
    $(e.currentTarget)
      .children(".details")
      .children(".icons")
      .css("left", "140px");
  };

  useEffect(() => {
    saveCurrentFilters(
      props.chosenCategory,
      props.chosenSubcategory,
      props.chosenBrand
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.chosenCategory, props.chosenSubcategory, props.chosenBrand]);

  return (
    <div
      className={styles.card}
      key={props.product._id}
      onPointerOver={hoverEffect}
      onPointerLeave={leaveEffect}
    >
      <div
        className={styles.productImg}
        onClick={() => {
          history.push(`/product/${props.product._id}`);
        }}
      >
        {props.product.new && <p className={styles.new}> NEW </p>}
        <p className={styles.phonePrice}>${props.product.price}</p>
        <img src={props.product.image[0]} alt="productImage"></img>
      </div>
      <div className={styles.productCategory}>
        {props.product.category} / {props.product.subcategory}
      </div>
      <ShopButtons
        product={props.product}
        cartProducts={props.inCartProducts}
        checkProducts={props.checkProducts}
        wishlistProducts={props.wishlistProducts}
      />
      <div className={[styles.details, "details"].join(" ")}>
        <div
          className={styles.productTitle}
          onClick={() => {
            history.push(`/product/${props.product._id}`);
          }}
        >
          {props.product.title}
        </div>
        <div className={styles.buttons}>
          <div className={styles.productBtn}>${props.product.price}</div>
          <div
            className={styles.productBtn}
            id={styles.details}
            onClick={() => {
              history.push(`/product/${props.product._id}`);
            }}
          >
            Details
          </div>
        </div>
      </div>
      <div
        className={styles.wishlistIcon}
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
        {checkProduct(props.wishlistProducts, props.product) === -1 ? (
          <FontAwesomeIcon icon={faHeart} />
        ) : (
          <WishlistIcon />
        )}
      </div>
    </div>
  );
};
