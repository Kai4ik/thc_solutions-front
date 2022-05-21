import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import styles from "./categories.module.css";
import lighting from "../../../images/category1.png";
import growingEnv from "../../../images/category2.jpg";
import growingMedium from "../../../images/category3.jpg";
import waterAeration from "../../../images/category4.jpg";
import plantPropagation from "../../../images/category5.jpg";
import growTents from "../../../images/category6.jpg";
import growingTools from "../../../images/category7.jpg";

export const Categories = () => {
  const [categories, setCategories] = useState([{}]);

  const options = {
    responsive: {
      0: {
        items: 1,
        center: false,
        margin: 10,
      },
      620: {
        items: 2,
        center: true,
        margin: 20,
      },
    },
    autoplay: true,
    loop: true,
    nav: false,
    dots: false,
  };

  useEffect(() => {
    const shopByCategories = [
      {
        categoryName: "LIGHTING",
        image: lighting,
      },
      {
        categoryName: "GROWING ENVIRONMENT",
        image: growingEnv,
      },
      {
        categoryName: "Growing Media & Containers",
        image: growingMedium,
      },
      {
        categoryName: "Tools, Accessories & More",
        image: growingTools,
      },
      {
        categoryName: "Water & Aeration",
        image: waterAeration,
      },
      {
        categoryName: "Grow Tents, Systems & Trays",
        image: growTents,
      },
      {
        categoryName: "Plant Propagation, Nutrition & Health",
        image: plantPropagation,
      },
    ];
    setCategories(shopByCategories);
  }, []);

  return (
    <section className={styles.categories}>
      <div className={styles.categoriesHeader}>
        <h2> SHOP BY CATEGORIES </h2>
      </div>
      <div className={styles.col2}>
        <OwlCarousel options={options}>
          {categories.map((category, index) => (
            <div key={index} className={styles.categoryContainer}>
              <img
                className={styles.categoryImg}
                src={category.image}
                alt={category.categoryName}
              ></img>
              <h4 className={styles.categoryName}>{category.categoryName}</h4>
              <div className={styles.desc}>
                <Link
                  to={{
                    pathname: "/products",
                    state: {
                      currentCategory: category.categoryName,
                    },
                  }}
                  className={styles.shopBtn}
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>
    </section>
  );
};
