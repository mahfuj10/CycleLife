import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Box, Tooltip } from '@mui/material';
import { AiOutlinePlus } from 'react-icons/ai';
import React from 'react';
import useCart from '../../Hooks/useCart';
import Rating from 'react-rating';
import ViewModal from '../../Home/SingleProduct/ViewModal/ViewModal';

const Cycle = ({ cycle }) => {

    const { name, image, price, rating } = cycle;
    const { AddToCart } = useCart();
    const [openModal, setOpenModal] = React.useState(false);

    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: "center", mb: 3 }}>
                <Card data-aos="fade-up" className="cycle" sx={{ width: '300px', background: "rgb(39 42 51)" }} >
                    <CardActionArea>

                        <article
                            onClick={() => setOpenModal(true)}
                            // onClick={() => setOpenModal(true)}
                            style={{ width: '300px', height: "274px", background: "rgb(190 189 189)" }}
                        >
                            <CardMedia
                                component="img"
                                image={image}
                                alt="cycleImage"
                            />
                        </article>
                        <CardContent>
                            <Typography
                                onClick={() => setOpenModal(true)}
                                sx={{ color: "#fff", fontSize: '20px' }}
                                gutterBottom variant="h5" component="div"
                            >
                                {name}
                            </Typography>
                            <Rating
                                initialRating={rating}
                                style={{ fontSize: "12px", color: "whitesmoke", letterSpacing: 3 }}
                                emptySymbol="far fa-star icon-color" fullSymbol="fas fa-star icon-color" readonly />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography variant="h6" sx={{ fontSize: '15px', mt: 1, fontWeight: 600, color: 'whitesmoke' }}>
                                    <span >${price}.00</span>
                                </Typography>

                                <Tooltip title="Add To Cart" arrow placement="right-start">
                                    <button
                                        onClick={() => AddToCart(cycle)}
                                        style={{ background: '#1C1F28', border: '1px solid #fff', color: "#fff", padding: '5px 7px', fontWeight: '500' }}
                                    >
                                        <AiOutlinePlus />
                                    </button>
                                </Tooltip>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

            {/* product detials modal */}
            <ViewModal
                product={cycle}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

        </>


    );
};

export default Cycle;