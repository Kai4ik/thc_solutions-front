import $ from "jquery";
import Cookies from "js-cookie";
//function used to check product for existence in particular array

const findProductIndex = (arrayToCheck, productToAdd, arrayType) => {
  return arrayToCheck.findIndex(
    (elem) =>
      (arrayType === "storage" ? elem.product._id : elem.product) ===
      productToAdd._id
  );
};

/* set of functions required to add product to user's shopping cart */

const populateInCartProducts = (
  arrayToChange,
  productToAdd,
  option,
  price,
  arrayType
) => {
  const checkExistence =
    arrayToChange.length > 0
      ? findProductIndex(arrayToChange, productToAdd, arrayType)
      : -1;
  if (checkExistence === -1)
    arrayToChange.push({
      product: productToAdd,
      qty: 1,
      price: price,
      option: option,
    });
  if (checkExistence !== -1) {
    arrayToChange[checkExistence].price = price;
    arrayToChange[checkExistence].option = option;
  }
};

export const addToCart = (
  e,
  product,
  option,
  price,
  loggedUser,
  updateUser,
  added
) => {
  const cartProducts = localStorage.getItem("inCartProducts")
    ? JSON.parse(localStorage.getItem("inCartProducts"))
    : [];
  $(e.target).addClass(added);
  if (Cookies.get("token")) {
    loggedUser().then((response) => {
      const inCartProducts = response.data.user.cartProducts;
      const wishlistProducts = response.data.user.wishlistProducts;
      const transactions = response.data.user.transactions;
      populateInCartProducts(
        inCartProducts,
        product,
        option,
        price,
        "inCartProducts"
      );
      updateUser(inCartProducts, wishlistProducts, transactions);
    });
  } else {
    populateInCartProducts(cartProducts, product, option, price, "storage");
    localStorage.setItem("inCartProducts", JSON.stringify(cartProducts));
  }
};

/* set of functions required to add product to user's wishlist */
const populateWishlistProducts = (arrayToChange, productToAdd, arrayType) => {
  const checkExistence =
    arrayToChange.length > 0
      ? findProductIndex(arrayToChange, productToAdd, arrayType)
      : -1;
  if (checkExistence === -1) arrayToChange.push({ product: productToAdd });
};

export const addToWishlist = (e, product, loggedUser, updateUser, added) => {
  const wishlist = localStorage.getItem("wishlistProducts")
    ? JSON.parse(localStorage.getItem("wishlistProducts"))
    : [];
  $(e.target).addClass(added);
  if (Cookies.get("token")) {
    loggedUser().then((response) => {
      const inCartProducts = response.data.user.cartProducts;
      const wishlistProducts = response.data.user.wishlistProducts;
      const transactions = response.data.user.transactions;
      populateWishlistProducts(wishlistProducts, product, "wishlistProducts");
      updateUser(inCartProducts, wishlistProducts, transactions);
    });
  } else {
    populateWishlistProducts(wishlist, product, "storage");
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlist));
  }
};

/* Function to manipulate scrolling of filters */

const checkCategoryExistence = (arrayToCheck, product, category) => {
  if (
    arrayToCheck.filter(
      (elem) =>
        elem.subcategory === category && elem.category === product.category
    ).length === 0
  ) {
    arrayToCheck.push({
      category: product.category,
      subcategory: category,
    });
  }
};

const setCategoriesFunction = (
  products,
  setCategories,
  setSubcategories,
  setBrands
) => {
  const allCategories = ["All Products"];
  const subcategories = [{}];
  const brands = ["All Brands"];

  products.forEach((product) => {
    checkCategoryExistence(subcategories, product, "All");
    checkCategoryExistence(subcategories, product, product.subcategory);
    !allCategories.includes(product.category) &&
      allCategories.push(product.category);
    !brands.includes(product.brand) && brands.push(product.brand);
  });

  setCategories([...allCategories]);
  setSubcategories([...subcategories]);
  setBrands([...brands]);
};

export const arrowToggle = (e) => {
  if (getComputedStyle($(e.currentTarget).children()[1]).display === "none") {
    $(e.currentTarget).siblings("ul").slideUp(250);
    $(e.currentTarget).children()[1].style.display = "inline-block";
    $(e.currentTarget).children()[2].style.display = "none";
  } else {
    $(e.currentTarget).siblings("ul").slideDown(250);
    $(e.currentTarget).children()[1].style.display = "none";
    $(e.currentTarget).children()[2].style.display = "inline-block";
  }
};

export const handleClick = (
  e,
  products,
  setCategories,
  setSubcategories,
  setBrands
) => {
  setCategoriesFunction(products, setCategories, setSubcategories, setBrands);
  arrowToggle(e);
};
