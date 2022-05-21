import React from "react";
import { Buttons } from "../buttons/buttons";
import { useHistory } from "react-router-dom";
import styles from "./productCard.module.css";

export const ProductCard = (props) => {
  const history = useHistory();

  return (
    <div className={styles.product}>
      <div className={styles.imgWrapper}>
        <img src={props.elem.product.image[0]} alt="productImage"></img>
      </div>
      <div className={styles.productInfo}>
        <Buttons
          product={props.elem.product}
          inCartProducts={props.inCartProducts}
          wishlistProducts={props.wishlistProducts}
          updateLocalStorage={props.updateLocalStorage}
          updateUsersDb={props.updateUsersDb}
        />
        <h3
          className={styles.productName}
          onClick={() => {
            history.push(`/product/${props.elem.product._id}`);
          }}
        >
          {props.elem.product.title}
        </h3>
        <h3 className={styles.productPrice}>${props.elem.price}</h3>
        <input
          type="number"
          className={styles.productQty}
          min="1"
          value={props.elem.qty}
          onChange={(e) => props.chgQty(e, props.elem)}
        />
      </div>
    </div>
  );
};
