const initalState = {
    searchProducts: []
};

const searchProductsReducer = (state = initalState, { type, payload }) => {

    switch (type) {
        case 'SEARCH_PRODUCTS':
            return { ...state, searchProducts: payload };
        default:
            return {
                state
            };
    }
}

export default searchProductsReducer;