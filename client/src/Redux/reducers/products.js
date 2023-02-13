const initialState = {
    products: []
}

const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "PRODUCTS":
            return { ...state, products: payload }
        default:
            return {
                state
            }
    }
}


export default productReducer;