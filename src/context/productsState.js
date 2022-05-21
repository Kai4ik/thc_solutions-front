import React, { useReducer, createContext } from "react";
import ProductReducer from "../reducers/productReducer";
import axios from "axios";

const initialState = {
  products: [],
  category: "All Products",
  subcategory: "",
  brand: "All Brands",
};

export const ProductContext = createContext(initialState);
//Provider
export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, initialState);

  async function getProducts() {
    let result;
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
      result = response.data;
    } catch (err) {
      console.log(err);
      result = false;
    }
    return result;
  }

  async function getProduct(id) {
    let result;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );
      if (response.data.success) {
        dispatch({
          type: "GET_PRODUCT",
          payload: response.data.product,
        });
        result = response.data.product;
      } else {
        dispatch({
          type: "PRODUCT_NOT_FOUND",
          payload: response.data.error,
        });
        result = false;
      }
    } catch (err) {
      dispatch({
        type: "PRODUCT_NOT_FOUND",
        payload: id,
      });
      result = false;
    }
    return result;
  }

  const saveCurrentFilters = (category, subcategory, brand) => {
    dispatch({
      type: "SAVE_FILTERS",
      payload: { category: category, subcategory: subcategory, brand: brand },
    });
  };

  return (
    <ProductContext.Provider
      value={{
        products: state.products,
        currentCategory: state.category,
        currentSubcategory: state.subcategory,
        currentBrand: state.brand,
        getProducts,
        getProduct,
        saveCurrentFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
