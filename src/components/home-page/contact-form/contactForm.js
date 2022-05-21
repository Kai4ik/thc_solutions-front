import React, { useEffect, useState } from "react";
import $ from "jquery";
import { useForm } from "@formspree/react";
import styles from "./contactForm.module.css";
import phoneCall from "../../../images/phone-call.svg";
import email from "../../../images/mail.svg";
import mapPin from "../../../images/map-pin.svg";
import clock from "../../../images/clock.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const ContactForm = () => {
  const [state, handleSubmit] = useForm("mzbkngol");
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  const checkFields = (RegExp, elem, warning) => {
    if (elem !== "") {
      RegExp.test(elem)
        ? $(warning).css("cssText", " border-bottom: 2px solid #108690;")
        : $(warning).css("cssText", " border-bottom: 2px solid red;");
    } else {
      $(warning).css(
        "cssText",
        "border-bottom: 2px solid rgba(255, 255, 255, 0.4);"
      );
    }
  };

  useEffect(() => {
    const nameRegExp = /^[a-z ,.'-]+$/i;
    const emailRegExp = /^([A-Za-z0-9_\-.])+@/;
    checkFields(nameRegExp, userData.fname, "#fnameCheck");
    checkFields(nameRegExp, userData.lname, "#lnameCheck");
    checkFields(emailRegExp, userData.email, "#emailCheck");
    if (
      emailRegExp.test(userData.email) &&
      nameRegExp.test(userData.fname) &&
      nameRegExp.test(userData.lname)
    ) {
      $("#submitBtn").prop("disabled", false);
      setSubmitStatus("Ready to sign up");
    } else {
      $("#submitBtn").prop("disabled", true);
      setSubmitStatus("Fill out all the fields");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleChange = (event) => {
    let newUser = { ...userData };
    newUser[event.target.name] = event.target.value;
    setUserData(newUser);
  };

  const handleNumber = (event) => {
    let newUser = { ...userData };
    newUser["phoneNumber"] = event;
    setUserData(newUser);
  };

  const handleForm = () => {
    const newUser = {
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      message: "",
    };
    setUserData(newUser);
  };

  return (
    <section id="contactForm" className={styles.form}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.svg}
      >
        <path
          fill="white"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className={styles.col2}>
        <div id={styles.container}>
          <div className={styles.contactInfo}>
            <h4> Contact Information </h4>
            <p> Fill up the form and we will get back to you</p>
            <div className={styles.block}>
              <div className={styles.iconText}>
                <img
                  src={phoneCall}
                  className={styles.icons}
                  alt="Phone Call Icon"
                ></img>
                <span> 647-866-7749 </span>
              </div>
              <div className={[styles.iconText, styles.rightBlock].join(" ")}>
                <img
                  src={email}
                  className={styles.icons}
                  alt="Email Icon"
                ></img>
                <span> info@thcsolutions.online </span>
              </div>
            </div>
            <div className={styles.block}>
              <div className={styles.iconText}>
                <img
                  src={mapPin}
                  className={styles.icons}
                  alt="Map Pin Icon"
                ></img>
                <span> 10330 Yonge St. Unit 1, Richmond Hill, ON L4C 5N1 </span>
              </div>
              <div className={[styles.iconText, styles.rightBlock].join(" ")}>
                <img
                  src={clock}
                  className={styles.icons}
                  alt="Working Hours"
                ></img>
                <span>
                  <div className={styles.days}>Mon-Fri:</div>
                  9am - 6pm <br />
                  <div className={styles.days}>Saturday:</div>
                  12 - 4pm <br />
                  <div className={styles.days}>Sunday:</div>
                  closed
                </span>
              </div>
            </div>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
              handleForm();
            }}
            id="contactForm"
          >
            <div className={styles.formCol}>
              <div className={styles.formField}>
                <label htmlFor="fname"> First Name </label>
                <input
                  id="fnameCheck"
                  type="text"
                  name="fname"
                  value={userData.fname}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="lname"> Last Name </label>
                <input
                  id="lnameCheck"
                  type="text"
                  name="lname"
                  value={userData.lname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className={styles.formCol}>
              <div className={styles.formField}>
                <label htmlFor="email"> Email </label>
                <input
                  id="emailCheck"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formField}>
                <label htmlFor="phoneNumber"> Phone number </label>
                <PhoneInput
                  country={"ca"}
                  onChange={handleNumber}
                  value={userData.phoneNumber}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  className={styles.invisible}
                  readOnly
                />
              </div>
            </div>
            <div className={styles.formCol}>
              <div className={styles.formField}>
                <label htmlFor="message"> Message </label>
                <textarea
                  name="message"
                  value={userData.message}
                  onChange={handleChange}
                  placeholder="Your message"
                ></textarea>
              </div>
            </div>
            <div className={styles.formCol}>
              <div className={styles.formField} id={styles.submitField}>
                <button
                  id="submitBtn"
                  disabled
                  title={submitStatus}
                  className={styles.submitBtn}
                >
                  Send message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
