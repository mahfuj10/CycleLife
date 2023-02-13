const addCartReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_CART':
            return {

            }
        default:
            return state;
    }

}
export default addCartReducer;