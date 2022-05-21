import React, { useState } from "react";
import styles from "./filter.module.css";
import Slider from "@material-ui/core/Slider";
import { handleClick } from "../../../helperFunctions/helper";
import arrowUp from "../imgs/chevron-up.svg";
import arrowDown from "../imgs/chevron-down.svg";

export const FilterMain = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const filterOptionElement = (option) => {
    return (
      <div
        className={styles.scrollDown}
        onClick={(e) =>
          handleClick(
            e,
            props.products,
            setCategories,
            setSubcategories,
            setBrands
          )
        }
      >
        <p className={styles.filterOption}> {option} </p>
        <img className={styles.arrowUp} src={arrowDown} alt="Arrow Down"></img>
        <img className={styles.arrowDown} src={arrowUp} alt="Arrow Up"></img>
      </div>
    );
  };

  const handlePrice = (event, newValue) => {
    props.setPrice(newValue);
  };

  return (
    <div className={styles.filterSection}>
      <div className={styles.filterWrapper}>
        <div className={styles.filterOptions}>
          {filterOptionElement("Category")}
          <ul className={styles.options}>
            {categories.map((category) =>
              category !== "All Products" ? (
                <li
                  key={category}
                  className={
                    category === props.chosenCategory
                      ? styles.active
                      : undefined
                  }
                  onClick={() => props.setChosenCategory(category)}
                >
                  <div className={styles.subcategories}>
                    {filterOptionElement(category)}
                    <ul className={styles.options}>
                      {subcategories.map(
                        (subcategory) =>
                          subcategory.category === category && (
                            <li
                              key={subcategory.subcategory}
                              className={[
                                styles.subcategoryOptions,
                                subcategory.subcategory ===
                                props.chosenSubcategory
                                  ? styles.activeSubcategory
                                  : undefined,
                              ].join(" ")}
                              onClick={() =>
                                props.setChosenSubcategory(
                                  subcategory.subcategory
                                )
                              }
                            >
                              {subcategory.subcategory}
                            </li>
                          )
                      )}
                    </ul>
                  </div>
                </li>
              ) : (
                <li
                  key={category}
                  className={
                    category === props.chosenCategory
                      ? styles.active
                      : undefined
                  }
                  onClick={() => props.setChosenCategory(category)}
                >
                  <div className={styles.option}>{category}</div>
                </li>
              )
            )}
          </ul>
        </div>
        <div className={styles.filterOptions}>
          {filterOptionElement("Brand")}
          <ul className={styles.options}>
            {brands.map((brand) => (
              <li
                key={brand}
                className={
                  brand === props.chosenBrand ? styles.active : undefined
                }
                onClick={() => props.setChosenBrand(brand)}
              >
                <div className={styles.option}>{brand}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.filterOptions}>
          {filterOptionElement("Price")}
          <ul className={styles.options}>
            <li className={styles.price}>
              <Slider
                value={props.price}
                onChange={handlePrice}
                max={11150}
                aria-labelledby="range-slider"
              />
            </li>
            <div className={styles.priceRange}>
              Current range: {props.price[0]} - {props.price[1]}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};
