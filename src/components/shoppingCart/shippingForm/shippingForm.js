import React, { useState } from "react";
import styles from "./shippingForm.module.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const ShippingForm = () => {
  const [shippingInfo, setShippingInfo] = useState({
    Street: "",
    Apt: "",
    ZipCode: "",
    City: "",
    Province: "",
    PhoneNumber: "",
  });

  const handleChange = (event) => {
    let newShippingData = { ...shippingInfo };
    newShippingData[event.target.name] = event.target.value;
    setShippingInfo(newShippingData);
  };

  const handleNumber = (event) => {
    let newShippingData = { ...shippingInfo };
    newShippingData["PhoneNumber"] = event;
    setShippingInfo(newShippingData);
  };

  return (
    <div className={styles.form}>
      <h4 className={styles.fieldSet}> Shipping Information </h4>
      <input
        type="text"
        name="Street"
        placeholder="Street Address"
        value={shippingInfo.Street}
        onChange={handleChange}
        className={styles.street}
        required
      />
      <input
        type="text"
        name="Apt"
        placeholder="Apt, Suite, Bldg"
        value={shippingInfo.Apt}
        onChange={handleChange}
        className={styles.city}
        required
      />
      <input
        type="text"
        name="ZipCode"
        placeholder="Postal / Zip Code"
        maxLength="7"
        value={shippingInfo.ZipCode}
        onChange={handleChange}
        className={styles.state}
        required
      />
      <input
        type="text"
        name="City"
        placeholder="City"
        value={shippingInfo.City}
        onChange={handleChange}
        className={styles.city}
        required
      />
      <input
        type="text"
        name="Province"
        placeholder="State / Province"
        value={shippingInfo.Province}
        onChange={handleChange}
        className={styles.state}
        required
      />
      <PhoneInput country={"us"} onChange={handleNumber} name="PhoneNumber" />
      <input
        type="text"
        name="PhoneNumber"
        value={shippingInfo.PhoneNumber}
        className={styles.invisible}
        readOnly
      />
      <h4 className={styles.fieldSet}> Payment Information </h4>
    </div>
  );
};
