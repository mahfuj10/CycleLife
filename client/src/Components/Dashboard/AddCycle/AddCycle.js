import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Input, TextField } from '@mui/material';

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
};

const inputStyle = {
    width: '100%',
    marginTop: '20px'
};

function AddCycle({ openCycleModal, setOpenCycleModal }) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [rating, setRating] = useState('');

    const handleClose = () => setOpenCycleModal(false);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('rating', rating);
    formData.append('image', image);
    formData.append('price', price);
    const handaleSubmitReview = e => {

        e.preventDefault();

        fetch('https://cyclelifeexclusive-backend-production.up.railway.app/addCycle', {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('Added')
                }
            })
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openCycleModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openCycleModal}>
                    <Box sx={style}>
                        <Typography variant='h6'>Add Cycle</Typography>

                        <form onSubmit={handaleSubmitReview}>

                            <TextField required
                                onChange={e => setName(e.target.value)}
                                style={inputStyle}
                                label="Cycle Name" variant="outlined" />

                            <TextField
                                onChange={e => setPrice(e.target.value)}
                                style={inputStyle}
                                label="Price *"
                                variant="outlined"
                                type="number"
                            />
                            <label style={{ marginTop: '15px', marginBottom: '10px' }}>Rating</label>
                            <select
                                onChange={e => setRating(e.target.value)}
                                style={{
                                    width: '100%', border: '1px solid #e1e1e1', padding: '14px'
                                }}
                            >
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                                <option value="4">Four</option>
                                <option value="5">Five</option>
                            </select>
                            <label style={{ marginTop: '15px', marginBottom: '10px' }}>Image</label>
                            <label htmlFor="contained-button-file">
                                <Input
                                    onChange={e => setImage(e.target.files[0])}
                                    style={{
                                        width: '100%', border: '1px solid #e1e1e1', padding: '12px 50px'
                                    }}
                                    accept="image/*"
                                    id="contained-button-file"
                                    multiple type="file"
                                />
                            </label>


                            <input type="submit"
                                style={{ width: '100%', border: '1px solid #e1e1e1', background: '#ffff', marginTop: '25px', padding: '12px' }}
                            />

                        </form>



                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AddCycle;