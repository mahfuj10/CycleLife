import React, { useContext, useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import './Cycle.css';
import Aos from 'aos';
import Navbar from '../../Home/Navigation/Navigation/Navigation';
import Footer from '../../Home/Footer/Footer';
import Cycle from '../Cycle/Cycle';
import { searchProducts } from '../../../Redux/actions/action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { searchName } from '../../../Redux/actions/action';

const Cycles = () => {

    const [cycles, setCycles] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const size = 8;

    const search = useSelector(state => state.search?.payload);


    if (search === undefined) {
        dispatch(searchName(''))
    }

    // fetch data
    // https://cyclelifeexclusive-backend-production.up.railway.app/

    useEffect(() => {
        fetch(`https://cyclelifeexclusive-backend-production.up.railway.app/cycles?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setCycles(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / size);
                setPageCount(pageNumber);
            });
    }, [page]);

    // match product
    const matchProducts = cycles.filter(cycle => cycle.name.toLowerCase().includes(search?.toLowerCase()));

    // aos
    React.useEffect(() => {
        Aos.init({
            duration: 2000,
        });
    }, []);

    // pagination button
    const paginationButton = {
        height: 40,
        width: 40,
        borderRadius: '50%',
        border: '1px solid #262931',
        color: '#262931',
        fontWeight: 600,
        background: "#111318"
    };


    return (
        <>
            <section style={{ background: "#111318", overflow: "hidden", paddingBottom: '100px' }} >

                <Navbar />
                <Box className='container'>

                    <Typography variant='h1'
                        data-aos="fade-up"
                        sx={{ fontFamily: 'Hikou Outline', color: "#353B48", fontSize: '70px', pt: 16, letterSpacing: 6 }}
                    >
                        cyclelife
                    </Typography>

                    <Typography variant='h1'
                        sx={{ color: "#ffff", fontSize: '30px', mt: -3, letterSpacing: 3, mb: 10 }}
                    >
                        POPULAR CYCLE
                    </Typography>

                    {
                        matchProducts?.length === 0 ?
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <CircularProgress sx={{ color: 'whitesmoke' }} />
                            </Box>
                            :
                            <Grid container spacing={2}>
                                {
                                    matchProducts?.map(cycle => <Cycle
                                        key={cycle._id}
                                        cycle={cycle}
                                    />
                                    )
                                }

                            </Grid>}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>

                        {[...Array(pageCount).keys()].map(number => <button variant='contained'
                            className={number === page ? 'selected' : ''}
                            count={pageCount}
                            onClick={() => setPage(number)}
                            style={paginationButton}>
                            {number}
                        </button>
                        )}


                    </Box>
                </Box>
            </section>
            <Footer />
        </>
    );
};

export default Cycles;