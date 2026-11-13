import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardOverview from './pages/DashboardOverview';
import SalesAnalytics from './pages/SalesAnalytics';
import CustomerAnalytics from './pages/CustomerAnalytics';
import ProductAnalytics from './pages/ProductAnalytics';
import FinancialAnalytics from './pages/FinancialAnalytics';
import Operations from './pages/Operations';
import Forecasting from './pages/Forecasting';
import DataUpload from './pages/DataUpload';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { DashboardProvider } from './context/DashboardContext';

export default function App() {
  return (
    <DashboardProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardOverview />} />
          <Route path="sales" element={<SalesAnalytics />} />
          <Route path="customers" element={<CustomerAnalytics />} />
          <Route path="products" element={<ProductAnalytics />} />
          <Route path="financial" element={<FinancialAnalytics />} />
          <Route path="operations" element={<Operations />} />
          <Route path="forecasting" element={<Forecasting />} />
          <Route path="data-upload" element={<DataUpload />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          {/* Wildcard fallback to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </DashboardProvider>
  );
}
