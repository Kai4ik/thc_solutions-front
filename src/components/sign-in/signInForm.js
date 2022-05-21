import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import { Loading } from "../loading/loading";
import LoadingOverlay from "react-loading-overlay";
import styles from "./signInForm.module.css";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../context/userState";
import { NavigationBar } from "../navigationBar/navigationBar";
import { Notification } from "../notification/notification";

export const SignInPage = () => {
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cartProducts: [],
    wishlistProducts: [],
    transactions: [],
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const history = useHistory();
  const { addUser, resetError } = useContext(UserContext);

  const checkPassword = (regExp, elem) => {
    if (regExp.test(userData.password)) {
      $(elem).css("color", "#999e99");
      $("head").append(
        `<style>${elem}::before{background-color: #999e99 !important;}</style>`
      );
    } else {
      $(elem).css("color", "black");
      $("head").append(
        `<style>${elem}::before{background-color: #ed1414 !important;}</style>`
      );
    }
  };

  const checkFields = (RegExp, elem, warning) => {
    if (elem !== "") {
      RegExp.test(elem)
        ? $(warning).css("cssText", "display: none !important;")
        : $(warning).css("cssText", "display :block !important");
    } else {
      $(warning).css("cssText", "display: none !important;");
    }
  };

  useEffect(() => {
    checkPassword(/(?=.*[a-z])/, "#passwordOneLower");
    checkPassword(/(?=.*[A-Z])/, "#passwordOneUpper");
    checkPassword(/(?=.{8,}$)/, "#passwordLength");
    checkPassword(/(?=.*[0-9])/, "#passwordOneDigit");
    checkPassword(/(?=.*\W)/, "#passwordOneSpecChar");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData.password]);

  useEffect(() => {
    const nameRegExp = /^[a-z ,.'-]+$/i;
    const emailRegExp = /^([A-Za-z0-9_\-.])+@/;
    const passwordRegExp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    checkFields(nameRegExp, userData.fname, "#fnameCheck");
    checkFields(nameRegExp, userData.lname, "#lnameCheck");
    checkFields(emailRegExp, userData.email, "#emailCheck");
    if (
      emailRegExp.test(userData.email) &&
      nameRegExp.test(userData.fname) &&
      nameRegExp.test(userData.lname) &&
      passwordRegExp.test(userData.password)
    ) {
      $("#submitBtn").prop("disabled", false);
      setSubmitStatus("Ready to sign up");
    } else {
      $("#submitBtn").prop("disabled", true);
      setSubmitStatus("Fill out all the fields");
    }
    resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const handleChange = (event) => {
    let newUser = { ...userData };
    newUser[event.target.name] = event.target.value;
    setUserData(newUser);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    addUser(userData).then((result) => {
      setLoading(false);
      if (result) {
        history.push("/login", { success: true });
      } else {
        $("#notification").css("cssText", "display :block !important");
      }
    });
  };

  return (
    <LoadingOverlay
      active={loading}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(0, 0, 0, 0.8);",
        }),
      }}
      spinner={<Loading />}
    >
      <NavigationBar />
      <Notification
        title="Registration failed. User with this email already exists. Please try
            again!"
      />
      <div className={styles.signUp}>
        <div className={styles.signUpLeft}></div>
        <div className={styles.signUpForm}>
          <h2> CREATE ACCOUNT </h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                type="text"
                name="fname"
                value={userData.fname}
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
              <label htmlFor="fname" className={styles.labelName}>
                <span className={styles.content}> First Name </span>
              </label>
            </div>
            <h5
              className={styles.warning}
              style={{ display: "none" }}
              id="fnameCheck"
            >
              Digits and special characters are not allowed
            </h5>
            <div className={styles.field}>
              <input
                type="text"
                name="lname"
                value={userData.lname}
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
              <label htmlFor="lname" className={styles.labelName}>
                <span className={styles.content}> Last Name </span>
              </label>
            </div>
            <h5 className={styles.warning} id="lnameCheck">
              Digits and special characters are not allowed
            </h5>
            <div className={styles.field}>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
              <label htmlFor="email" className={styles.labelName}>
                <span className={styles.content}> Email </span>
              </label>
            </div>
            <h5 className={styles.warning} id="emailCheck">
              An email address must contain a single @
            </h5>
            <div className={styles.field}>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                autoComplete="off"
              ></input>
              <label htmlFor="password" className={styles.labelName}>
                <span className={styles.content}> Password </span>
              </label>
              <ul>
                <li className={styles.passwordRegExp} id="passwordOneLower">
                  One lowercase character
                </li>
                <li
                  className={[styles.passwordRegExp, styles.rightExp].join(" ")}
                  id="passwordOneUpper"
                >
                  One uppercase character
                </li>
                <li className={styles.passwordRegExp} id="passwordOneSpecChar">
                  One special Character
                </li>
                <li
                  className={[styles.passwordRegExp, styles.rightExp].join(" ")}
                  id="passwordOneDigit"
                >
                  One Number
                </li>
                <li className={styles.passwordRegExp} id="passwordLength">
                  8 characters minimum
                </li>
              </ul>
            </div>
            <input
              id="submitBtn"
              type="submit"
              value="REGISTER"
              disabled
              title={submitStatus}
            ></input>
          </form>
          <p>
            Already member?
            <Link to="/login" className={styles.nav}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </LoadingOverlay>
  );
};
