import { Alert, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { BiLogInCircle } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoFacebook } from 'react-icons/io5';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';

const Register = () => {

    const { registerUser, success, error } = useAuth();
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [rePassword, setRePassword] = React.useState('');
    const [password, setPassword] = React.useState('');
    const history = useHistory();
    const location = useLocation();

    const handaleSubmitForm = e => {
        e.preventDefault();
        if (password !== rePassword) {
            alert("Password does't ! match type again.");
            return;
        }
        registerUser(email, password, name, history, location);
    }

    const inputStyle = {
        width: '100%',
        marginBottom: "20px",
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #98a1bc',
        background: "#1D2029"
    }

    // form submit button
    const submitButton = {
        display: "block",
        border: '1px solid #98a1bc',
        padding: '10px 50px',
        borderRadius: '25px',
        color: '#98a1bc',
        marginTop: 10,
        width: '100%',
        background: "#1D2029"
    };

    // google and facebook login button
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



    const { handaleGoogleSign } = useAuth();

    return (
        <>
            <form className='register-form' onSubmit={handaleSubmitForm}>

                <input onChange={e => setName(e.target.value)} placeholder='Your name *' style={inputStyle} type="text" required />


                <input onChange={e => setEmail(e.target.value)} placeholder='Your email *' style={inputStyle} type="email" required />
                <input onChange={e => setPassword(e.target.value)} placeholder='Your password *' style={inputStyle} type="password" required />

                <input onChange={e => setRePassword(e.target.value)} placeholder='Retype password *' style={inputStyle} type="password" required />


                <button type='submit' style={submitButton}><BiLogInCircle /> Register </button>

                <Typography sx={{ textAlign: 'center', fontWeight: 600, color: "#98a1bc", mt: 1, mb: 1 }}>   <small>----------------------------- or ------------------------------------</small></Typography>

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

                {success && <Alert sx={{ mt: 2, mb: 2 }} severity="success">{success}</Alert>}
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            </form>
        </>
    );
};

export default Register;