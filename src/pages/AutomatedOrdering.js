import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; 
import './AutomatedOrdering.css';
import {
  Typography,
  Box,
} from '@mui/material';
const AutomatedOrdering = () => {
  const [isOrderHistoryOpen, setOrderHistoryOpen] = useState(false);
  const [automationEnabled, setAutomationEnabled] = useState(false);
  const [reorderThreshold, setReorderThreshold] = useState(20);
  const [orderHistory, setOrderHistory] = useState([]);
  const [lowStockProducts] = useState([
    { productName: "Milk", currentStock: 5, reorderLevel: reorderThreshold, suggestedQuantity: 15 },
    { productName: "Eggs", currentStock: 10, reorderLevel: reorderThreshold, suggestedQuantity: 40 },
    { productName: "Bread", currentStock: 8, reorderLevel: reorderThreshold, suggestedQuantity: 12 },
  ]);

  const handleAutomationToggle = () => {
    setAutomationEnabled(!automationEnabled);
    alert(`Automation ${!automationEnabled ? "enabled" : "disabled"}`);
  };

  const handleThresholdChange = (e) => {
    setReorderThreshold(e.target.value);
  };

  const handleOrderNow = (product) => {
    const newOrder = {
      productName: product.productName,
      quantityOrdered: product.suggestedQuantity,
      orderDate: new Date().toLocaleDateString(),
      status: "Ordered",
    };

    setOrderHistory((prevState) => [...prevState, newOrder]);
    alert(`Order placed for ${product.suggestedQuantity} units of ${product.productName}`);
    setOrderHistoryOpen(true);
  };

  return (
    <div>
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
      <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#1E1E2E", 
            color: "#fff",
            padding: 2,
            borderRadius: 2,
            mb: 3,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
          Automated Ordering System
          </Typography>
        </Box>
        {/* Low Stock Products */}
        <div className="section">
          <h2>Low Stock Products</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Current Stock</th>
                <th>Reorder Level</th>
                <th>Suggested Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts
                .filter((product) => product.currentStock < reorderThreshold)
                .map((product, index) => (
                  <tr key={index}>
                    <td>{product.productName}</td>
                    <td>{product.currentStock}</td>
                    <td>{product.reorderLevel}</td>
                    <td>{product.suggestedQuantity}</td>
                    <td>
                      <button className="btn order-btn" onClick={() => handleOrderNow(product)}>
                        Order Now
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Automated Settings */}
        <div className="section">
          <h2>Automated Settings</h2>
          <div className="automation-container">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={automationEnabled}
                onChange={handleAutomationToggle}
                className="automation-checkbox"
              />
              Enable Automation
            </label>
          </div>
          <p>Set Reorder Threshold:</p>
          <input
            type="number"
            value={reorderThreshold}
            onChange={handleThresholdChange}
            placeholder="Enter threshold"
            className="input-field"
          />
        </div>

        {/* Order History */}
        <button
          className="collapsible-btn"
          onClick={() => setOrderHistoryOpen(!isOrderHistoryOpen)}
        >
          {isOrderHistoryOpen ? "Hide Order History" : "View Order History"}
        </button>
        {isOrderHistoryOpen && (
          <div className="order-history">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity Ordered</th>
                  <th>Order Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order, index) => (
                  <tr key={index}>
                    <td>{order.productName}</td>
                    <td>{order.quantityOrdered}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default AutomatedOrdering;
