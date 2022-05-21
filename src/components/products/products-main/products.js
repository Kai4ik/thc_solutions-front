import React, { useContext, useEffect, useState, useRef } from "react";
import styles from "./products.module.css";
import $ from "jquery";
import { UserContext } from "../../../context/userState";
import { ProductContext } from "../../../context/productsState";
import { FilterMain } from "./filter/filter";
import { FilterPhone } from "./filterPhone/filterPhone";
import { ProductsHeader } from "./header/productsHeader";
import { ProductCard } from "./productCard/productCard";
import { Loading } from "../../loading/loading";
import { NavigationBar } from "../../navigationBar/navigationBar";
import { Footer } from "../footer/footer";
import LoadingOverlay from "react-loading-overlay";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export const ProductsPage = () => {
  const {
    products,
    getProducts,
    currentCategory,
    currentSubcategory,
    currentBrand,
  } = useContext(ProductContext);
  const location = useLocation();
  const [inCartProducts, setInCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { verifyUser, resetError } = useContext(UserContext);
  const [chosenCategory, setChosenCategory] = useState(
    location.state
      ? location.state.currentCategory.toLowerCase()
      : currentCategory
  );
  const [chosenSubcategory, setChosenSubcategory] = useState(
    currentSubcategory
  );
  const [chosenBrand, setChosenBrand] = useState(currentBrand);
  const [price, setPrice] = React.useState([0, 11150]);
  const [productsCopy, setProductsCopy] = useState([]);
  const [perPage, setPerPage] = useState(
    localStorage.getItem("perPage")
      ? JSON.parse(localStorage.getItem("perPage"))
      : 12
  );
  const firstUpdate = useRef(true);
  const [currentWidth, setCurrentWidth] = useState($(window).width());

  window.addEventListener("resize", function () {
    setCurrentWidth($(window).width());
  });

  const checkProducts = async () => {
    if (Cookies.get("token")) {
      await verifyUser()
        .then((response) => {
          setInCartProducts([...response.data.user.cartProducts]);
          setWishlistProducts([...response.data.user.wishlistProducts]);
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setInCartProducts(
        localStorage.getItem("inCartProducts")
          ? JSON.parse(localStorage.getItem("inCartProducts"))
          : []
      );
      setWishlistProducts(
        localStorage.getItem("wishlistProducts")
          ? JSON.parse(localStorage.getItem("wishlistProducts"))
          : []
      );
      setLoading(false);
    }
  };

  const showMore = () => {
    setPerPage(perPage + 12);
    localStorage.setItem("perPage", perPage + 12);
  };

  useEffect(() => {
    getProducts().then((response) => {
      if (chosenCategory === "All Products" && chosenBrand === "All Brands") {
        setProductsCopy([...response]);
      }
    });
    checkProducts();
    resetError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (!firstUpdate.current) {
      setChosenSubcategory("");
      setPerPage(12);
    }
    if (firstUpdate.current) firstUpdate.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenSubcategory, chosenBrand]);

  return (
    <LoadingOverlay
      active={loading}
      styles={{
        overlay: (base) => ({
          ...base,
          background: "rgba(0, 0, 0, 0.8);",
        }),
        wrapper: {
          height: "100vh",
          overflow: loading && "hidden",
        },
      }}
      spinner={<Loading />}
    >
      <NavigationBar />
      <div className={styles.productsMain} id="productsPage">
        <ProductsHeader
          productsCopy={productsCopy}
          setProductsCopy={setProductsCopy}
          products={products}
          currentCategory={chosenCategory}
          currentSubcategory={chosenSubcategory}
          currentBrand={chosenBrand}
          price={price}
        />
        <FilterMain
          productsCopy={productsCopy}
          chosenCategory={chosenCategory}
          setChosenCategory={setChosenCategory}
          chosenSubcategory={chosenSubcategory}
          setChosenSubcategory={setChosenSubcategory}
          chosenBrand={chosenBrand}
          setChosenBrand={setChosenBrand}
          products={products}
          price={price}
          setPrice={setPrice}
        />
        <div className={styles.filterPhone}>
          <FilterPhone
            chosenBrand={chosenBrand}
            setChosenBrand={setChosenBrand}
          />
        </div>
        <div className={styles.products}>
          {productsCopy.slice(0, perPage).length > 11
            ? productsCopy.slice(0, perPage).map(
                (product, index) =>
                  index %
                    (currentWidth <= 1024
                      ? currentWidth < 851
                        ? 2
                        : 3
                      : 4) ===
                    0 && (
                    <div className={styles.container} key={product._id}>
                      {productsCopy
                        .slice(
                          index,
                          currentWidth <= 1024
                            ? index + (currentWidth < 851 ? 2 : 3)
                            : index + 4
                        )
                        .map((product, index) => (
                          <ProductCard
                            product={product}
                            inCartProducts={inCartProducts}
                            checkProducts={checkProducts}
                            wishlistProducts={wishlistProducts}
                            chosenCategory={chosenCategory}
                            chosenSubcategory={chosenSubcategory}
                            chosenBrand={chosenBrand}
                            key={index}
                          />
                        ))}
                    </div>
                  )
              )
            : productsCopy.slice(0, perPage).map(
                (product, index) =>
                  index %
                    (currentWidth <= 1024
                      ? currentWidth < 851
                        ? 2
                        : 3
                      : 4) ===
                    0 && (
                    <div className={styles.container} key={product._id}>
                      {productsCopy
                        .slice(
                          index,
                          currentWidth <= 1024
                            ? index + (currentWidth < 851 ? 2 : 3)
                            : index + 4
                        )
                        .map((product, index) => (
                          <ProductCard
                            product={product}
                            inCartProducts={inCartProducts}
                            checkProducts={checkProducts}
                            wishlistProducts={wishlistProducts}
                            chosenCategory={chosenCategory}
                            chosenSubcategory={chosenSubcategory}
                            chosenBrand={chosenBrand}
                            key={index}
                          />
                        ))}
                    </div>
                  )
              )}
          <div className={styles.bottomBtn}>
            {productsCopy.length - perPage > 0 && (
              <button onClick={showMore} className={styles.showMore}>
                Show More
              </button>
            )}
            <div
              id="scrollTopDiv"
              className={styles.scrollBtn}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FontAwesomeIcon
                id="scrollTop"
                icon={faArrowUp}
                className={styles.toTop}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </LoadingOverlay>
  );
};
