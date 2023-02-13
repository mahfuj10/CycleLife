export const incrament = (num) => {
    return {
        type: "INCRAMENT",
        payload: num
    }
};
export const decrement = (num) => {
    return {
        type: "DECREMENT",
        payload: num
    };
};

export const setProducts = (product) => {
    return {
        type: "PRODUCTS",
        payload: product
    };
};

export const searchName = (searchName) => {
    return {
        type: "SET_SEARCH_VALUE",
        payload: searchName
    };
};

export const searchProducts = (products) => {
    return {
        type: "SEARCH_PRODUCTS",
        payload: products
    };
};