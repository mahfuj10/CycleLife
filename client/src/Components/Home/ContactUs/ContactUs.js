import { Box, Button, Grid, Typography } from '@mui/material';
import { IoIosSend } from 'react-icons/io';
import React from 'react';
import '../../Style/Style.css';
import Aos from 'aos';


const ContactUs = () => {

    // input style
    const inputStyle = {
        width: '90%',
        marginBottom: "40px",
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #98a1bc',
        background: "#1D2029"
    };

    // submit button style
    const submitButton = {
        display: "block",
        border: '1px solid #98a1bc',
        padding: '10px 50px',
        borderRadius: '25px',
        color: '#98a1bc',
    }

    // data aos
    React.useEffect(() => {
        Aos.init({
            duration: 1000,
        });
    }, []);

    return (

        <Box className='contact-section' style={{ background: "#1D2029", padding: 50 }}>


            <Box className='container'>

                <Typography variant='h1'
                    data-aos="fade-up"
                    sx={{ fontFamily: 'Hikou Outline', color: "#98a1bc8c", fontSize: '70px', pt: 10, letterSpacing: 6 }}
                >
                    CONTACT US
                </Typography>

                <Typography variant='h1' sx={{ color: "#ffff", fontSize: '30px', mt: -3, letterSpacing: 2, mb: 10, fontWeight: 600 }}>GET IN TOUCH</Typography>

                <Grid container sx={{ alignItems: 'center', mb: 15 }}>

                    <Grid item xs={12} lg={6}>
                        <iframe
                            data-aos="fade-up"
                            className='google-map'
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116834.00977805836!2d90.34928591682575!3d23.78077774431569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1639818784287!5m2!1sen!2sbd"
                            height="430" style={{ border: '0px', width: '90%' }} allowFullScreen="" loading="lazy" title='locationOfShowroom'>

                        </iframe>
                    </Grid>

                    <Grid data-aos="fade-up" className='contact-form' item xs={12} lg={6} >

                        <input style={inputStyle} placeholder='Your Name *' type="name" />
                        <input style={inputStyle} type="email" placeholder='Your Email *' />
                        <textarea
                            style={inputStyle}
                            placeholder='Your Message *' rows="5"></textarea>
                        <Button type='submit' style={submitButton}><IoIosSend /> SEND</Button>

                    </Grid>

                </Grid>
            </Box>
        </Box >
    );
};

export default ContactUs;