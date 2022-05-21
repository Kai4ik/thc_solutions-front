import React from "react";
import { Link } from "react-router-dom";
import styles from "./emptyState.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export const EmptyState = (props) => {
  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faShoppingCart} className={styles.cartIcon} />
      <p> Your {props.title} is empty. Keep shopping! </p>
      <Link to="/products" className={styles.btn}>
        <button> Keep Shopping</button>
      </Link>
    </div>
  );
};
