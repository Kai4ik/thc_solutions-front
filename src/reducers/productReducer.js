const ProductReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_PRODUCT":
      return {
        ...state,
      };
    case "SAVE_FILTERS":
      return {
        ...state,
        category: action.payload.category,
        subcategory: action.payload.subcategory,
        brand: action.payload.brand,
      };

    case "SET_PER_PAGE":
      return {
        ...state,
        perPage: action.payload.perPage,
      };
    default:
      return state;
  }
};

export default ProductReducer;
