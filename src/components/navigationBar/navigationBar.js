import React, { useState } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag, faHeart } from "@fortawesome/free-solid-svg-icons";
import styles from "./navigationBar.module.css";
import logo from "../../images/2020-02-13-removebg-preview.png";

export const NavigationBar = () => {
  const [openedMenu, setOpenedMenu] = useState(
    $(window).width() > 1270 ? true : false
  );
  const [top, setTop] = useState($("html").scrollTop());
  const currentWidth = $(window).width();

  document.addEventListener("scroll", function () {
    if (top < $("html").scrollTop()) {
      $("#headerNavbar").css("cssText", "display :none !important");
    }
    if (top > $("html").scrollTop()) {
      $("#headerNavbar").css("cssText", "display :block !important");
    }
    setTop($("html").scrollTop());
  });

  return (
    <div
      className={[
        styles.headerNavbar,
        openedMenu ? styles.activeMenu : "",
      ].join(" ")}
      id="headerNavbar"
    >
      <span
        className={styles.menuToggle}
        onClick={() => setOpenedMenu(!openedMenu)}
      >
        <i></i>
        <i></i>
        <i></i>
      </span>
      <div className={styles.menuContent}>
        <ul>
          <li>
            <div className={styles.navLink}>
              <span className={styles.three}>
                <span className={styles.frontPart}>
                  <img
                    className={styles.logo}
                    src={logo}
                    alt="logo-thc-solutions"
                  ></img>
                </span>
                <span className={styles.backPart}>
                  <img
                    className={styles.logo}
                    src={logo}
                    alt="logo-thc-solutions"
                  ></img>
                </span>
              </span>
            </div>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <Link to="/" className={styles.navLink}>
              <span className={styles.three}>
                <span className={styles.frontPart}> HOME </span>
                <span className={styles.backPart}> HOME</span>
              </span>
            </Link>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <Link to="/products" className={styles.navLink}>
              <span className={styles.three}>
                <span className={styles.frontPart}> Products </span>
                <span className={styles.backPart}>Products</span>
              </span>
            </Link>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <HashLink smooth to="/#contactForm" className={styles.navLink}>
              <span className={styles.three}>
                <span className={styles.frontPart}>CONTACT </span>
                <span className={styles.backPart}> CONTACT</span>
              </span>
            </HashLink>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <Link
              to={Cookies.get("token") ? "/dashboard" : "/login"}
              className={styles.navLink}
            >
              <span className={styles.three}>
                <span className={styles.frontPart}>
                  {Cookies.get("token") ? Cookies.get("userName") : "LOG IN"}
                </span>
                <span className={styles.backPart}>
                  {Cookies.get("token") ? Cookies.get("userName") : "LOG IN"}
                </span>
              </span>
            </Link>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <Link
              to="/shoppingCart"
              className={[styles.navLink, styles.navIcon].join(" ")}
            >
              <span className={styles.three}>
                <span className={styles.frontPart}>
                  {currentWidth > 1269 ? (
                    <FontAwesomeIcon icon={faShoppingBag} />
                  ) : (
                    "Shopping Bag"
                  )}
                </span>
                <span className={styles.backPart}>
                  {currentWidth > 1269 ? (
                    <FontAwesomeIcon icon={faShoppingBag} />
                  ) : (
                    "Shopping Bag"
                  )}
                </span>
              </span>
            </Link>
          </li>
          <li onClick={() => setOpenedMenu(false)}>
            <Link
              to="/wishlist"
              className={[styles.navLink, styles.navIcon].join(" ")}
              onMouseOver={() =>
                $("#headerNavbar").css("cssText", "background: #f9f9f9")
              }
              onMouseOut={() =>
                $("#headerNavbar").css("cssText", "background: #fccf14")
              }
            >
              <span className={styles.three}>
                <span className={styles.frontPart}>
                  {currentWidth > 1269 ? (
                    <FontAwesomeIcon icon={faHeart} />
                  ) : (
                    "Your Wishlist"
                  )}
                </span>
                <span className={styles.backPart}>
                  {currentWidth > 1270 ? (
                    <FontAwesomeIcon icon={faHeart} />
                  ) : (
                    "Your Wishlist"
                  )}
                </span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
