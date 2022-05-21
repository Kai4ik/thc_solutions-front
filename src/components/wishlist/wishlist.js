import React, { useContext, useEffect, useState } from "react";
import $ from "jquery";
import { useHistory } from "react-router-dom";
import styles from "./wishlist.module.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userState";
import { ProductContext } from "../../context/productsState";
import LoadingOverlay from "react-loading-overlay";
import { Loading } from "../loading/loading";
import { Buttons } from "./buttons/buttons";
import { Footer } from "../products/footer/footer";
import { EmptyState } from "../emptyState/emptyState";
import { NavigationBar } from "../navigationBar/navigationBar";

export const WishlistPage = () => {
  const { verifyUser, resetError } = useContext(UserContext);
  const { getProduct, saveCurrentFilters } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentWidth, setCurrentWidth] = useState($(window).width());
  const history = useHistory();

  window.addEventListener("resize", function () {
    setCurrentWidth($(window).width());
  });

  const fillProducts = async () => {
    if (Cookies.get("token")) {
      await verifyUser()
        .then((response) => {
          setCartProducts(response.data.user.cartProducts);
          const tempArray = [];
          if (response.data.user.wishlistProducts.length > 0) {
            response.data.user.wishlistProducts.forEach((elem) => {
              getProduct(elem.product).then((response) => {
                tempArray.push({ product: response });
                setWishlistProducts([...tempArray]);
              });
            });
          }
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setCartProducts(
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

  useEffect(() => {
    fillProducts();
    saveCurrentFilters("All Products", "", "All Brands");
    resetError();
    localStorage.setItem("perPage", 12);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className={styles.wishlistHeader}>
        <h3>Your wishlist</h3>
        <p> [{wishlistProducts.length} items]</p>
      </div>
      {wishlistProducts.length > 0 ? (
        <div className={styles.wishlist}>
          {!Cookies.get("token") && (
            <div className={styles.loginBanner}>
              <p className={styles.appeal}> Don't lose your wishlist. </p>
              <p>
                <Link to="/login">
                  <i>Log in </i>
                </Link>
                to save the item(s) so they won't be lost.
              </p>
              <div className={styles.regLinks}>
                <Link to="/registration">
                  <button> REGISTER </button>
                </Link>
                <Link to="/login">
                  <button className={styles.login}> LOG IN </button>
                </Link>
              </div>
            </div>
          )}
          {wishlistProducts.map(
            (elem, index) =>
              index % (currentWidth < 1024 ? 2 : 3) === 0 && (
                <div className={styles.products} key={elem.product._id}>
                  {wishlistProducts
                    .slice(index, currentWidth < 1024 ? index + 2 : index + 3)
                    .map((elem) => (
                      <div key={elem.product._id} className={styles.product}>
                        <Buttons
                          product={elem.product}
                          cartProducts={cartProducts}
                          wishlistProducts={wishlistProducts}
                          setWishlistProducts={setWishlistProducts}
                          fillProducts={fillProducts}
                        />
                        <div
                          className={styles.productImgWrapper}
                          onClick={() => {
                            history.push(`/product/${elem.product._id}`);
                          }}
                        >
                          <img
                            className={styles.productImage}
                            src={elem.product.image[0]}
                            alt="ProductImage"
                          ></img>
                        </div>
                        <div
                          className={styles.productDetails}
                          onClick={() => {
                            history.push(`/product/${elem.product._id}`);
                          }}
                        >
                          <h3 className={styles.productTitle}>
                            {elem.product.title}
                          </h3>
                        </div>
                      </div>
                    ))}
                </div>
              )
          )}
        </div>
      ) : (
        <EmptyState title="wishlist" />
      )}
      <Footer />
    </LoadingOverlay>
  );
};
