import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { BsYoutube } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: "#0F1015", height: 'auto', width: '100%' }}>
            <Grid container className='container' sx={{ pt: 15, pb: 10 }}>
                <Grid item xs={6} lg={3}>
                    <Typography variant='h6' sx={{ color: "whitesmoke" }}>CYCLELIFE</Typography>
                    <Typography variant='body2' sx={{ color: "#98a1bc", mt: 2, textAlign: 'justify', width: '90%' }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium maxime voluptas perferendis ex ut magnam officiis iure nulla quae beatae.</Typography>
                    <Box sx={{ fontSize: '22px', color: '#98a1bc', display: 'flex', columnGap: '20px', mt: 2 }}>
                        <BsYoutube />
                        <BsFacebook />
                        <AiFillInstagram />
                    </Box>
                </Grid>
                <Grid item xs={6} lg={3}>
                    <Typography variant='h6' sx={{ color: "whitesmoke", mb: 2 }}>LINKS</Typography>
                    <Link to="/home">HOME</Link>
                    <Link to="/cycles">CYCLES</Link>
                    <Link to="/dashboards">DASHBOARD</Link>
                    <Link to="/login">LOGIN</Link>
                </Grid>
                <Grid item xs={6} lg={3}>
                    <Typography variant='h6' sx={{ color: "whitesmoke", mb: 2 }}>FACILITY</Typography>
                    <Link to="/home">FLASH SALE</Link>
                    <Link to="/cycles">CASH ON DALEVERY</Link>
                    <Link to="/dashboards">DASHBOARD</Link>
                    <Link to="/login">RETURN POLICY</Link>
                </Grid>
                <Grid item xs={6} lg={3}>
                    <Typography variant='h6' sx={{ color: "whitesmoke", mb: 2 }}>BRANDS</Typography>
                    <Link to="/home">VELOCE</Link>
                    <Link to="/cycles">MUSTANG</Link>
                    <Link to="/dashboards">DURANTA</Link>
                    <Link to="/login">FALCON</Link>
                </Grid>

            </Grid>
        </footer>
    );
};

export default Footer;