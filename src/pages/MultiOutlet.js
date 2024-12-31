import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"; // Import the reusable Sidebar component
import { Grid, Card, Typography, TextField, Select, MenuItem, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MultiOutletManagement = () => {
  const [fromOutlet, setFromOutlet] = useState('outlet1');
  const [toOutlet, setToOutlet] = useState('outlet2');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    // Handle inventory transfer logic here
    console.log('Inventory Transfer:', { fromOutlet, toOutlet, productName, quantity });
  };

  return (
    <div className="multi-outlet-management" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar /> {/* Reuse the Sidebar component */}

      <div className="main-content" style={{ flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#f5f5f5' }}>
        {/* Header with background color */}
        <div style={{ backgroundColor: '#1E1E2E', padding: '15px', borderRadius: '8px', marginBottom: '2rem' }}>
          <Typography variant="h6" align="center" style={{ color: '#ecf0f1' }} gutterBottom>
            Multi-Outlet Inventory Management
          </Typography>
        </div>

        <Grid container spacing={3} style={{ marginBottom: '2rem' }}>
          {/* Summary Cards */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#ecf0f1' }}>
              <Typography variant="h6" align="center" gutterBottom>
                Outlet 1
              </Typography>
              <Typography>Total Stock: 200</Typography>
              <Typography>Critical Items: 10</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined" style={{ padding: '1rem', backgroundColor: '#ecf0f1' }}>
              <Typography variant="h6" align="center" gutterBottom>
                Outlet 2
              </Typography>
              <Typography>Total Stock: 150</Typography>
              <Typography>Critical Items: 5</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Table with scroll */}
        <TableContainer component={Paper} style={{ marginBottom: '2rem', overflowX: 'auto' }}>
          <Table>
            <TableHead style={{ backgroundColor: '#E0E0E0' }}>
              <TableRow>
                <TableCell style={{ color: '#000', fontWeight: 'bold' }}>
                  <Typography variant="h6">Outlet Name</Typography>
                </TableCell>
                <TableCell style={{ color: '#000', fontWeight: 'bold' }}>
                  <Typography variant="h6">Product Name</Typography>
                </TableCell>
                <TableCell style={{ color: '#000', fontWeight: 'bold' }}>
                  <Typography variant="h6">Stock</Typography>
                </TableCell>
                <TableCell style={{ color: '#000', fontWeight: 'bold' }}>
                  <Typography variant="h6">Expired Items</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>Outlet 1</TableCell>
                <TableCell>Milk</TableCell>
                <TableCell>50</TableCell>
                <TableCell>2</TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>Outlet 2</TableCell>
                <TableCell>Eggs</TableCell>
                <TableCell>30</TableCell>
                <TableCell>0</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* Transfer Form */}
        <Card variant="outlined" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <Typography variant="h6" gutterBottom>
            Transfer Inventory
          </Typography>
          <form onSubmit={handleSubmitTransfer}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="From Outlet"
                  value={fromOutlet}
                  onChange={(e) => setFromOutlet(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="outlet1">Outlet 1</MenuItem>
                  <MenuItem value="outlet2">Outlet 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="To Outlet"
                  value={toOutlet}
                  onChange={(e) => setToOutlet(e.target.value)}
                  variant="outlined"
                >
                  <MenuItem value="outlet1">Outlet 1</MenuItem>
                  <MenuItem value="outlet2">Outlet 2</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  variant="outlined"
                  fullWidth
                  type="number"
                />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Submit Transfer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>

       
      </div>
    </div>
  );
};

export default MultiOutletManagement;
