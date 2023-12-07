import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, CssBaseline } from '@mui/material';
import AdminNav from '../components/AdminNav';

const drawerWidth = 240;

const UpdateOrders = () => {
  const [orders, setOrders] = useState([]);
  const getAllOrdersUrl = "http://localhost:8000/orders/";
  const updateOrderStatusUrl = "http://localhost:8000/orders"
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(getAllOrdersUrl);
        setOrders(response.data.orders);
      } catch (error) {
        console.error('Error fetching orders:', error.message);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
        const url = `${updateOrderStatusUrl}/${orderId}`;
        console.log("update url", url);
        console.log("newStatus ", newStatus);
        const req = {
            "status": newStatus,
          }
      const response = await axios.put(url, req);
      const updatedOrder = response.data;
      console.log("updatedOrder ", updatedOrder);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );

      
    } catch (error) {
      console.error('Error updating order status:', error.message);
    }
  };

  return (
    <>
       <Box sx={{ display: "flex"}}>
            <CssBaseline />
          <AdminNav/>
        <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
    <div>
    <h1 style={{margin:"30px"}}>Update Order Status</h1>
    </div>
        {/* <Paper sx={{ width: '100%', overflow: 'hidden' }} style={{margin:"10px 50px"}}> */}
        <Paper style={{margin:"80px 100px"}}>
            <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>User ID</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Action</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                    <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                        <select
                        className="form-select"
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                        <option value="order placed">Order Placed</option>
                        <option value="order confirmed">Order Confirmed</option>
                        <option value="out for delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                        </select>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        </Box>
        </Box>
    </>
    
  );
};

export default UpdateOrders;