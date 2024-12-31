import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Box, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Icon for Supplier Management
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: '250px',
        height: '120vh',
        backgroundColor: '#1E1E2E', // Sidebar background color
        color: '#FFFFFF', // Text color
        padding: '20px',
      }}
    >
      {/* App Title */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4DB6AC' }}>
          Smart Inventory
        </Typography>
      </Box>

      {/* Navigation Links */}
      <List>
        {/* Dashboard */}
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <DashboardIcon sx={{ color: '#4DB6AC' }} /> {/* Icon color */}
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Inventory Management */}
        <ListItem button component={Link} to="/inventory">
          <ListItemIcon>
            <InventoryIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Inventory" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Analytics */}
        <ListItem button component={Link} to="/analytics">
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Analytics" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Supplier Management */}
        <ListItem button component={Link} to="/supplier">
          <ListItemIcon>
            <LocalShippingIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Supplier Management" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Outlet */}
        <ListItem button component={Link} to="/multiOutlet">
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="MultiOutlet Management" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Automate */}
        <ListItem button component={Link} to="/automate">
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Automated Ordering" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* forecasting*/}
        <ListItem button component={Link} to="/forecast">
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Inventory Forecast" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        <ListItem button component={Link} to="/expiration">
          <ListItemIcon>
            <AnalyticsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Expiration Alert" sx={{ color: '#FFFFFF' }} />
        </ListItem>

        {/* Feedback */}
        <ListItem button component={Link} to="/feedback">
          <ListItemIcon>
            <SettingsIcon sx={{ color: '#4DB6AC' }} />
          </ListItemIcon>
          <ListItemText primary="Feedback" sx={{ color: '#FFFFFF' }} />
        </ListItem>
      </List>

      {/* Divider */}
      <Divider sx={{ backgroundColor: '#4DB6AC', marginY: '20px' }} />

      {/* Footer */}
      <Box textAlign="center" mt="auto">
        <Typography variant="body2" sx={{ color: '#4DB6AC' }}>
          © 2024 Inventory App
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
