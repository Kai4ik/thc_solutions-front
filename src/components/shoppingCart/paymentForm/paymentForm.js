import React from "react";
import styles from "./paymentForm.module.css";
import { Square } from "../square";
import { ShippingForm } from "../shippingForm/shippingForm";

export const PaymentForm = (props) => {
  return (
    <>
      <div className={styles.cartTotal}>
        <div className={styles.checkoutInfo}>
          <p>Cart Subtotal</p> ${props.total.toFixed(2)}
        </div>
        <div className={styles.checkoutInfo}>
          <p>Taxes</p> ${((props.total / 100) * 13).toFixed(2)}
        </div>
        <div className={[styles.checkoutInfo, styles.checkoutTotal].join(" ")}>
          <p>Total</p> ${(props.total + (props.total / 100) * 13).toFixed(2)}
        </div>
        {!props.readyToPay ? (
          <button
            type="button"
            className={styles.checkoutBtn}
            onClick={props.sendEmail}
          >
            Proceed to checkout
          </button>
        ) : null}
      </div>
      <input
        type="text"
        name="Total"
        value={`$${(props.total + (props.total / 100) * 13).toFixed(2)}`}
        className={styles.formField}
        readOnly
      />
      {props.readyToPay ? (
        <>
          <ShippingForm />
          <Square
            paymentForm={window.SqPaymentForm}
            total={(props.total + (props.total / 100) * 13).toFixed(2)}
            setReadyToSubmit={props.setReadyToSubmit}
            setLoading={props.setLoading}
            setNotificationText={props.setNotificationText}
          />
        </>
      ) : null}
    </>
  );
};
