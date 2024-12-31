import React, { useState, useEffect } from 'react';
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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx'; // Import the XLSX library
import inventoryFile from './inventory_management.xlsx'; // Import the XLSX file directly

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    quantity: '',
    category: '',
    expirationDate: '',
    status: '',
  });
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  // Function to fetch and parse the XLSX file from the src folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(inventoryFile); // Fetch the imported file
        if (!response.ok) {
          throw new Error('Failed to fetch XLSX file');
        }

        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        // Verify sheet names and log workbook details
        console.log(workbook); // Log the entire workbook to inspect its structure
        const sheetName = workbook.SheetNames[0]; // Assuming the first sheet contains the data
        const sheet = workbook.Sheets[sheetName];

        // Parse the sheet into JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData); // Log parsed data for inspection

        // Transform data into the expected format
        const formattedData = jsonData.map((item, index) => ({
          id: index + 1,
          name: item['Product Name'],
          quantity: item['Quantity'],
          category: item['Category'],
          expirationDate: item['Expiration Date'],
          status: item['Status'],
        }));

        setInventory(formattedData); // Update inventory state with parsed data
      } catch (error) {
        console.error('Error fetching or parsing XLSX file:', error);
      }
    };

    fetchData();
  }, []); // Runs only once when the component mounts

  const handleAddProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.quantity ||
      !newProduct.category ||
      !newProduct.expirationDate ||
      !newProduct.status
    ) {
      alert('Please fill in all fields');
      return;
    }

    if (isEditing) {
      // Update the product if editing
      setInventory(
        inventory.map((item) =>
          item.id === editingProductId ? { ...item, ...newProduct } : item
        )
      );
      setIsEditing(false);
    } else {
      // Add new product if not editing
      setInventory([...inventory, { id: inventory.length + 1, ...newProduct }]);
    }

    setOpenModal(false);
    setNewProduct({
      name: '',
      quantity: '',
      category: '',
      expirationDate: '',
      status: '',
    });
  };

  const handleDeleteProduct = (id) => {
    setInventory(inventory.filter((item) => item.id !== id));
  };

  const handleEditProduct = (product) => {
    setNewProduct({ ...product });
    setIsEditing(true);
    setEditingProductId(product.id);
    setOpenModal(true);
  };

  const filteredInventory = inventory.filter((item) =>
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
              Inventory Management
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
              Add Product
            </Button>
          </Box>

          {/* Search and Card for inventory counts */}
          <Stack direction="row" spacing={2} mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search Products"
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
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {inventory.length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 120, bgcolor: '#FF7043', color: '#fff' }}>
              <CardContent>
                <Typography variant="h6">Low Stock</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {inventory.filter((item) => item.quantity < 20).length}
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
                    <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Expiration Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#F9F9F9' } }}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>
                        {item.quantity}{' '}
                        {item.quantity < 20 && (
                          <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                            Low Stock
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.expirationDate}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <Tooltip title="Edit">
                          <IconButton color="primary" onClick={() => handleEditProduct(item)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => handleDeleteProduct(item.id)}>
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

        {/* Add Product Modal */}
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
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Product Name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
              <TextField
                label="Quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
              />
              <TextField
                label="Category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              />
              <TextField
                label="Expiration Date"
                type="date"
                value={newProduct.expirationDate}
                onChange={(e) => setNewProduct({ ...newProduct, expirationDate: e.target.value })}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Status"
                value={newProduct.status}
                onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddProduct}
                sx={{
                  bgcolor: '#1E88E5',
                  '&:hover': {
                    bgcolor: '#1565C0',
                  },
                }}
              >
                {isEditing ? 'Update Product' : 'Add Product'}
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default InventoryManagement;
