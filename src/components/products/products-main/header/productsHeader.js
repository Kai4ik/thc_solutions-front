import React, { useState, useEffect } from "react";
import styles from "./productsHeader.module.css";
import { arrowToggle } from "../../../helperFunctions/helper";
import arrowUp from "../imgs/chevron-up.svg";
import arrowDown from "../imgs/chevron-down.svg";

export const ProductsHeader = (props) => {
  const [filter, setFilter] = useState(null);
  const [active, setActive] = useState(null);

  const applySort = (arrayToSort) => {
    setActive(filter);
    let temp = [...arrayToSort];
    if (filter === "asc") temp.sort((a, b) => a.price - b.price);
    if (filter === "desc") temp.sort((a, b) => b.price - a.price);
    if (filter === "alp") temp.sort((a, b) => a.title.localeCompare(b.title));

    filter === null
      ? props.setProductsCopy([...arrayToSort])
      : props.setProductsCopy([...temp]);
  };

  useEffect(() => {
    applySort(props.productsCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const sortByCategory = (arrayToSort) => {
    const tempArray = arrayToSort.filter(
      (product) =>
        product.category.toLowerCase() === props.currentCategory.toLowerCase()
    );
    return tempArray;
  };

  const sortBySubCategory = (arrayToSort) => {
    const tempArray = arrayToSort.filter(
      (product) => product.subcategory === props.currentSubcategory
    );
    return tempArray;
  };

  const sortByBrand = (arrayToSort) => {
    const tempArray = arrayToSort.filter(
      (product) => product.brand === props.currentBrand
    );
    return tempArray;
  };

  const sortByPrice = (arrayToSort) => {
    const tempArray = arrayToSort.filter(
      (product) =>
        product.price >= props.price[0] && product.price <= props.price[1]
    );
    return tempArray;
  };

  useEffect(() => {
    let temp = sortByCategory(props.products);
    let sortTemp = sortByBrand(temp);
    let sortAll = sortByBrand(props.products);
    temp = sortByPrice(temp);
    sortTemp = sortByPrice(sortTemp);
    sortAll = sortByPrice(sortAll);

    props.currentCategory === "All Products"
      ? applySort(
          props.currentBrand.toLowerCase() === "all brands"
            ? sortByPrice(props.products)
            : sortAll
        )
      : applySort(
          props.currentBrand.toLowerCase() === "all brands" ? temp : sortTemp
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.price]);

  useEffect(() => {
    const temp = sortByCategory(props.products);
    let sortTemp = sortByBrand(temp);
    let sortAll = sortByBrand(props.products);

    props.currentCategory === "All Products"
      ? applySort(
          props.currentBrand.toLowerCase() === "all brands"
            ? props.products
            : sortAll
        )
      : applySort(
          props.currentBrand.toLowerCase() === "all brands" ? temp : sortTemp
        );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentCategory]);

  useEffect(() => {
    const temp = sortByBrand(props.products);
    let sortTemp = sortByCategory(temp);
    let sortAll = sortByCategory(props.products);
    if (props.currentSubcategory !== "" && props.currentSubcategory !== "All") {
      sortTemp = sortBySubCategory(sortTemp);
      sortAll = sortBySubCategory(sortAll);
    }

    props.currentBrand === "All Brands"
      ? applySort(
          props.currentCategory.toLowerCase() === "all products"
            ? props.products
            : sortAll
        )
      : applySort(
          props.currentCategory.toLowerCase() === "all products"
            ? temp
            : sortTemp
        );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentBrand]);

  useEffect(() => {
    if (props.currentSubcategory !== "") {
      let temp = sortBySubCategory(props.products);
      let tempAll = sortByCategory(props.products);
      if (props.currentBrand !== "All Brands") {
        temp = sortByBrand(temp);
        tempAll = sortByBrand(tempAll);
      }
      props.currentSubcategory === "All" ? applySort(tempAll) : applySort(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentSubcategory]);

  return (
    <div className={styles.pageTitle}>
      <h2>
        <div className={styles.chosenCategory}>
          {props.currentCategory}
          {props.currentSubcategory === ""
            ? ""
            : " / " + props.currentSubcategory}
          {" - " + props.currentBrand}
          <p className={styles.amount}>[{props.productsCopy.length}]</p>
        </div>
        <div className={styles.sort}>
          <div onClick={(e) => arrowToggle(e)}>
            <p> Sort By </p>
            <img
              className={styles.arrowUp}
              src={arrowDown}
              alt="Arrow Down"
            ></img>
            <img
              className={styles.arrowDown}
              src={arrowUp}
              alt="Arrow Up"
            ></img>
          </div>
          <ul className={styles.options}>
            <li
              onClick={() => setFilter("desc")}
              className={active === "desc" ? styles.active : ""}
            >
              Price High to Low
            </li>
            <li
              onClick={() => setFilter("asc")}
              className={active === "asc" ? styles.active : ""}
            >
              Price Low to High
            </li>
            <li
              onClick={() => setFilter("alp")}
              className={active === "alp" ? styles.active : ""}
            >
              Product Name
            </li>
          </ul>
        </div>
      </h2>
    </div>
  );
};
