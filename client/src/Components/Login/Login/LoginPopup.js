import React, { useState } from 'react';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { FcGoogle } from 'react-icons/fc';
import '../../Style/Style.css';
import { BiLogInCircle } from 'react-icons/bi';
import { IoLogoFacebook } from 'react-icons/io5';
import { Button, Typography } from '@mui/material';
import useAuth from '../../Hooks/useAuth';
import Register from '../Register/Register';
import { useHistory, useLocation } from 'react-router';

function LoginPopup() {

    const [value, setValue] = useState('1');
    const [email, setEmail] = useState('');
    const [password, setPassword] = React.useState('');
    const { handaleGoogleSign, loginUser } = useAuth();
    const location = useLocation();
    const history = useHistory();

    // mui tab
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    // input style
    const inputStyle = {
        width: '100%',
        marginBottom: "20px",
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #98a1bc',
        background: "#1D2029"
    };



    // google and facebook button
    const provideButton = {
        background: '#1D2029',
        border: '1px solid #98a1bc',
        height: '50px',
        width: "40px",
        display: "flex",
        color: '#1092F3',
        marginRight: "40px",
        alignItems: "center",
    };

    // submit button style
    const submitButton = {
        display: "block",
        border: '1px solid #98a1bc',
        padding: '10px 50px',
        borderRadius: '25px',
        color: '#98a1bc',
        marginTop: 15,
        width: '100%'
    };




    // submit login form
    const handaleSubmitForm = e => {
        e.preventDefault();
        loginUser(email, password, location, history);

    };

    return (

        <Box sx={{ width: '100%', typography: 'body1', background: "#1D2029", height: '100%' }} >
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab style={{ color: "#98a1bc", fontWeight: 600 }} label="Login" value="1" />
                        <Tab style={{ color: "#98a1bc", fontWeight: 600 }} label="Register" value="2" />
                    </TabList>
                </Box>

                <TabPanel value="1" >

                    <form onSubmit={handaleSubmitForm} className='login-form' style={{ marginTop: '30px' }} >




                        <label style={{ color: '#98a1bc', marginBottom: 10 }}>Your Email *</label>
                        <input onChange={e => setEmail(e.target.value)} style={inputStyle} type="text" required />
                        <label style={{ color: '#98a1bc', marginBottom: 10 }}>Your password *</label>
                        <input onChange={e => setPassword(e.target.value)} style={inputStyle} type="password" required />

                        <Button type='submit' style={submitButton}><BiLogInCircle /> LOGIN</Button>


                    </form>

                    <Typography sx={{ textAlign: 'center', fontWeight: 600, color: "#98a1bc", mt: 3, mb: 1 }}>   <small>----------------------------- or ------------------------------------</small></Typography>

                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained"
                            onClick={() => handaleGoogleSign(location, history)}
                            style={provideButton}
                        >
                            <Typography variant='h5'>
                                <FcGoogle /></Typography>
                        </Button>
                        <Button variant="contained"
                            style={provideButton}
                        >
                            <Typography variant='h5'>
                                <IoLogoFacebook /></Typography>
                        </Button>
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Register />
                </TabPanel>
            </TabContext>
        </Box>
    );
}

export default LoginPopup;