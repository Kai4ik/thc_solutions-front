import { Route, Switch } from "react-router-dom";
import "./App.css";
import React, { useEffect } from "react";
import { UserProvider } from "./context/userState";
import { ProductProvider } from "./context/productsState";
import { HomePage } from "./components/home-page/home";
import { LoginPage } from "./components/login-page/login-form";
import { SignInPage } from "./components/sign-in/signInForm";
import { ProductPage } from "./components/product/product";
import { ProductsPage } from "./components/products/products-main/products";
import { ShoppingCartPage } from "./components/shoppingCart/cart-main";
import { WishlistPage } from "./components/wishlist/wishlist";
import { Dashboard } from "./components/dashboard/dashboard";

function App() {
  useEffect(() => {
    let sqPaymentScript = document.createElement("script");
    sqPaymentScript.src = "https://js.squareupsandbox.com/v2/paymentform";
    sqPaymentScript.type = "text/javascript";
    sqPaymentScript.async = false;
    document.getElementsByTagName("head")[0].appendChild(sqPaymentScript);
  });

  return (
    <Switch>
      <ProductProvider>
        <UserProvider>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/login" render={() => <LoginPage />} />
          <Route exact path="/dashboard" render={() => <Dashboard />} />
          <Route exact path="/registration" render={() => <SignInPage />} />
          <Route exact path="/products" render={() => <ProductsPage />} />
          <Route
            exact
            path="/product/:id"
            render={(props) => <ProductPage id={props.match.params.id} />}
          />
          <Route exact path="/wishlist" render={() => <WishlistPage />} />
          <Route
            exact
            path="/shoppingCart"
            render={() => <ShoppingCartPage />}
          />
        </UserProvider>
      </ProductProvider>
    </Switch>
  );
}

export default App;
