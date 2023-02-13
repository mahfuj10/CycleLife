import React, { createContext, useEffect, useContext } from 'react';
import { Divider, Drawer, List, ListItem, ListItemText, AppBar, Box, Toolbar, IconButton, Typography, Menu, Avatar, Button, Tooltip, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { GrLogout } from 'react-icons/gr';
import { useTheme } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import CartDrawer from '../../CartDrawer/CartDrawer';
import LoginModal from '../../../Login/LoginModal/LoginModal';
import useAuth from '../../../Hooks/useAuth';
import { makeStyles } from '@mui/styles';
import { AiOutlineHome } from 'react-icons/ai';
import { BsBicycle } from 'react-icons/bs';
import { MdOutlineDashboard } from 'react-icons/md';
import { searchName } from '../../../../Redux/actions/action';
import { useDispatch } from 'react-redux';



const Navbar = () => {

    const theme = useTheme();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [state, setState] = React.useState(false);
    const { user, handaleLogOut } = useAuth();

    // setSearchValue("Hello world")
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // nav button
    const navButton = {
        width: "45px",
        height: "45px",
        borderRadius: "50px",
        padding: "8px",
        marginRight: '20px',
        backgroundColor: "#1D2029",
        color: "whiteSmoke"
    };
    // link of navbar
    const navLink = {
        textDecoration: "none",
        color: "white",
        marginRight: "15px",
        letterSpacing: "3px",
        fontSize: '15px'
    };
    // dispacth(searchName(text))
    // drawer open
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    };

    // set search value on redux
    const dispatchSearchValue = e => {
        dispatch(searchName(e.target.value));
    }

    // search popup

    const openSearchBox = () => {
        document.querySelector("#myOverlay").style.display = "block";
    };
    const closeSearchBox = () => {
        document.querySelector("#myOverlay").style.display = "none";
    };

    // form submit
    const handaleSubmitForm = e => {
        e.preventDefault();
    };

    // trigger button
    useEffect(() => {
        let input = document.getElementById("search");
        input.addEventListener("keyup", event => {
            if (event.keyCode === 13) {
                event.preventDefault();
                closeSearchBox();
            }
        });

    }, []);

    // style sheets

    const useStyle = makeStyles({
        navIcon: {
            [theme.breakpoints.up('md')]: {
                display: "none !important",

            },
            [theme.breakpoints.down('md')]: {
                marginLeft: '95% !important'
            }
        },
        navbar: {
            [theme.breakpoints.down('md')]: {
                height: '70px !important'
            }
        },

        navItemContainer: {
            [theme.breakpoints.down('md')]: {
                display: "none !important"
            }
        },
        navLogo: {
            [theme.breakpoints.down('md')]: {
                position: 'absolute',
                bottom: '70px'
            }
        }

    });
    const { navIcon, navItemContainer, navLogo, navbar } = useStyle();

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"

        >
            <List sx={{ mt: '50%' }}>
                <Divider sx={{ color: '#98a1bc' }} />
                <Link to="/" style={{ textDecoration: "none", color: "#98a1bc" }}>
                    <ListItem button>
                        <ListItemText>
                            <AiOutlineHome />  HOME
                        </ListItemText>
                    </ListItem>
                </Link>
                <Divider sx={{ color: '#98a1bc' }} />
                <Link to="/cycles" style={{ textDecoration: "none", color: "#98a1bc" }}>
                    <ListItem button >
                        <ListItemText>

                            <BsBicycle />    CYCLES

                        </ListItemText>
                    </ListItem>
                </Link>
                <Divider sx={{ color: '#98a1bc' }} />
                <Link to="/dashboards" style={{ textDecoration: "none", color: "#98a1bc" }}>
                    <ListItem button >
                        <ListItemText>
                            <MdOutlineDashboard />   DASHBOARD
                        </ListItemText>
                    </ListItem>
                </Link>
                <Divider sx={{ color: '#98a1bc' }} />
                <ListItem>
                    {user.email && <ListItemText sx={{ color: "#98a1bc" }}>
                        <img src={user?.photoURL} style={{ width: '40px', borderRadius: "50%", marginRight: '10px' }} alt="userImage" />
                        {user?.displayName}
                    </ListItemText>}
                </ListItem>
                {user.email && <Divider sx={{ color: '#98a1bc' }} />}

            </List>
        </Box>
    );

    return (
        <>
            <AppBar className={navbar} position="fixed" sx={{ background: 'rgba(0,0,0,0.5)', paddingX: 3, paddingY: 1 }}>
                {/* <Container maxWidth="xl"> */}
                <IconButton
                    sx={{ mr: 40, zIndex: 999999 }}
                    onClick={() => setState(true)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    style={{ zIndex: '99' }}
                    // sx={{ mr: 0, color: "#F73E7B" }}
                    className={navIcon}
                >
                    <MenuIcon />
                </IconButton>

                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: "space-between", ml: 2 }}>

                    <Box>
                        <Typography
                            variant="h6"
                            noWrap
                            className={navLogo}
                            component="div"
                        >
                            cycleLife
                        </Typography>
                    </Box>
                    {/* className='nav-items' */}
                    <Box style={{ zIndex: '9999' }} className={navItemContainer}>

                        <Button variant='text'><NavLink style={navLink} to="/home">HOME</NavLink></Button>

                        <Button variant='text'> <NavLink style={navLink} to="/cycles">CYCLES</NavLink></Button>

                        {/* <Button variant="text"> <NavLink style={navLink} to="/dashboard ">DASHBOARD</NavLink></Button> */}

                        <Button variant='text'> <NavLink style={navLink} to="/dashboards">DASHBOARD</NavLink></Button>

                        <Button variant="text"> <NavLink style={navLink} to="/">CONTACT US</NavLink></Button>


                    </Box>

                    <Box className={navItemContainer}>
                        {/* search button */}
                        <Tooltip arrow title="Search...">
                            <SearchIcon type="button" onClick={openSearchBox} style={navButton} />
                        </Tooltip>
                        {/* cart button */}
                        <Tooltip arrow title="My cart">
                            <LocalMallOutlinedIcon
                                type="button"
                                onClick={handleDrawerOpen}
                                style={navButton} />
                        </Tooltip>


                        {
                            !user.email && <Button variant='text'>
                                <Tooltip arrow title="My account">
                                    <ManageAccountsIcon
                                        onClick={() => setOpenModal(true)}
                                        style={navButton} />
                                </Tooltip>
                            </Button>
                        }

                        {user.email && <Tooltip arrow title="My Account">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={user?.photoURL} />
                            </IconButton>
                        </Tooltip>}
                        {user.email &&
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {/* menu items */}
                                <MenuItem sx={{ display: 'grid', gap: 1, justifyContent: 'center' }}>

                                    <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <img style={{ borderRadius: '50%', margin: '0 auto' }} src={user?.photoURL} alt="" />
                                    </Typography>

                                    <Typography sx={{ textAlign: 'center' }}>
                                        {user?.displayName}
                                    </Typography>

                                    <Typography sx={{ textAlign: 'center' }}>
                                        {user?.email}
                                    </Typography>
                                    <Typography
                                        sx={{ textAlign: 'center' }}
                                        onClick={handaleLogOut}>
                                        <GrLogout />   Log Out
                                    </Typography>
                                </MenuItem>
                            </Menu>
                        }
                    </Box>

                    {/* cart drawer */}
                    <CartDrawer
                        openDrawer={openDrawer}
                        setOpenDrawer={setOpenDrawer}
                    />
                    {/* login modal */}
                    <LoginModal
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />

                </Toolbar>
            </AppBar >
            <React.Fragment >
                <Drawer
                    open={state}
                    onClose={() => setState(false)}
                >
                    {list}
                </Drawer>
            </React.Fragment>


            <Box id="myOverlay" className="overlay">
                <span className="closebtn" onClick={closeSearchBox} title="Close Overlay">×</span>
                <Box className="overlay-content">
                    <form id='search' onSubmit={handaleSubmitForm}>
                        <input onChange={dispatchSearchValue} type="search" placeholder="Search.." name="search" />
                    </form>
                </Box>
            </Box>

        </>
    );
};
export default Navbar;
