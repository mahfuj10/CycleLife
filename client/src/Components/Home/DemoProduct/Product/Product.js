import React, { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../../../Style/Style.css';
import { AiOutlinePlus } from 'react-icons/ai'
import { CardActionArea, Grid, Tooltip } from '@mui/material';
import Rating from 'react-rating';
import { Box } from '@mui/system';
import ViewModal from '../../SingleProduct/ViewModal/ViewModal';
import useCart from '../../../Hooks/useCart';

const Product = ({ product }) => {

    const { name, image, price, rating, oldPrice } = product;
    const { AddToCart } = useCart();
    const [openModal, setOpenModal] = React.useState(false);

    // badge style
    const badge = {
        background: "white",
        fontWeight: 600,
        padding: '4px 1px',
        color: "black",
        display: "flex",
        alignItems: "center",
        width: '60px',
        justifyContent: "center",
        borderRadius: '25px',
        fontSize: '11px',
        margin: "10px",
        position: "absolute"
    };

    // data aos
    useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 500,
            easing: 'ease',
        });
    }, []);
    // sx={{ display: 'flex', justifyContent: "center" }}

    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={3} sx={{ display: 'flex', justifyContent: "center" }}>
                <Card className="cycle" data-aos="fade-up" sx={{ maxWidth: '300px' }} style={{ background: "rgb(39 42 51)" }}>
                    <CardActionArea>
                        <span style={badge}>20% off</span>
                        <aside
                            onClick={() => setOpenModal(true)}
                            style={{ width: '300px', height: "274px", background: "rgb(190 189 189)" }}
                        >
                            <CardMedia
                                component="img"
                                image={image}
                                alt="cycleImage"
                            />
                        </aside>
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

                            <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                                <Typography variant="h6" sx={{ fontSize: '15px', mt: 1, fontWeight: 600, color: 'whitesmoke' }}>
                                    <span >${price}.00</span> <span style={{ textDecoration: "line-through" }}>{oldPrice}.00</span>
                                </Typography>

                                <Tooltip title="Add To Cart" arrow placement="right-start">
                                    <button
                                        onClick={() => AddToCart(product)}
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
                product={product}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        </>
    );
};

export default Product;