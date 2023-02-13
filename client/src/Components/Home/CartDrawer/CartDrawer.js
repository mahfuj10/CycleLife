import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import cartBag from '../../../images/cart-bag.png';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CartProduct from '../CartProduct/CartProduct';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import '../../Style/Style.css';
import { useHistory } from 'react-router-dom';

const drawerWidth = 350;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginRight: 0,
        }),
    }),
);



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function CartDrawer({ openDrawer, setOpenDrawer }) {

    const theme = useTheme();
    const [cartPorducts, setProducts] = React.useState([]);
    const { user } = useAuth();
    const history = useHistory();

    // total amount of cart
    let total = 0;
    for (const product of cartPorducts) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        total = total + product.price * product.quantity;
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const shopButton = {
        backgroundColor: "white",
        border: '1px solid #262931',
        color: "#262931",
        fontWeight: 600
    };
    const proceedText = {
        display: 'flex',
        justifyContent: 'space-between',
        marginX: 2,
        color: "#111318",
        fontSize: '18px',
        fontWeight: 600
    };
    const proceedButton = {
        width: '90%',
        mt: 2,
        border: '1px solid #111318',
        background: "#FFFFFF",
        marginX: 2,
        color: "#262931",
        fontWeight: 600
    };

    React.useEffect(() => {
        fetch(`https://cyclelifeexclusive-backend-production.up.railway.app/myCart/${user?.email}`)
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [cartPorducts, user]);

    // delete cart product

    const handaleDeleteProduct = id => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {

            if (result.isConfirmed) {
                const uri = `https://cyclelifeexclusive-backend-production.up.railway.app/myCart/${id}`;
                fetch(uri, {
                    method: "DELETE",
                })
                    .then()
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        );
                        if (data.deleteCount > 0) {
                            const remainingCar = cartPorducts.filter(product => product._id !== id);
                            setProducts(remainingCar);
                        };
                    });

            };
        });
    };


    return (
        <Box sx={{ display: 'flex', position: "absolute" }}>
            <CssBaseline />

            <Main open={openDrawer}  >
                <DrawerHeader />
            </Main>
            <Drawer

                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
                variant="persistent"
                anchor="right"
                open={openDrawer}
            >
                <DrawerHeader onClick={() => setOpenDrawer(false)} >
                    <IconButton onClick={handleDrawerClose} sx={{ background: '#F6F9FC', color: 'black', position: 'fixed' }}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>


                {
                    cartPorducts.length === 0 ? <Box style={{ width: '100%', height: '100%', marginTop: '50%' }}>
                        <Box style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={cartBag} width="50% " alt="cartImage" />
                        </Box>
                        <Box style={{ display: 'grid', justifyContent: 'center' }}>
                            <Typography variant='body' style={{ fontWeight: 600, }}>Your cart is emty </Typography> <br />

                            <Button
                                onClick={() => history.push('/cycles')}
                                style={shopButton}>
                                SHOP NOW
                            </Button>
                        </Box>
                    </Box>
                        :
                        <Box>
                            <Typography variant='h6' sx={{ fontSize: '17px', fontWeight: 600, mb: 2, ml: 1 }}>Your cart items {cartPorducts.length}</Typography>
                            <Divider />

                            {
                                cartPorducts.map(product => <CartProduct
                                    handaleDeleteProduct={handaleDeleteProduct}
                                    key={product._id}
                                    product={product}
                                />
                                )
                            }

                            {cartPorducts[0]?.payment?.isPaid !== 'true' ? <Box sx={{ mt: '60%', mb: 5, }}>
                                <Typography variant='h6' sx={proceedText}>
                                    Subtotal: <span>
                                        ${total}</span>
                                </Typography>
                                <Typography variant='h6' sx={proceedText}>
                                    Delevery Cost: <span>
                                        $5</span>
                                </Typography>
                                <Typography variant='h6' sx={proceedText}>
                                    Total: <span>
                                        ${total + 5}</span>
                                </Typography>
                                <Button
                                    sx={proceedButton}
                                    onClick={() => history.push('/payment')} >
                                    Proceed to checkout
                                </Button>
                            </Box> :
                                <Box sx={{ mt: '60%', mb: 5 }}>
                                    <Typography variant='h6' sx={proceedText}>
                                        Total payment amount: <span>
                                            ${cartPorducts[0]?.payment?.amount / 100}
                                        </span>
                                    </Typography>
                                    <Typography variant='h6' sx={proceedText}>
                                        Created id : <span>
                                            {cartPorducts[0]?.payment?.created}
                                        </span>
                                    </Typography>
                                    <Typography variant='h6' sx={proceedText}>
                                        Last four digit of card : <span>
                                            {cartPorducts[0]?.payment?.last4}
                                        </span>
                                    </Typography>
                                    <Typography variant='h6' sx={proceedText}>
                                        Transsaction : <span>
                                            {cartPorducts[0]?.payment?.transsaction}
                                        </span>
                                    </Typography>
                                </Box>
                            }
                        </Box>
                }


            </Drawer>
        </Box >
    );
}
