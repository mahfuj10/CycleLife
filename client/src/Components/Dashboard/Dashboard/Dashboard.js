import { CardActionArea, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { HiUserAdd } from 'react-icons/hi';
import { CgMenuGridO } from 'react-icons/cg';
import { MdReviews } from 'react-icons/md';
import { FaOpencart } from 'react-icons/fa';
import { BsBicycle } from 'react-icons/bs';
import React from 'react';
import ManageOrder from '../ManageOrder/ManageOrder';
import AddReview from '../AddReivew/AddReview';
import Navbar from '../../Home/Navigation/Navigation/Navigation';
import MakeAdmin from '../MakeAdmin/MakeAdmin';
import { Route, Switch, useRouteMatch } from 'react-router';
import MyOrder from '../MyOrder/MyOrder';
import { Link } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import AddCycle from '../AddCycle/AddCycle';

const Dashboard = () => {

    const [openModal, setOpenModal] = React.useState(false);
    const [adminModal, setAdminModal] = React.useState(false);
    const [openCycleModal, setOpenCycleModal] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin } = useAuth();

    return (
        <Box sx={{ height: '100vh', width: "100vw", background: "#111318" }}>
            <Navbar />


            <Box sx={{ display: "flex", flexWrap: 'wrap', justifyContent: 'center', columnGap: '50px', mb: 10 }}>



                <Paper elevation={5} sx={{ width: '200px', mt: 20, background: "#1D2029", color: "#98a1bc" }}>
                    <CardActionArea>
                        <Box
                            onClick={() => setOpenModal(true)}
                            sx={{ display: 'grid', justifyContent: 'center', p: 2 }}
                        >
                            <MdReviews style={{ fontSize: '50px', marginLeft: '30px' }} />
                            <Typography variant='h6'>Add Reivew</Typography>
                        </Box>
                    </CardActionArea>
                </Paper>

                <Link to={`${url}/myOrder`} style={{ textDecoration: 'none' }}>
                    <Paper elevation={5} sx={{ width: '200px', mt: 20, background: "#1D2029", color: "#98a1bc" }}>
                        <CardActionArea>
                            <Box
                                sx={{ display: 'grid', justifyContent: 'center', p: 2 }}
                            >
                                <FaOpencart style={{ fontSize: '50px', marginLeft: '15px' }} />
                                <Typography variant='h6'>My Orders</Typography>
                            </Box>
                        </CardActionArea>
                    </Paper>
                </Link>

                {
                    admin && <Box sx={{ display: "flex", flexWrap: 'wrap', columnGap: '50px' }} >
                        <Link to={`${url}/manageOrder`} style={{ textDecoration: 'none' }}>
                            <Paper elevation={3} sx={{ width: '200px', mt: 20, background: "#1D2029", color: "#98a1bc" }}>
                                <CardActionArea>
                                    <Box
                                        sx={{ display: 'grid', justifyContent: 'center', p: 2 }}
                                    >
                                        <CgMenuGridO style={{ fontSize: '50px', marginLeft: '30%' }} />
                                        <Typography variant='h6'>Manage Order</Typography>
                                    </Box>
                                </CardActionArea>
                            </Paper>
                        </Link>

                        <Paper elevation={3} sx={{ width: '200px', mt: 20, background: "#1D2029", color: "#98a1bc" }}>
                            <CardActionArea>
                                <Box
                                    onClick={() => setAdminModal(true)}
                                    sx={{ display: 'grid', justifyContent: 'center', p: 2 }}
                                >
                                    <HiUserAdd style={{ fontSize: '50px', marginLeft: '30px' }} />
                                    <Typography variant='h6'>Make Admin</Typography>
                                </Box>
                            </CardActionArea>
                        </Paper>

                        <Paper elevation={3} sx={{ width: '200px', mt: 20, background: "#1D2029", color: "#98a1bc" }}>
                            <CardActionArea>
                                <Box
                                    onClick={() => setOpenCycleModal(true)}
                                    sx={{ display: 'grid', justifyContent: 'center', p: 2 }}
                                >
                                    <BsBicycle style={{ fontSize: '50px', marginLeft: '30px' }} />
                                    <Typography variant='h6'>Add Cycle</Typography>
                                </Box>
                            </CardActionArea>
                        </Paper>
                    </Box>
                }
            </Box>


            {/* nested route */}
            <Switch>
                <Route path={`${path}/myOrder`}>
                    <MyOrder />
                </Route>

                <Route path={`${path}/manageOrder`}>
                    <ManageOrder />
                </Route>
            </Switch>



            {/* review modal */}
            <AddReview
                openModal={openModal}
                setOpenModal={setOpenModal}
            />

            {/* Make admin modal */}
            <MakeAdmin
                open={adminModal}
                setOpen={setAdminModal}
            />

            {/* Add cycle */}
            <AddCycle
                openCycleModal={openCycleModal}
                setOpenCycleModal={setOpenCycleModal}
            />
        </Box>
    );
};

export default Dashboard;