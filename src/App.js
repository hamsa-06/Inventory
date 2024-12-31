import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryManagement from './pages/InventoryManagement';
import HomePage from './pages/Home';
import Feedback from './pages/Feedback';
import SupplierManagement from './pages/SupplierManagement';
import  Inventory from './pages/InventoryForecasting';
import React from 'react';
import WasteAnalytics from './pages/WasteAnalytics';
import AutomatedOrdering from './pages/AutomatedOrdering';
import MultiOutlet from './pages/MultiOutlet';
import ExpirationAlerts from './pages/ExpirationAlert';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryManagement />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/supplier" element={<SupplierManagement/>}/>
        <Route path="/forecast" element={<Inventory />} />
        <Route path="/analytics" element={<WasteAnalytics />} />
        <Route path="/automate" element={<AutomatedOrdering />} />
        <Route path="/multiOutlet" element={<MultiOutlet />} />
        <Route path="/expiration" element={<ExpirationAlerts />} />        
      </Routes>
    </Router>
  );
}

export default App;
