import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Modal,
  TextField,
  Fab,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';

// Sample data
const chartData = [
  { name: 'Vegetables', value: 25 },
  { name: 'Milk', value: 15 },
  { name: 'Bread', value: 10 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

// Product Table Data
const initialRows = [
  { id: 1, name: 'Milk', quantity: 50, expires: '2024-07-20' },
  { id: 2, name: 'Vegetables', quantity: 30, expires: '2024-07-15' },
  { id: 3, name: 'Bread', quantity: 20, expires: '2024-07-12' },
];

const Dashboard = () => {
  const [rows, setRows] = useState(initialRows);
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', quantity: '', expires: '' });

  // Handle modal actions
  const handleAddProduct = () => {
    setRows([...rows, { id: rows.length + 1, ...newProduct }]);
    setOpenModal(false);
    setNewProduct({ name: '', quantity: '', expires: '' });
  };

  const handleDeleteProduct = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)', p: 3 }}>
        {/* Header */}
        <AppBar position="static" elevation={0}   sx={{ backgroundColor: '#1E1E2E' }} >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }} >
              Smart Inventory Management - Dashboard
            </Typography>
            <Button
              color="inherit"
              startIcon={<PrintIcon />}
              variant="outlined"
              onClick={() => alert('Report Generated!')}
            >
              Generate Report
            </Button>
          </Toolbar>
        </AppBar>

        {/* Dashboard Content */}
        <Container>
          <Grid container spacing={3} sx={{ marginTop: 2 }}>
            {/* Cards */}
            <Grid item xs={12} sm={4}>
              <Card elevation={3} sx={{ 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.3s ease', 
                  boxShadow: 6 // optional: stronger shadow on hover
                } 
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <ShoppingCartIcon fontSize="large" color="primary" sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.2)' } }} />
                    <Box ml={2}>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Total Products</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>100</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={3} sx={{ 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.3s ease', 
                  boxShadow: 6 
                } 
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <InventoryIcon fontSize="large" color="secondary" />
                    <Box ml={2}>
                      <Typography variant="h6">Expired Products</Typography>
                      <Typography variant="h4">12</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Card elevation={3} sx={{ 
                '&:hover': { 
                  transform: 'scale(1.05)', 
                  transition: 'transform 0.3s ease', 
                  boxShadow: 6 
                } 
              }}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <ShowChartIcon fontSize="large" color="success" />
                    <Box ml={2}>
                      <Typography variant="h6">Low Stock</Typography>
                      <Typography variant="h4">30%</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Waste Analytics */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="h6">Waste Analytics</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={100}>
                      {chartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Product Table */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Product Inventory</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{ padding: '8px 20px' }}
                    onClick={() => setOpenModal(true)}
                  >
                    Add Product
                  </Button>
                </Box>
                <TableContainer sx={{ maxHeight: 400 }}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Expires On</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            '&:hover': { 
                              backgroundColor: '#f4f4f4', 
                              cursor: 'pointer' 
                            }
                          }}
                        >
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.expires}</TableCell>
                          <TableCell>
                            <IconButton color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => handleDeleteProduct(row.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        {/* Floating Action Button */}
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
          onClick={() => setOpenModal(true)}
        >
          <AddIcon />
        </Fab>

        {/* Add Product Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              width: 400,
              margin: 'auto',
              mt: 10,
              p: 3,
              bgcolor: '#ffffff',
              borderRadius: 2,
              boxShadow: 24,
            }}
          >
            <Typography variant="h6" mb={2}>
              Add New Product
            </Typography>
            <TextField
              fullWidth
              label="Product Name"
              margin="normal"
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Quantity"
              margin="normal"
              onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
            />
            <TextField
              fullWidth
              label="Expires On"
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewProduct({ ...newProduct, expires: e.target.value })}
            />
            <Box mt={2} textAlign="right">
              <Button variant="contained" color="primary" onClick={handleAddProduct}>
                Add
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Dashboard;
