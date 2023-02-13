import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
};

const MakeAdmin = ({ open, setOpen }) => {

    const [email, setEmail] = React.useState('');

    const onAdminEmailValue = e => {
        setEmail(e.target.value);
    }


    const handaleMakeAdmin = e => {
        const user = { email };

        fetch(`https://cyclelifeexclusive-backend-production.up.railway.app/users/admin`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    alert("make Admin sucessfully")
                }
            })

        e.preventDefault();

    }

    // const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <form onSubmit={handaleMakeAdmin}>
                            <Typography variant='h6' sx={{ mb: 2 }}>Make Admin</Typography>
                            <TextField
                                onChange={onAdminEmailValue}
                                sx={{ width: '100%' }}
                                required
                                label="Email" variant="outlined"
                            />
                            <Button type='submit' sx={{ width: '100%', p: 2, mt: 3 }} variant="outlined">update</Button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default MakeAdmin;