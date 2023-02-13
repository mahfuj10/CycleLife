import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { TextareaAutosize, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    border: '2px solid white',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};

const inputStyle = {
    width: '100%',
    marginTop: '20px',
};

function AddReview({ openModal, setOpenModal }) {

    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const review = { name: name, description: message };

    const handleClose = () => setOpenModal(false);

    const handaleSubmitReview = e => {

        e.preventDefault();
        fetch('https://cyclelifeexclusive-backend-production.up.railway.app/addReview', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                handleClose();
                alert("Thanks for your review");
            })
    }


    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={style}>
                        <Typography variant='h6'>Add Review</Typography>

                        <form onSubmit={handaleSubmitReview}>

                            <TextField required onChange={e => setName(e.target.value)} style={inputStyle} label="Your Name" variant="outlined" />
                            <TextField style={inputStyle} label="Your Email" variant="outlined" />
                            <TextareaAutosize
                                required
                                onChange={e => setMessage(e.target.value)}
                                placeholder='Your Message'
                                minRows={4}
                                style={{ width: '100%', border: '1px solid #e1e1e1', marginTop: '20px' }}
                            />
                            <input type="submit"
                                style={{ padding: '6px 30px', border: '1px solid #e1e1e1', background: '#ffff', marginTop: '15px' }}
                            />

                        </form>

                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AddReview;