import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import styles from "./cart-main.module.css";
import { UserContext } from "../../context/userState";
import { ProductContext } from "../../context/productsState";
import { useForm } from "@formspree/react";
import Cookies from "js-cookie";
import LoadingOverlay from "react-loading-overlay";
/* Components */
import { Loading } from "../loading/loading";
import { NavigationBar } from "../navigationBar/navigationBar";
import { EmptyState } from "../emptyState/emptyState";
import { Notification } from "../notification/notification";
import { Footer } from "../products/footer/footer";
import { ProductCard } from "./productCard/productCard";
import { FormFields } from "./formFields/formFields";
import { PaymentForm } from "./paymentForm/paymentForm";

export const ShoppingCartPage = () => {
  const [inCartProducts, setInCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { verifyUser, updateUser, resetError } = useContext(UserContext);
  const { getProduct, saveCurrentFilters } = useContext(ProductContext);
  const storage = localStorage.getItem("inCartProducts")
    ? JSON.parse(localStorage.getItem("inCartProducts"))
    : [];
  const [state, handleSubmit] = useForm("meqpykny");
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [readyToPay, setReadyToPay] = useState(false);
  const [formSubmission, setFormSubmission] = useState(null);
  const [notificationText, setNotificationText] = useState(
    "login and start purchasing!"
  );

  const sendEmail = (e) => {
    if (Cookies.get("token")) {
      if ($(e.target).text().toLowerCase() === "proceed to checkout") {
        setReadyToPay(true);
      } else {
        verifyUser().then((response) => {
          const newTransaction = {
            date: new Date(),
            amount: (total + (total / 100) * 13).toFixed(2),
            products: inCartProducts,
          };
          const transactions = response.data.user.transactions;
          transactions.push(newTransaction);
          updateUser([], wishlistProducts, transactions);
          const temp = [];
          setInCartProducts([...temp]);
          setTotal(0);
          setNotificationText("Transaction was successfully completed!");
          $("#notification").css("cssText", "display :block !important");
        });
      }
    } else {
      $("#notification").css("cssText", "display :block !important");
    }
  };

  const submitEmail = (event) => {
    event.preventDefault();
    setLoading(true);
    setFormSubmission(event);
  };

  useEffect(() => {
    if (readyToSubmit) {
      handleSubmit(formSubmission);
      sendEmail(formSubmission);
      setReadyToSubmit(false);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToSubmit]);

  // function to update users database
  const updateUsersDb = (response) => {
    const wishlistProducts = response.data.user.wishlistProducts;
    const transactions = response.data.user.transactions;
    updateUser(inCartProducts, wishlistProducts, transactions).then(() => {
      calculateTotal(inCartProducts);
    });
  };

  //function to update local storage
  const updateLocalStorage = () => {
    localStorage.setItem("inCartProducts", JSON.stringify(inCartProducts));
    calculateTotal(inCartProducts);
  };

  //function to calculate total price of products in cart
  const calculateTotal = (arrayToCount) => {
    let totalTemp = 0;
    arrayToCount.forEach(
      (element) => (totalTemp += element.price * element.qty)
    );
    setTotal(totalTemp);
  };

  // function to update state of inCartProducts after quantity of particular product was changed
  const setNewQty = (element, e) => {
    const productIndex = inCartProducts.findIndex(
      (elem) => elem.product._id === element.product._id
    );
    inCartProducts[productIndex].qty = parseInt(e.target.value);
  };

  const chgQty = async (e, element) => {
    if (Cookies.get("token")) {
      setNewQty(element, e);
      verifyUser().then((response) => {
        updateUsersDb(response);
      });
    } else {
      setNewQty(element, e);
      updateLocalStorage();
    }
  };

  const fillProducts = async () => {
    if (Cookies.get("token")) {
      await verifyUser()
        .then((response) => {
          setWishlistProducts(response.data.user.wishlistProducts);
          const tempArray = [];
          let totalTemp = 0;
          if (response.data.user.cartProducts.length > 0) {
            response.data.user.cartProducts.forEach((elem) => {
              getProduct(elem.product).then((response) => {
                tempArray.push({
                  product: response,
                  qty: elem.qty,
                  price: elem.price,
                  option: elem.option,
                });
                totalTemp += elem.price * elem.qty;
                setInCartProducts(tempArray);
                setTotal(totalTemp);
              });
            });
          }
        })
        .then(() => {
          setLoading(false);
        });
    } else {
      setInCartProducts(storage);
      setWishlistProducts(
        localStorage.getItem("wishlistProducts")
          ? JSON.parse(localStorage.getItem("wishlistProducts"))
          : []
      );
      calculateTotal(storage);
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
      <Notification title={notificationText} />
      <div className={styles.shoppingBagHeader}>
        <h3>Your Shopping Bag</h3>
        <p>Total: ${total.toFixed(2)}</p>
      </div>
      {inCartProducts.length > 0 ? (
        <div className={styles.cartMain}>
          <div className={styles.container}>
            <div className={styles.cart}>
              <div className={styles.products}>
                {inCartProducts.map((elem) => (
                  <ProductCard
                    key={elem.product._id}
                    elem={elem}
                    updateLocalStorage={updateLocalStorage}
                    updateUsersDb={updateUsersDb}
                    chgQty={chgQty}
                    wishlistProducts={wishlistProducts}
                    inCartProducts={inCartProducts}
                  />
                ))}
              </div>
            </div>
          </div>
          <form className={styles.orderSummary} onSubmit={submitEmail}>
            <h3> Order Summary </h3>
            <FormFields verifyUser={verifyUser} styles={styles.formField} />
            {inCartProducts.map((elem) => (
              <div key={elem.product._id} className={styles.cartProduct}>
                <p className={styles.cartProductName}>{elem.product.title}</p>
                <p className={styles.cartProductPrice}>${elem.price}</p>
                <textarea
                  name="Order Summary"
                  value={`\n
                    Product:  ${elem.product.title}
                    Chosen Option: ${
                      elem.option === null
                        ? "No options available"
                        : elem.option
                    } 
                    Quantity: ${elem.qty}
                    Price: $${elem.price}
                    Total: $${elem.price * elem.qty}`}
                  className={styles.productRow}
                  readOnly
                />
                <p className={styles.cartProductQty}>
                  <input
                    type="number"
                    className={styles.inputQty}
                    min="1"
                    value={elem.qty}
                    onChange={(e) => chgQty(e, elem)}
                  />
                </p>
                <p className={styles.cartProductTotal}>
                  ${(elem.price * elem.qty).toFixed(2)}
                </p>
              </div>
            ))}
            <PaymentForm
              total={total}
              readyToPay={readyToPay}
              setReadyToSubmit={setReadyToSubmit}
              sendEmail={sendEmail}
              setLoading={setLoading}
              setNotificationText={setNotificationText}
            />
          </form>
        </div>
      ) : (
        <EmptyState title="cart" />
      )}
      <Footer />
    </LoadingOverlay>
  );
};
