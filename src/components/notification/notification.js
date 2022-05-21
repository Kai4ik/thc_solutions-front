import React from "react";
import $ from "jquery";
import styles from "./notification.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Notification = (props) => {
  const closePopUp = () => {
    $("#notification").css("cssText", "display :none !important");
  };

  return (
    <div className={styles.notification} id="notification">
      <div className={styles.center}>
        <h1> {props.title}</h1>
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.closeBtn}
          onClick={closePopUp}
        />
      </div>
    </div>
  );
};
