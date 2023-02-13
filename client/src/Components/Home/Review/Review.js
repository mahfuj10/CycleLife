import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import AOS from 'aos';
import { FaQuoteLeft } from 'react-icons/fa';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import reviewBanner from '../../../images/review-banner.jpg';
import { Typography } from '@mui/material';

const Review = () => {

    const [reviews, setReviews] = useState([]);
    // fetch data
    useEffect(() => {
        fetch('     https://cyclelifeexclusive-backend-production.up.railway.app/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, []);

    // data aos
    useEffect(() => {
        AOS.init({
            duration: 2000,
        });
    }, []);

    // review box
    const reivewBox = {
        width: '400px',
        height: '300px',
        background: 'rgba(0,0,0,0.5)',
        padding: '10px 30px',
        color: "white",
    };
    // review quote
    const reviewQuote = {
        color: 'rgb(169 165 165 / 50%)',
        position: "absolute",
        marginTop: '30px'
    };

    // react slider
    const slickSlider = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };



    return (

        <Box
            sx={{
                backgroundImage: `url(${reviewBanner})`,
                width: '100%',
                backgroundSize: 'calc(100%)',
                backgroundAttachment: 'fixed',
                paddingBottom: 20
            }}
        >

            <div className="container" >
                <Typography data-aos="fade-up" variant='h1' sx={{ fontFamily: 'Hikou Outline', color: "#ffffff9e", fontSize: '70px', pt: 10, letterSpacing: 6 }}>Customer Review</Typography>

                <Typography variant='h1' sx={{ color: "whitesmoke", fontSize: '30px', mt: -3, letterSpacing: 1, fontWeight: 600, paddingBottom: "5%" }}>WHAT OUR CLIENT SAYS</Typography>

                <Slider {...slickSlider} className='user-feedback' style={reivewBox}>
                    {
                        reviews.map(review => <Box key={review._id}>
                            <Typography variant='h2'> <FaQuoteLeft style={reviewQuote} /></Typography>
                            <Typography sx={{ fontSize: "14px", mt: 8 }} variant='h6'>
                                {review.description}
                            </Typography>
                            <Typography variant='h6' sx={{ fontSize: '17px', mt: 2 }}>
                                ---   {review.name}
                            </Typography>

                        </Box>
                        )
                    }
                </Slider>
            </div>
        </Box >
    );
};

export default Review;