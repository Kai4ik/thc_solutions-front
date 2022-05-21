import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import Cookies from "js-cookie";
import { UserContext } from "../../context/userState";
import { ProductContext } from "../../context/productsState";
import { addToCart } from "../helperFunctions/helper";
import styles from "./product.module.css";
import LoadingOverlay from "react-loading-overlay";
import { Loading } from "../loading/loading";
import { NavigationBar } from "../navigationBar/navigationBar";
import { Buttons } from "./buttons/buttons";
import { Footer } from "../products/footer/footer";

export const ProductPage = (props) => {
  const { getProduct } = useContext(ProductContext);
  const { verifyUser, updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [chosenPrice, setChosenPrice] = useState(0);
  const [chosenOption, setChosenOption] = useState(null);

  useEffect(() => {
    getProduct(props.id).then((response) => {
      setProduct(response);
      setChosenPrice(response.price);
      if (response.options) {
        let optionTitle = null;
        response.options.forEach((option) => {
          if (response.price === option.price) optionTitle = option.title;
        });
        setChosenOption(optionTitle);
      }
      if (Cookies.get("token")) {
        verifyUser().then((user) => {
          const cartProducts = user.data.user.cartProducts;
          const index = checkProduct(cartProducts, response);
          if (index !== -1) {
            setChosenPrice(cartProducts[index].price);
            setChosenOption(cartProducts[index].option);
          }
        });
      } else {
        const cartProducts = localStorage.getItem("inCartProducts")
          ? JSON.parse(localStorage.getItem("inCartProducts"))
          : [];
        const index = checkProduct(cartProducts, response);
        if (index !== -1) {
          setChosenPrice(cartProducts[index].price);
          setChosenOption(cartProducts[index].option);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkProduct = (arrayToCheck, product) => {
    return arrayToCheck.findIndex(
      (elem) =>
        (Cookies.get("token") ? elem.product : elem.product._id) === product._id
    );
  };

  useEffect(() => {
    setLoading(false);
  }, [product]);

  const openPopUp = (e) => {
    $("#modal").addClass(styles.open);
    $("#fullImage").addClass(styles.open);
    $("#fullImage").attr("src", e.target.src);
  };

  const closePopUp = (e) => {
    if (e.target.id === "modal") {
      $("#modal").removeClass(styles.open);
      $("#fullImage").removeClass(styles.open);
    }
  };

  const changeActiveImg = (e) => {
    $("#activeImage").attr("src", e.target.src);
  };

  const addProductToCart = (e, index) => {
    if (index !== -1) {
      addToCart(
        e,
        product,
        product.options[e.target.value].title,
        product.options[e.target.value].price,
        verifyUser,
        updateUser,
        styles.random
      );
    }
  };

  const chooseOption = (e) => {
    setChosenPrice(product.options[e.target.value].price);
    setChosenOption(product.options[e.target.value].title);
    if (Cookies.get("token")) {
      verifyUser().then((user) => {
        addProductToCart(e, checkProduct(user.data.user.cartProducts, product));
      });
    } else {
      if (localStorage.getItem("inCartProducts")) {
        addProductToCart(
          e,
          checkProduct(
            JSON.parse(localStorage.getItem("inCartProducts")),
            product
          )
        );
      }
    }
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
      {Object.keys(product).length !== 0 && (
        <div className={styles.productWrapper}>
          <div className={styles.allImages}>
            <div className={styles.imgWrapper}>
              <img
                src={product.image[0]}
                alt="productImg"
                onClick={openPopUp}
                id="activeImage"
              ></img>
            </div>
            <div className={styles.slides}>
              {product.image.length > 1 &&
                product.image.slice(0, 6).map((elem, index) => (
                  <a href="#image" onClick={changeActiveImg} key={index}>
                    <img src={elem} alt="productImg"></img>
                  </a>
                ))}
            </div>
            <div className={styles.modal} id="modal" onClick={closePopUp}>
              <img
                src=""
                alt="ProductImage"
                className={styles.fullImage}
                id="fullImage"
              ></img>
            </div>
          </div>
          <div className={styles.descriptionWrapper}>
            <div className={styles.cardHeader}>
              <h2>{product.title}</h2>
              <div className={styles.category}>
                <p>
                  {product.category} / {product.subcategory}
                </p>
                <div> ${product.price}</div>
              </div>
            </div>
            <p className={styles.description}>{product.description}</p>
            <Buttons
              product={product}
              chosenPrice={chosenPrice}
              chosenOption={chosenOption}
            />
            {product.hasOwnProperty("options") && (
              <div className={styles.options}>
                <p> Available options: </p>
                {product.hasOwnProperty("options") &&
                  product.options.map((elem, index) => (
                    <tr className={styles.option} key={index}>
                      <td className={styles.optionRadio}>
                        <input
                          type="radio"
                          className={styles.selectOption}
                          name="options"
                          value={index}
                          checked={
                            elem.price === chosenPrice &&
                            elem.title === chosenOption
                              ? true
                              : false
                          }
                          onChange={chooseOption}
                        />
                      </td>
                      <td className={styles.optionTitle}>{elem.title}</td>
                      <td className={styles.optionPrice}>
                        ${elem.price ? elem.price : product.price}
                      </td>
                    </tr>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </LoadingOverlay>
  );
};
