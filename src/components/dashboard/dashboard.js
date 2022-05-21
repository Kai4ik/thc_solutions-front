import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userState";
import { ProductContext } from "../../context/productsState";
import styles from "./dashboard.module.css";
import LoadingOverlay from "react-loading-overlay";
import { Loading } from "../loading/loading";
import { NavigationBar } from "../navigationBar/navigationBar";
import profile from "../../images/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

export const Dashboard = () => {
  const { verifyUser } = useContext(UserContext);
  const { getProduct } = useContext(ProductContext);
  const [cartProducts, setCartProducts] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [transactions, setTransactions] = useState([
    {
      date: null,
      amount: 0,
      products: [],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [userData, setUserData] = useState({
    fname: "",
    lname: "",
  });

  const fillProducts = async () => {
    await verifyUser()
      .then((response) => {
        const tempWishlist = [];
        const tempCartProducts = [];
        const tempTransactions = [];
        if (response.data.user.wishlistProducts.length > 0) {
          response.data.user.wishlistProducts.forEach((elem) => {
            getProduct(elem.product).then((response) => {
              tempWishlist.push({ product: response });
              setWishlistProducts([...tempWishlist]);
            });
          });
        }
        if (response.data.user.cartProducts.length > 0) {
          response.data.user.cartProducts.forEach((elem) => {
            getProduct(elem.product).then((response) => {
              tempCartProducts.push({ product: response });
              setCartProducts([...tempCartProducts]);
            });
          });
        }
        if (response.data.user.transactions.length > 0) {
          response.data.user.transactions.forEach((elem) => {
            const temp = [];
            elem.products.forEach((product) => {
              getProduct(product.product).then((response) => {
                temp.push({
                  product: response,
                  qty: product.qty,
                  option: product.option,
                  price: product.price,
                });
              });
            });
            const formatDate = new Date(elem.date).toDateString();
            const transaction = {
              date: formatDate,
              amount: elem.amount,
              products: temp,
            };
            tempTransactions.push(transaction);
            setTransactions([...tempTransactions]);
          });
        }
        const user = {
          fname: response.data.user.fname,
          lname: response.data.user.lname,
        };
        setUserData(user);
      })
      .then(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fillProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    history.push("/");
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
      <div className={styles.dashboard}>
        <div className={styles.userDetails}>
          <img src={profile} alt="arrowRight" className={styles.profile} />
          <h2> Welcome, {userData.fname + " " + userData.lname}</h2>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className={styles.logout}
            title="Log Out"
            onClick={logOut}
          />
          <button onClick={logOut}> Log Out </button>
        </div>
        <div className={styles.content}>
          <div className={styles.container}>
            <h2> Your Wishlist</h2>
            {wishlistProducts.map((elem) => (
              <div
                key={elem.product._id}
                className={styles.product}
                onClick={() => {
                  history.push(`/product/${elem.product._id}`);
                }}
              >
                <div className={styles.imgWrapper}>
                  <img src={elem.product.image[0]} alt="omg"></img>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{elem.product.title}</h3>
                </div>
              </div>
            ))}
            <h4>
              <Link to="/wishlist" className={styles.link}>
                Go to wishlist
              </Link>
              <img
                src="https://img.icons8.com/ios/96/000000/long-arrow-right.png"
                alt="arrowRight"
                className={styles.arrowRight}
              />
            </h4>
          </div>
          <div className={styles.container}>
            <h2> Your Shopping Bag</h2>
            {cartProducts.map((elem) => (
              <div
                key={elem.product._id}
                className={styles.product}
                onClick={() => {
                  history.push(`/product/${elem.product._id}`);
                }}
              >
                <div className={styles.imgWrapper}>
                  <img src={elem.product.image[0]} alt="omg"></img>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{elem.product.title}</h3>
                </div>
              </div>
            ))}
            <h4>
              <Link to="/shoppingCart" className={styles.link}>
                Go to cart
              </Link>
              <img
                src="https://img.icons8.com/ios/96/000000/long-arrow-right.png"
                alt="arrowRight"
                className={styles.arrowRight}
              />
            </h4>
          </div>
          <div className={styles.container}>
            <h2> Previous Purchases </h2>
            {transactions.map((elem) => (
              <div className={styles.transactionRow} key={elem._id}>
                <div className={styles.transaction}>
                  <div className={styles.info}>
                    <p> Date: </p>
                    <p className={styles.details}>{elem.date}</p>
                  </div>
                  <div className={styles.info}>
                    <p> Total Amount: </p>
                    <p className={styles.details}>${elem.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div className={styles.products}>
                  {elem.products.map((product) => (
                    <div
                      className={styles.transactionProduct}
                      key={product._id}
                    >
                      <div
                        className={styles.title}
                        onClick={() => {
                          history.push(`/product/${product.product._id}`);
                        }}
                      >
                        <p className={styles.productName}>
                          {product.product.title}
                        </p>
                        <p className={styles.option}>
                          {product.option
                            ? `Chosen Option: ${product.option}`
                            : null}
                        </p>
                      </div>
                      <div className={styles.field}>${product.price}</div>
                      <div className={styles.field} id={styles.qty}>
                        {product.qty}
                      </div>
                      <div className={styles.field} id={styles.total}>
                        ${(product.qty * product.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};
