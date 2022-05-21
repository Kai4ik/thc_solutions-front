import React, { useEffect, useState, useContext } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/src/owl.carousel.css";
import styles from "./filterPhone.module.css";
import { ProductContext } from "../../../../context/productsState";

export const FilterPhone = () => {
  const { getProducts } = useContext(ProductContext);
  const [brands, setBrands] = useState([]);

  const options = {
    items: 2,
    center: true,
    autoplay: true,
    loop: true,
    nav: false,
    dots: false,
  };

  useEffect(() => {
    getProducts().then((response) => {
      const brands = ["All Brands"];
      response.forEach((product) => {
        !brands.includes(product.brand) && brands.push(product.brand);
      });
      setBrands([...brands]);
    });
  }, []);

  return (
    <section className={styles.categories}>
      <div className={styles.categoriesHeader}>
        <h2> SHOP BY CATEGORIES </h2>
      </div>
      <div className={styles.col2}>
        {brands.map((category, index) => (
          <div key={index} className={styles.categoryContainer}>
            <h4 className={styles.categoryName}>{category}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};
