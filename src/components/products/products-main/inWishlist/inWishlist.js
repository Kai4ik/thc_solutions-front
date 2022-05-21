import React from "react";
import styles from "./inWishlist.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const WishlistIcon = () => {
  return <FontAwesomeIcon icon={faHeart} className={styles.addedToWishlist} />;
};
