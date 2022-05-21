import React from "react";
import styles from "./footer.module.css";
import logo from "../../../images/2020-02-13-removebg-preview.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.footerMain}>
        <div className={styles.company}>
          <img src={logo} alt="logo-thc-solutions"></img>
          <span>THC SOLUTIONS </span>
        </div>
        <div className={styles.right}>
          <div className={styles.details}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icons} />
            <p>10330 Yonge St unit 1, Richmond Hill, ON L4C 5N1</p>
          </div>
          <div className={styles.details}>
            <FontAwesomeIcon icon={faPhoneAlt} className={styles.icons} />
            <p> 647-866-7740 </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
