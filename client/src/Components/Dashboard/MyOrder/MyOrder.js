import * as React from 'react';
import { Paper, TableRow, TableCell, Table, TableContainer, TableBody, TableHead } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';



const MyOrder = () => {

    const [orders, setOrders] = React.useState([]);
    const { user } = useAuth();

    React.useEffect(() => {
        fetch(`https://cyclelifeexclusive-backend-production.up.railway.app/myCart/${user?.email}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [orders, user]);

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
                            const remainingCar = orders.filter(product => product._id !== id);
                            setOrders(remainingCar);
                        };
                    });

            };
        });
    };


    return (
        <>
            <TableContainer elevation={5} className="container" component={Paper} sx={{ width: '50%', mt: 5 }} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pr: 15 }} align="right">Order Id</TableCell>
                            <TableCell align="right">Order Name</TableCell>
                            <TableCell align="right">Action</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order?._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ width: '15px' }} align="right">
                                    {order?._id}
                                </TableCell>

                                <TableCell align="right">{order?.name}</TableCell>
                                <TableCell align="right" >
                                    <DeleteIcon
                                        onClick={() => handaleDeleteProduct(order._id)}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {order.status}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default MyOrder;