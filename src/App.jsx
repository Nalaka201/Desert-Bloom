import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import RootRoute from './components/common/RootRoute';
import Home from './pages/Home';
import About from './pages/About';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OrderPage from './pages/OrderPage';
import SuccessPage from './pages/SuccessPage';
import OrderHistory from './pages/OrderHistory';
import Profile from './pages/Profile';
import SupplierDetails from './pages/SupplierDetails';
import CeylonSeeds from './pages/CeylonSeeds';
import Suppliers from './pages/Suppliers';
import AdminPanel from './pages/AdminPanel';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import { Toaster } from 'react-hot-toast';
import './index.css';

const AppContent = () => {
  const location = useLocation();
  const token = localStorage.getItem('access_token');

  // "/" shows Login (no navbar) when a token exists, Home (with navbar) otherwise
  const rootShowingLogin = location.pathname === '/' && !!token;

  const hideNavbar = rootShowingLogin || ['/login', '/register', '/forgot-password', '/admin', '/admin-login', '/admin-register'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          {/* Root: Login if returning (has token), Home if guest */}
          <Route path="/" element={<RootRoute />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected - login required */}
          <Route path="/supplier/:id" element={<ProtectedRoute><SupplierDetails /></ProtectedRoute>} />
          <Route path="/supplier/ceylon-seeds" element={<ProtectedRoute><CeylonSeeds /></ProtectedRoute>} />
          <Route path="/order/:productId" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
          <Route path="/order-success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            padding: '12px 18px',
            borderRadius: '12px',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '380px',
          },
          success: {
            duration: 3500,
            iconTheme: { primary: '#10b981', secondary: '#ffffff' },
            style: { borderLeft: '5px solid #10b981', background: '#f0fdf4', color: '#166534' },
          },
          error: {
            duration: 4000,
            iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
            style: { borderLeft: '5px solid #ef4444', background: '#fef2f2', color: '#991b1b' },
          },
        }}
      />
      <AppContent />
    </Router>
  )
}

export default App;