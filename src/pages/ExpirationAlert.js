import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from '../components/Sidebar';
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

function ExpirationAlerts() {

 // Hardcoded data for alerts
const [alerts, setAlerts] = useState([
  { "id": 1, "productName": "Milk", "stockQuantity": 30, "expirationDate": "2025-01-04", "daysRemaining": 1, "status": "Expiring Soon" },
  { "id": 2, "productName": "Bread", "stockQuantity": 50, "expirationDate": "2025-01-03", "daysRemaining": 0, "status": "Expiring Today" },
  { "id": 3, "productName": "Apples", "stockQuantity": 20, "expirationDate": "2025-01-03", "daysRemaining": 0, "status": "Expiring Today" },
  { "id": 4, "productName": "Yogurt", "stockQuantity": 20, "expirationDate": "2025-01-06", "daysRemaining": 3, "status": "Expiring Soon" },
  { "id": 5, "productName": "Frozen Pizza", "stockQuantity": 20, "expirationDate": "2025-01-04", "daysRemaining": 1, "status": "Expiring Soon" },
  { "id": 6, "productName": "Bananas", "stockQuantity": 15, "expirationDate": "2025-01-02", "daysRemaining": -1, "status": "Expired" },
  { "id": 7, "productName": "Eggs", "stockQuantity": 40, "expirationDate": "2025-01-05", "daysRemaining": 2, "status": "Expiring Soon" },
  { "id": 8, "productName": "Spinach", "stockQuantity": 10, "expirationDate": "2025-01-02", "daysRemaining": -1, "status": "Expired" },
  { "id": 9, "productName": "Chicken Breast", "stockQuantity": 12, "expirationDate": "2025-01-03", "daysRemaining": 0, "status": "Expiring Today" },
  { "id": 10, "productName": "Fish Fillets", "stockQuantity": 8, "expirationDate": "2025-01-04", "daysRemaining": 1, "status": "Expiring Soon" },
  { "id": 11, "productName": "Lettuce", "stockQuantity": 30, "expirationDate": "2025-01-05", "daysRemaining": 2, "status": "Expiring Soon" }
]);


  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  const customStyle = {
    headCells: {
      style: {
        backgroundColor: "#E0E0E0",
        color: "black",
        fontWeight: "bold",
      },
    },
    rows: {
      style: {
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
      },
    },
    table: {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
      },
    },
  };

  const handleDialogOpen = (id, actionType) => {
    setCurrentId(id);
    setCurrentAction(actionType);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setCurrentId(null);
    setCurrentAction(null);
  };

  const handleConfirmAction = () => {
    const id = currentId;

    // Remove the acted item from the state
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));

    handleDialogClose();
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.productName || "-",
      sortable: true,
    },
    {
      name: "Stock Quantity",
      selector: (row) => row.stockQuantity || "-",
      sortable: true,
    },
    {
      name: "Expiration Date",
      selector: (row) => row.expirationDate || "-",
      sortable: true,
    },
    {
      name: "Days Remaining",
      selector: (row) => row.daysRemaining || "-",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status || "-",
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          {row.status !== 'Expired' && (
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleDialogOpen(row.id, "Donate")}
            >
              <VolunteerActivismIcon />
            </IconButton>
          )}
          <IconButton
            color="secondary"
            size="small"
            onClick={() => handleDialogOpen(row.id, "Dispose")}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              bgcolor: '#1E1E2E',
              color: '#fff',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Expiration Alerts
            </Typography>
          </Box>

          <div style={{ margin: "20px" }}>
            <DataTable
              columns={columns}
              data={alerts}
              highlightOnHover
              striped
              responsive
              customStyles={customStyle}
            />
          </div>
        </div>
      </div>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Confirm ${currentAction || ''}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {currentAction ? `Are you sure you want to ${currentAction.toLowerCase()} this item?` : ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ExpirationAlerts;
