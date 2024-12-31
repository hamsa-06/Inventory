import React, { useState, useEffect } from "react";
import Sidebar from '../components/Sidebar'; // Import Sidebar component
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import * as XLSX from "xlsx";
import inventoryFile from "./inventory.xlsx"; 
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

// Helper function for linear regression calculation
const linearRegression = (x, y) => {
  const n = x.length;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

  const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - m * sumX) / n;

  return { m, b };
};

const calculateForecast = (data) => {
  return data.map((item) => {
    if (!item.salesPattern || item.salesPattern.length < 2) {
      return {
        name: item.name,
        currentStock: item.currentStock,
        predictedStock: item.currentStock,
        salesTrend: 0,
      };
    }

    const x = Array.from({ length: item.salesPattern.length }, (_, i) => i + 1);
    const y = item.salesPattern;

    const { m, b } = linearRegression(x, y);

    const predictedSales = Array.from({ length: item.shelfLife }, (_, i) => m * (x.length + i + 1) + b)
      .reduce((a, b) => a + Math.max(0, b), 0);

    const predictedStock = Math.max(0, item.currentStock - predictedSales);

    return {
      name: item.name,
      currentStock: item.currentStock,
      predictedStock: Math.round(predictedStock),
      salesTrend: m.toFixed(2),
    };
  });
};

const getDefaultShelfLife = (category) => {
  const shelfLifeDefaults = {
    Fruits: 5,
    Vegetables: 7,
    "Dairy Products": 10,
    "Meat, Poultry, and Seafood": 3,
    "Bakery and Prepared Foods": 2,
    Beverages: 30,
    "Frozen Foods": 180,
  };
  return shelfLifeDefaults[category] || 7;
};

const InventoryForecasting = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [categories] = useState([
    "Fruits",
    "Vegetables",
    "Dairy Products",
    "Meat, Poultry, and Seafood",
    "Bakery and Prepared Foods",
    "Beverages",
    "Frozen Foods",
  ]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [timeframe, setTimeframe] = useState("Per Day");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleTimeframeChange = (event) => {
    setTimeframe(event.target.value);
  };

  useEffect(() => {
    fetch(inventoryFile)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        if (!jsonData.every((row) => row.Category && row.Product && row.Quantity)) {
          alert("Invalid file format. Please ensure columns: 'Category', 'Product', 'Quantity' exist.");
          return;
        }

        const processedData = jsonData.map((row) => ({
          category: row.Category,
          name: row.Product,
          currentStock: row.Quantity,
          salesPattern: row.SalesPattern ? JSON.parse(row.SalesPattern) : [row.Quantity],
          shelfLife: row.ShelfLife || getDefaultShelfLife(row.Category),
        }));

        setInventoryData(processedData);
      })
      .catch((error) => {
        alert("Error processing file: " + error.message);
      });
  }, []);

  useEffect(() => {
    const filteredData = inventoryData.filter(
      (item) => item.category === selectedCategory
    );

    const forecast = calculateForecast(filteredData);

    const aggregatedData = forecast.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = {
          name: item.name,
          currentStock: 0,
          predictedStock: 0,
          records: 0,
        };
      }
      acc[item.name].currentStock += item.currentStock;
      acc[item.name].predictedStock += item.predictedStock;
      acc[item.name].records += 1;
      return acc;
    }, {});

    let chartData = Object.values(aggregatedData);

    // Adjust data based on timeframe
    chartData = chartData.map((item) => {
      const divisor = item.records || 1; // Avoid division by zero
      let multiplier = 1;

      switch (timeframe) {
        case "Per Day":
          multiplier = 1 / divisor;
          break;
        case "Per Week":
          multiplier = 7 / divisor;
          break;
        case "Per Month":
          multiplier = 30 / divisor;
          break;
        case "Per Year":
          multiplier = 365 / divisor;
          break;
        default:
          break;
      }

      return {
        ...item,
        currentStock: Math.round(item.currentStock * multiplier),
        predictedStock: Math.round(item.predictedStock * multiplier),
      };
    });

    setChartData(chartData);
  }, [selectedCategory, timeframe, inventoryData]);

  return (
    <div className="inventory-forecasting" style={{ backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <div style={{ display: "flex" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={{ flex: 1, padding: "20px" }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              bgcolor: '#1E1E2E', // Dashboard header background
              color: '#fff',
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Inventory Forecasting
            </Typography>
          </Box>

          <Box display="flex" gap={2} mb={4}>
          <FormControl sx={{ minWidth: 250 }}> {/* Increased minWidth */}
    <InputLabel 
    shrink
      sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main', 
        backgroundColor:"white",
        px:0.7
      }}
    >
      Select Category
    </InputLabel>
    <Select
      value={selectedCategory}
      onChange={handleCategoryChange}
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '4px',
        '& .MuiSelect-select': {
          padding: '10px',
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' // Ensures long text is truncated
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 200, // Limits dropdown height
            overflow: 'auto' // Enables scrolling if necessary
          }
        }
      }}
    >
      {categories.map((category, index) => (
        <MenuItem 
          key={index} 
          value={category} 
          sx={{
            whiteSpace: 'normal' // Allows full display of items in the dropdown
          }}
        >
          {category}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: 250 }}> {/* Increased minWidth */}
    <InputLabel 
      sx={{ 
        fontWeight: 'bold', 
        color: 'primary.main',
        backgroundColor:"white",
        px:0.7 
      }}
    >
      Select Timeframe
    </InputLabel>
    <Select
      value={timeframe}
      onChange={handleTimeframeChange}
      sx={{
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: '4px',
        '& .MuiSelect-select': {
          padding: '10px',
          whiteSpace: 'nowrap', 
          overflow: 'hidden', 
          textOverflow: 'ellipsis' // Ensures long text is truncated
        }
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: 200, // Limits dropdown height
            overflow: 'auto' // Enables scrolling if necessary
          }
        }
      }}
    >
      <MenuItem value="Per Day">Daily</MenuItem>
      <MenuItem value="Per Week">Weekly</MenuItem>
      <MenuItem value="Per Month">Monthly</MenuItem>
      <MenuItem value="Per Year">Yearly</MenuItem>
    </Select>
  </FormControl>
          </Box>

          {chartData.length > 0 && (
            <LineChart
              width={980}
              height={400}
              data={chartData}
              margin={{ top: 20, right: 20, left: 5, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                interval={0}
                angle={-30} 
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="predictedStock" stroke="#82ca9d" />
            </LineChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryForecasting;
