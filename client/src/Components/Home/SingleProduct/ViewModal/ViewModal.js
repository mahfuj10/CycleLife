import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { FaOpencart } from 'react-icons/fa';
import { GiTireIronCross } from 'react-icons/gi';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import Rating from 'react-rating';
import useCart from '../../../Hooks/useCart';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #1D2029',
    boxShadow: 24,
    background: '#1D2029',
    p: 4,
};

function ViewModal({ openModal, setOpenModal, product }) {

    const handleClose = () => setOpenModal(false);
    const { name, price, rating, image } = product;
    const { AddToCart } = useCart();

    const cartButton = {
        display: "block",
        border: '1px solid #98a1bc',
        padding: '7px 20px',
        borderRadius: '25px',
        color: '#98a1bc',
        marginTop: 15,
        zIndex: 888
    };

    const handleAddToCart = product => {
        AddToCart(product)
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={openModal}>
                    <Box sx={style} className='cycle-details-modal'>

                        <Grid container spacing={2} sx={{ alignItems: "center" }}>
                            <Grid item xs={12} md={6}>
                                <img width="100%" src={image} alt={name} />
                            </Grid>
                            <Grid item xs={12} md={6}>

                                <Box sx={{ position: 'absolute', ml: '45%', color: "#fff" }}>
                                    <GiTireIronCross onClick={handleClose} type='button' />
                                </Box>

                                <Typography variant='h5' sx={{ color: "#fff" }}>{name}</Typography>

                                <Typography variant='body2' sx={{ textAlign: 'justify', mt: 2, fontWeight: 600, color: "#98a1bc" }}>
                                    The health benefits of regular cycling
                                    increased cardiovascular fitness.
                                    increased muscle strength and flexibility.
                                    improved joint mobility.
                                    decreased stress levels.
                                    improved posture and coordination.
                                    strengthened bones.
                                    decreased body fat levels.
                                    prevention or management of disease.
                                </Typography>

                                <Typography variant='h6' sx={{ mt: 1 }}>

                                    <Rating
                                        initialRating={rating}
                                        style={{ color: "#98a1bc", letterSpacing: '4px' }}
                                        emptySymbol="far fa-star icon-color" fullSymbol="fas fa-star icon-color" readonly />

                                </Typography>

                                <Typography variant='h4' sx={{ color: "#fff", mt: 1 }}>${price}</Typography>

                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    style={cartButton}>
                                    <FaOpencart /> Add To Cart
                                </Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default ViewModal;