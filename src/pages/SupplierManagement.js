import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Ensure Sidebar.js is in the same directory
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Box,
  Tooltip,
  InputAdornment,
  Card,
  CardContent,
  Stack,
  Button,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

const categories = ['Dairy Products', 'Beverages', 'Fruits', 'Vegetables', 'Frozen Foods', 'Meat, Poultry, and Seafood','Bakery' ,'Prepared Foods'];

const SupplierManagement = () => {
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Hamsa', contact: '1234567890', email: 'hamsa@example.com', address: 'Perambur', status: 'Active', category: 'Dairy Products' },
    { id: 2, name: 'Ramiya', contact: '9876543210', email: 'ramiya@example.com', address: 'Kondungaiyur', status: 'Inactive', category: 'Beverages' },
    { id: 3, name: 'Keerthi', contact: '5555555555', email: 'keerthi@example.com', address: 'Anna Nagar', status: 'Active', category: 'Fruits' },
    { id: 4, name: 'Monisha', contact: '3216549870', email: 'monisha@example.com', address: 'Choolai', status: 'Active', category: 'Vegetables' },
    { id: 5, name: 'Nisha', contact: '6543210987', email: 'nisha@example.com', address: 'T Nagar', status: 'Inactive', category: 'Bakery' },
    { id: 6, name: 'Divya', contact: '4443332222', email: 'divya@example.com', address: 'Mylapore', status: 'Active', category: 'Bakery' },
    { id: 7, name: 'Sundari', contact: '7776665555', email: 'sundari@example.com', address: 'Egmore', status: 'Inactive', category: 'Dairy Products' },
    { id: 8, name: 'Pavithra', contact: '8887776666', email: 'pavithra@example.com', address: 'Royapettah', status: 'Active', category: 'Beverages' },
    { id: 9, name: 'Anjali', contact: '9998887777', email: 'anjali@example.com', address: 'Teynampet', status: 'Active', category: 'Vegetables' },
    { id: 10, name: 'Vidhya', contact: '5554443333', email: 'vidhya@example.com', address: 'Mount Road', status: 'Inactive', category: 'Fruits' },
    { id: 11, name: 'Priya', contact: '2223334444', email: 'priya@example.com', address: 'Vadapalani', status: 'Active', category: 'Frozen Foods' },
    { id: 12, name: 'Kavya', contact: '1112223333', email: 'kavya@example.com', address: 'Nungambakkam', status: 'Inactive', category: 'Prepared Foods' },
  ]);
  
  const [openModal, setOpenModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    status: '',
    category: '',
  });
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingSupplierId, setEditingSupplierId] = useState(null);

  const handleAddSupplier = () => {
    if (
      !newSupplier.name ||
      !newSupplier.contact ||
      !newSupplier.email ||
      !newSupplier.address ||
      !newSupplier.status ||
      !newSupplier.category
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (isEditing) {
      // Update the supplier if editing
      setSuppliers(
        suppliers.map((item) =>
          item.id === editingSupplierId ? { ...item, ...newSupplier } : item
        )
      );
      setIsEditing(false);
    } else {
      // Add new supplier if not editing
      setSuppliers([...suppliers, { id: suppliers.length + 1, ...newSupplier }]);
    }

    setOpenModal(false);
    setNewSupplier({
      name: '',
      contact: '',
      email: '',
      address: '',
      status: '',
      category: '',
    });
  };

  const handleDeleteSupplier = (id) => {
    setSuppliers(suppliers.filter((item) => item.id !== id));
  };

  const handleEditSupplier = (supplier) => {
    setNewSupplier({ ...supplier });
    setIsEditing(true);
    setEditingSupplierId(supplier.id);
    setOpenModal(true);
  };

  const filteredSuppliers = suppliers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex" sx={{ height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        flexGrow={1}
        p={3}
        sx={{
          overflowY: 'auto',
          height: '100vh',
          position: 'relative',
        }}
      >
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              bgcolor: '#000',
              color: '#fff',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Supplier Management
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenModal(true)}
              sx={{
                fontWeight: 'bold',
                bgcolor: '#1E88E5',
                '&:hover': {
                  bgcolor: '#1565C0',
                },
              }}
            >
              Add Supplier
            </Button>
          </Box>

          {/* Search and Card for supplier counts */}
          <Stack direction="row" spacing={2} mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search Suppliers"
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Card sx={{ minWidth: 120, bgcolor: '#4DB6AC', color: '#fff' }}>
              <CardContent>
                <Typography variant="h6">Total Suppliers</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {suppliers.length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 120, bgcolor: '#FF7043', color: '#fff' }}>
              <CardContent>
                <Typography variant="h6">Active Suppliers</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {suppliers.filter((item) => item.status === 'Active').length}
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          {/* Horizontal Scroll Table */}
          <Box sx={{ overflowX: 'auto' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table>
                <TableHead sx={{ bgcolor: '#E0E0E0' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Supplier Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredSuppliers.map((item) => (
                    <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#F9F9F9' } }}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.contact}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.address}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => handleEditSupplier(item)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDeleteSupplier(item.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>

        {/* Add Supplier Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              width: 400,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {isEditing ? 'Edit Supplier' : 'Add New Supplier'}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Supplier Name"
                value={newSupplier.name}
                onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
              />
              <TextField
                label="Contact"
                value={newSupplier.contact}
                onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
              />
              <TextField
                label="Email"
                value={newSupplier.email}
                onChange={(e) => setNewSupplier({ ...newSupplier, email: e.target.value })}
              />
              <TextField
                label="Address"
                value={newSupplier.address}
                onChange={(e) => setNewSupplier({ ...newSupplier, address: e.target.value })}
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={newSupplier.category}
                  onChange={(e) => setNewSupplier({ ...newSupplier, category: e.target.value })}
                  label="Category"
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Status"
                value={newSupplier.status}
                onChange={(e) => setNewSupplier({ ...newSupplier, status: e.target.value })}
              />
              <Box display="flex" justifyContent="space-between" mt={2}>
                <Button onClick={() => setOpenModal(false)} color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" color="primary" onClick={handleAddSupplier}>
                  {isEditing ? 'Update' : 'Add'}
                </Button>
              </Box>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default SupplierManagement;
