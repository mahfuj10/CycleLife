import counterReducer from "./Counter";
import productReducer from "./products";
import loggedReducer from "./Logged";
import { combineReducers } from "redux";
import searchReducer from "./Search";
import searchProductsReducer from "./searchProducts";

const allReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    products: productReducer,
    search: searchReducer,
    searchProducts: searchProductsReducer
});

export default allReducer;