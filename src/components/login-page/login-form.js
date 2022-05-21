import React, { useState, useContext, useEffect } from "react";
import $ from "jquery";
import styles from "./login-form.module.css";
import { Loading } from "../loading/loading";
import { NavigationBar } from "../navigationBar/navigationBar";
import { Link, useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../../context/userState";
import { ProductContext } from "../../context/productsState";
import LoadingOverlay from "react-loading-overlay";

export const LoginPage = () => {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const history = useHistory();
  let { checkUser, loginError, verifyUser, updateUser } = useContext(
    UserContext
  );
  const { saveCurrentFilters } = useContext(ProductContext);
  const location = useLocation();
  const parameter = location.state ? location.state.success : null;

  const handleChange = (event) => {
    let newUser = { ...userData };
    newUser[event.target.name] = event.target.value;
    setUserData(newUser);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    checkUser(userData).then((result) => {
      setLoading(false);
      if (result) {
        verifyUser().then((response) => {
          const tempWishlist = response.data.user.wishlistProducts;
          const tempCart = response.data.user.cartProducts;
          const tempTransactions = response.data.user.transactions;
          const tempCartLocalStorage = localStorage.getItem("inCartProducts")
            ? JSON.parse(localStorage.getItem("inCartProducts"))
            : [];
          const tempWishlistLocalStorage = localStorage.getItem(
            "wishlistProducts"
          )
            ? JSON.parse(localStorage.getItem("wishlistProducts"))
            : [];
          tempCartLocalStorage.forEach((elem) => {
            const index = tempCart.findIndex(
              (product) => product.product === elem.product._id
            );
            if (index === -1) {
              tempCart.push(elem);
            }
          });
          tempWishlistLocalStorage.forEach((elem) => {
            const index = tempWishlist.findIndex(
              (product) => product.product === elem.product._id
            );
            if (index === -1) {
              tempWishlist.push(elem);
            }
          });
          updateUser(tempCart, tempWishlist, tempTransactions);
          localStorage.removeItem("wishlistProducts");
          localStorage.removeItem("inCartProducts");
          history.push("/", { loginSuccess: true });
        });
      }
    });
  };

  const checkFields = (RegExp, elem, warning) => {
    if (elem !== "") {
      RegExp.test(elem)
        ? $("head").append(
            `<style>${warning}::after{border-bottom: 3px solid #108690 !important;}</style>`
          )
        : $("head").append(
            `<style>${warning}::after{border-bottom: 3px solid red!important;}</style>`
          );
    } else {
      $("head").append(
        `<style>${warning}::after{border-bottom: 3px solid #108690 !important;}</style>`
      );
    }
  };

  useEffect(() => {
    const emailRegExp = /^([A-Za-z0-9_\-.])+@/;
    const passwordRegExp = /(?=.{1,}$)/;
    checkFields(emailRegExp, userData.email, "#emailCheckRegExp");
    checkFields(passwordRegExp, userData.password, "#passwordCheckRegExp");
    if (
      emailRegExp.test(userData.email) &&
      passwordRegExp.test(userData.password)
    ) {
      $("#submitBtn").prop("disabled", false);
      setSubmitStatus("Ready to sign up");
    } else {
      $("#submitBtn").prop("disabled", true);
      setSubmitStatus("Fill out all the fields");
    }
    saveCurrentFilters("All Products", "", "All Brands");
    localStorage.setItem("perPage", 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <div>
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
        {parameter === true && (
          <div className={styles.notification} id="notification">
            <div className={styles.center}>
              <h1>Registration completed successfully!</h1>
            </div>
          </div>
        )}
        <div className={styles.login}>
          <div className={styles.loginForm}>
            <h2>
              Welcome Back!
              <p className={styles.details}>
                Enter your credentials to continue
              </p>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <input
                  type="text"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                ></input>
                <label
                  htmlFor="email"
                  className={styles.labelName}
                  id="emailCheckRegExp"
                >
                  <span className={styles.content}> Email </span>
                </label>
              </div>
              <h5
                className={
                  loginError.length > 0 ? styles.warning1 : styles.warning
                }
                id="emailCheck"
              >
                {loginError === "User Not Found"
                  ? "Please provide a valid email "
                  : ""}
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
                <label
                  id="passwordCheckRegExp"
                  htmlFor="password"
                  className={styles.labelName}
                >
                  <span className={styles.content}> Password </span>
                </label>
              </div>
              <h5
                className={
                  loginError.length > 0 ? styles.warning1 : styles.warning
                }
                id="passwordCheck"
              >
                {loginError === "Password is wrong"
                  ? "Please provide a valid password"
                  : ""}
              </h5>
              <button
                className={styles.submitBtn}
                title={submitStatus}
                disabled
                id="submitBtn"
              >
                LOG IN
              </button>
            </form>
            <p className={styles.signUp}>
              Don't have an account yet?
              <Link to="/registration" className={styles.nav}>
                Sign up now
              </Link>
            </p>
            <p className={styles.rights}>
              Copyright © 2020 by THC SOLUTIONS. All rights reserved
            </p>
          </div>
          <div className={styles.loginRight}></div>
        </div>
      </LoadingOverlay>
    </div>
  );
};
