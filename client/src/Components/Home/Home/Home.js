import { Box } from '@mui/material';
import React, { useState } from 'react';
import spinner from '../../../images/spinner.gif';
import Blogs from '../Blogs/Blogs';
import Footer from '../Footer/Footer';
import ContactUs from '../../Home/ContactUs/ContactUs';
import DemoProduct from '../DemoProduct/DemoProduct/DemoProduct';
import Header from '../Header/Header';
import Review from '../Review/Review';
import Navbar from '../Navigation/Navigation/Navigation';
import SmoothScroll from '../../SmoothScrollbar/SmoothScrollbar';

const Home = () => {

    const [isPageLoad, setIsPageLoad] = useState(true);
    // const [searchName, setSearchName] = useState('');

    const handaleLoadPage = () => {
        setIsPageLoad(false);
    };

    return (

        <Box onLoad={handaleLoadPage}>

            <Navbar />

            {
                isPageLoad === true &&
                <Box sx={{ height: '100vh', width: '100vw', background: "#000000", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={spinner} alt="loadingSpinner" />
                </Box>
            }

            {
                isPageLoad === false &&


                <Box>
                    <Header />
                </Box>
            }
            <DemoProduct />
            <Review />
            <Blogs />
            <ContactUs />
            <Footer />
            {/* <SearchBox /> */}


        </Box>
    );
};

export default Home;