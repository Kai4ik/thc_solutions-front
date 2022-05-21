import React, { useState } from "react";
import Cookies from "js-cookie";
import OwlCarousel from "react-owl-carousel2";
import { useLocation } from "react-router-dom";
import styles from "./header.module.css";

export const Header = () => {
  const location = useLocation();
  const parameter = location.state ? location.state.loginSuccess : null;
  const options = {
    items: 1,
    autoplay: true,
    loop: true,
    nav: false,
    dots: false,
  };
  const [backgrounds, setBackgrounds] = useState([
    styles.headerMain,
    styles.headerMain2,
    styles.headerMain3,
    styles.headerMain4,
  ]);

  return (
    <header>
      {parameter === true && (
        <div className={styles.notification} id="notification">
          <div className={styles.center}>
            <h1>
              You was successfully logged in! Welcome {Cookies.get("userName")}
            </h1>
          </div>
        </div>
      )}
      <OwlCarousel options={options}>
        {backgrounds.map((background, index) => (
          <div key={index} className={background}>
            <div className={styles.hero}>
              <div className={styles.title} id="title">
                Hydroponics equipment supplier
              </div>
              <p>
                Offering the highest quality hydroponic equipment and supplies
                at unbeatable price. We have everything from consulting to
                installation. Delivery is available give us a call today!
              </p>
            </div>
          </div>
        ))}
      </OwlCarousel>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className={styles.svg}
      >
        <path
          fill="white"
          fillOpacity="1"
          d="M0,192L48,186.7C96,181,192,171,288,176C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </header>
  );
};
