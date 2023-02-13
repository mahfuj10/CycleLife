import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Alert from '@mui/material/Alert';
import { CircularProgress, Paper } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import '../../Style/Style.css';



const CheckoutForm = ({ price }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [process, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState("");
    const name = 'Mahfujur Rahman';
    const { user } = useAuth();
    const email = "mahfujglobal@gmail.com";




    useEffect(() => {
        fetch('https://cyclelifeexclusive-backend-production.up.railway.app/createPayment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret);
            });

    }, [price]);

    // pay button
    const payButton = {
        border: '1px solid #98a1bc',
        padding: '5px 30px',
        borderRadius: '25px',
        color: '#fff',
        background: "#1D2029",
        marginTop: '30px'
    }

    const HandleSubmit = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        };
        setProcessing(true)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {

            setSuccess("");
            setError(error.message);
        }
        else {
            setError('');
        };
        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message)
        }
        else {
            setError('');
            setSuccess("your payment is done");
            setProcessing(false);

            // save to database
            const payment = {
                amount: paymentIntent.amount,
                created: paymentIntent.created,
                last4: paymentMethod.card.last4,
                isPaid: "true",
                transsaction: paymentIntent.client_secret.slice('_secret')[0]
            };
            const uri = `https://cyclelifeexclusive-backend-production.up.railway.app/cartProducts/${user.email}`
            fetch(uri, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {

                })

        };
    };


    return (
        < >
            <form onSubmit={HandleSubmit} className="payment-form" style={{ display: "flex", justifyContent: 'center' }}>
                <Paper elevation={5}
                    sx={{ background: "#111318", mt: 20, p: 4, width: 500, mb: 2 }}
                >
                    <CardElement

                        options={{
                            style: {

                                base: {
                                    fontSize: '16px',
                                    color: '#fff',
                                    '::placeholder': {
                                        color: '#98a1bc',
                                    },
                                },
                                invalid: {
                                    color: 'red',
                                },
                            },
                        }}
                    />
                    {process && !error ? <CircularProgress /> : <button style={payButton} type="submit" disabled={!stripe}>
                        Pay $ {price}
                    </button>}

                    {success && <Alert sx={{ mt: 2, mb: 2 }} severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>
                    }
                </Paper>
            </form>

        </>
    );
};

export default CheckoutForm;