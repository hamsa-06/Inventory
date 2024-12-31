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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

const initialWasteData = [
  { id: 1, type: 'Plastic', quantity: 150, supplier: 'Plastics Co.', date: '2024-12-01' },
  { id: 2, type: 'Food Waste', quantity: 50, supplier: 'Food Waste Ltd.', date: '2024-12-05' },
  { id: 3, type: 'Paper', quantity: 100, supplier: 'Paper Co.', date: '2024-12-10' },
];

const WasteAnalytics = () => {
  const [wasteData, setWasteData] = useState(initialWasteData);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [newWaste, setNewWaste] = useState({ type: '', quantity: '', supplier: '', date: '' });
  const [editWaste, setEditWaste] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false); // Loader state for simulate data fetching
  const [selectedWasteId, setSelectedWasteId] = useState(null);

  // Handle adding new waste
  const handleAddWaste = () => {
    if (!newWaste.type || !newWaste.quantity || !newWaste.supplier || !newWaste.date) {
      alert('Please fill in all fields');
      return;
    }
    setWasteData([...wasteData, { id: wasteData.length + 1, ...newWaste }]);
    setOpenModal(false);
    setNewWaste({ type: '', quantity: '', supplier: '', date: '' });
  };

  // Handle editing waste data
  const handleEditWaste = () => {
    if (!editWaste.type || !editWaste.quantity || !editWaste.supplier || !editWaste.date) {
      alert('Please fill in all fields');
      return;
    }
    const updatedWasteData = wasteData.map(item =>
      item.id === editWaste.id ? editWaste : item
    );
    setWasteData(updatedWasteData);
    setEditWaste(null);
    setOpenModal(false);
  };

  // Handle deleting waste record
  const handleDeleteWaste = () => {
    setWasteData(wasteData.filter(item => item.id !== selectedWasteId));
    setOpenDeleteDialog(false);
    setSelectedWasteId(null);
  };

  // Filtered waste data based on search
  const filteredWasteData = wasteData.filter((item) =>
    item.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box flexGrow={1} p={3}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              bgcolor: '#1E1E2E', // Match dashboard color
              color: '#fff',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Waste Analytics
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => setOpenModal(true)}
              sx={{
                fontWeight: 'bold',
                bgcolor: '#1E88E5', // Match the dashboard button color
                '&:hover': {
                  bgcolor: '#1565C0',
                },
              }}
            >
              Add Waste
            </Button>
          </Box>

          <Stack direction="row" spacing={2} mb={4}>
            <TextField
              variant="outlined"
              placeholder="Search Waste Type"
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
                <Typography variant="h6">Total Waste Types</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {wasteData.length}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ minWidth: 120, bgcolor: '#FF7043', color: '#fff' }}>
              <CardContent>
                <Typography variant="h6">High Quantity Waste</Typography>
                <Typography variant="h4" fontWeight="bold">
                  {wasteData.filter((item) => item.quantity > 100).length}
                </Typography>
              </CardContent>
            </Card>
          </Stack>

          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table>
              <TableHead sx={{ bgcolor: '#E0E0E0' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Waste Type</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Supplier</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredWasteData.map((item) => (
                  <TableRow key={item.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#F9F9F9' } }}>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            setEditWaste(item);
                            setOpenModal(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          color="error"
                          onClick={() => {
                            setSelectedWasteId(item.id);
                            setOpenDeleteDialog(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        {/* Add/Edit Waste Modal */}
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
              {editWaste ? 'Edit Waste' : 'Add New Waste'}
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Waste Type"
                value={editWaste ? editWaste.type : newWaste.type}
                onChange={(e) => (editWaste ? setEditWaste({ ...editWaste, type: e.target.value }) : setNewWaste({ ...newWaste, type: e.target.value }))}
              />
              <TextField
                label="Quantity"
                type="number"
                value={editWaste ? editWaste.quantity : newWaste.quantity}
                onChange={(e) => (editWaste ? setEditWaste({ ...editWaste, quantity: e.target.value }) : setNewWaste({ ...newWaste, quantity: e.target.value }))}
              />
              <TextField
                label="Supplier"
                value={editWaste ? editWaste.supplier : newWaste.supplier}
                onChange={(e) => (editWaste ? setEditWaste({ ...editWaste, supplier: e.target.value }) : setNewWaste({ ...newWaste, supplier: e.target.value }))}
              />
              <TextField
                label="Date"
                type="date"
                value={editWaste ? editWaste.date : newWaste.date}
                onChange={(e) => (editWaste ? setEditWaste({ ...editWaste, date: e.target.value }) : setNewWaste({ ...newWaste, date: e.target.value }))}
                InputLabelProps={{ shrink: true }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={editWaste ? handleEditWaste : handleAddWaste}
                sx={{
                  bgcolor: '#1E88E5', // Match dashboard button color
                  '&:hover': {
                    bgcolor: '#1565C0',
                  },
                }}
              >
                {editWaste ? 'Update Waste' : 'Add Waste'}
              </Button>
            </Stack>
          </Box>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete this waste record?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDeleteWaste} color="error">Delete</Button>
          </DialogActions>
        </Dialog>

        {/* Loading Spinner */}
        {loading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WasteAnalytics;
