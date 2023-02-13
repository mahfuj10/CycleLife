import { Alert, Button, Paper, Typography, Box } from '@mui/material';
import React from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io5';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Navbar from '../../Home/Navigation/Navigation/Navigation';
import useAuth from '../../Hooks/useAuth';

const RegisterBox = () => {

    const { registerUser, handaleGoogleSign, error, success } = useAuth();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const location = useLocation();




    // register form input
    const inputStyle = {
        width: '100%',
        marginBottom: "20px",
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #98a1bc',
        background: "#1D2029"
    };

    // input label
    const labelInput = {
        fontSize: '14px',
        fontWeight: 600,
        color: '#98a1bc',
        marginBottom: 5
    };

    // submit button
    const submitButton = {
        display: "block",
        border: '1px solid #98a1bc',
        padding: '10px 50px',
        borderRadius: '25px',
        color: '#98a1bc',
        marginTop: 15,
        width: '100%',
        background: "#1D2029"
    };

    // provider button style
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

    // register user
    const handaleRegisterUser = e => {
        e.preventDefault();
        if (password !== rePassword) {
            alert("Password doesn't match try again.");
            return;
        };
        registerUser(email, password, name, history, location);

    };





    return (
        <>
            <Navbar />

            <Box sx={{ width: '100%', height: '100vh', typography: 'body1', display: 'grid', justifyContent: 'center', alignItems: 'center', background: '#111318' }}>

                <Box sx={{ position: "absolute" }}>
                    {success && <Alert sx={{ mt: 5, mb: 2 }} severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>

                <Paper elevation={5} sx={{ width: '420px', p: 3, background: "#1D2029" }}>
                    <Typography variant='h5' sx={{ fontWeight: 600, mb: 2, color: "whitesmoke" }}>Register</Typography>

                    <form onSubmit={handaleRegisterUser}>

                        <label style={labelInput}>Name *</label>
                        <input onChange={e => setName(e.target.value)} style={inputStyle} type="text" required />

                        <label style={labelInput}>Email *</label>
                        <input onChange={e => setEmail(e.target.value)} style={inputStyle} type="email" required />

                        <label style={labelInput}> Password *</label>
                        <input onChange={e => setPassword(e.target.value)} style={inputStyle} type="password" required />

                        <label style={labelInput}> Retype Password *</label>
                        <input onChange={e => setRePassword(e.target.value)} style={inputStyle} type="password" required />


                        <label style={{ fontWeight: 600, fontSize: '14px', color: "#98a1bc" }}>Already have an account? <Link to="/login">Login here</Link></label>

                        <button type='submit' style={submitButton}>Register <BiLogInCircle /></button>

                    </form>

                    <Typography sx={{ textAlign: 'center', fontWeight: 600, color: "#98a1bc", mt: 1, mb: 1 }}>   <small>------------------------------------ or ----------------------------------</small></Typography>

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
                </Paper>


            </Box>



        </>
    );
};

export default RegisterBox;