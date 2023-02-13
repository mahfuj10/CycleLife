import { useHistory } from "react-router";
import Swal from "sweetalert2";
import useAuth from "./useAuth";

const useCart = () => {

    const { user } = useAuth();
    const history = useHistory();

    // product added on cart

    const AddToCart = product => {
        if (!user.email) {
            history.push('/login')
            return
        }
        product.email = user.email;
        product.payment = 'unpaid';
        product.status = 'pending';
        fetch('https://cyclelifeexclusive-backend-production.up.railway.app/addToCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire(
                    'Added !',
                    'This product added on your cart.',
                    'success'
                );
            });
    };



    return {
        AddToCart
    };


};

export default useCart;