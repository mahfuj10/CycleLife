import { Button, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ImCross } from 'react-icons/im';
import Rating from 'react-rating';

const CartProduct = ({ product, handaleDeleteProduct }) => {

    const { name, image, rating, price, _id, payment } = product;







    return (
        <>
            <Box type="button" className="cart-product" sx={{ display: 'flex', alignItems: 'center', pb: 2, columnGap: 2 }}>

                <img width="130" src={image} alt="productimage" />

                <Box>
                    <Typography variant='h6' sx={{ fontSize: '16px', fontWeight: 600 }}>{name}</Typography>
                    <Typography variant='body' sx={{ fontSize: '12px' }}>
                        <Rating
                            initialRating={rating}
                            style={{ color: "#FFAC0C" }}
                            emptySymbol="far fa-star icon-color" fullSymbol="fas fa-star icon-color" readonly />

                    </Typography>
                    <Typography variant='h6' sx={{ color: "#111318", fontSize: '18px', fontWeight: 600 }}>${price}</Typography>
                </Box>

                {
                    payment?.isPaid !== 'true' && <Button variant='text'
                        onClick={() => handaleDeleteProduct(_id)}
                        sx={{ color: "#111318" }}
                    >
                        <ImCross />
                    </Button>
                }

            </Box>
            <Divider />
        </>
    );
};

export default CartProduct;