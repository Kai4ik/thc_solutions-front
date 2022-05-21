import React from "react";
import $ from "jquery";
let totalToPay = 0;
let setReadyToPay = null;
let setLoadingFalse = null;
let notificationText = null;

const config = {
  // Initialize the payment form elements
  //TODO: Replace with your sandbox application ID
  applicationId: "sandbox-sq0idb-87fDyj31bHGZESnJdGc-KA",
  inputClass: "sq-input",
  autoBuild: false,
  // Customize the CSS for SqPaymentForm iframe elements
  inputStyles: [
    {
      fontSize: "16px",
      lineHeight: "24px",
      padding: "16px",
      placeholderColor: "#a0a0a0",
      backgroundColor: "transparent",
    },
  ],
  // Initialize the credit card placeholders
  cardNumber: {
    elementId: "sq-card-number",
    placeholder: "Card Number",
  },
  cvv: {
    elementId: "sq-cvv",
    placeholder: "CVV",
  },
  expirationDate: {
    elementId: "sq-expiration-date",
    placeholder: "MM/YY",
  },
  postalCode: {
    elementId: "sq-postal-code",
    placeholder: "Postal",
  },
  // SqPaymentForm callback functions
  callbacks: {
    /* Triggered when: SqPaymentForm completes a card nonce request */
    cardNonceResponseReceived: function (errors, nonce, cardData) {
      const errorList = document.getElementById("errors");
      if (errors) {
        let error_html = "";
        for (var i = 0; i < errors.length; i++) {
          error_html += "<li> " + errors[i].message + " </li>";
        }
        errorList.innerHTML = error_html;
        errorList.style.display = "inline-block";
        setLoadingFalse(false);
        return errors;
      }
      errorList.style.display = "none";
      errorList.innerHTML = "";

      function uuidv4() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          function (c) {
            var r = (Math.random() * 16) | 0,
              v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          }
        );
      }
      const idempotency_key = uuidv4();

      fetch("http://localhost:5000/process-payment", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nonce: nonce,
          idempotency_key: idempotency_key,
          total: totalToPay,
        }),
      })
        .catch((err) => {
          alert("Network error: " + err);
        })
        .then((response) => {
          if (!response.ok) {
            return response
              .json()
              .then((errorInfo) => Promise.reject(errorInfo));
          }
          return response.json();
        })
        .then((data) => {
          setReadyToPay(true);
        })
        .catch((err) => {
          setLoadingFalse(false);
          notificationText("Payment failed to complete!");
          $("#notification").css("cssText", "display :block !important");
        });
    },
  },
};

export const Square = ({
  paymentForm,
  total,
  setReadyToSubmit,
  setLoading,
  setNotificationText,
}) => {
  paymentForm = new paymentForm(config);
  paymentForm.build();
  setReadyToPay = setReadyToSubmit;
  setLoadingFalse = setLoading;
  notificationText = setNotificationText;
  const requestCardNonce = (e) => {
    paymentForm.requestCardNonce();
  };
  totalToPay = total;

  return (
    <div id="form-container">
      <div id="sq-card-number"></div>
      <div className="third" id="sq-expiration-date"></div>
      <div className="third" id="sq-cvv"></div>
      <div className="third" id="sq-postal-code"></div>
      <button
        id="sq-creditcard"
        className="button-credit-card"
        onClick={requestCardNonce}
      >
        Pay Now
      </button>
      <ul id="errors" className="error" style={{ display: "none" }}></ul>
    </div>
  );
};
