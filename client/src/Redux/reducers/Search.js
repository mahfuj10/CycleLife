

const searchReducer = (state = "", { type, payload }) => {

    switch (type) {
        case "SET_SEARCH_VALUE":
            return { ...state, payload }

        default:
            return {
                state
            }
    }

}

export default searchReducer;