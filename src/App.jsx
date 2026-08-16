import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
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
  const hideNavbar = ['/', '/register', '/forgot-password', '/admin', '/admin-login', '/admin-register'].includes(location.pathname);

  return (
    <div className="app">
      {!hideNavbar && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/supplier/:id" element={<SupplierDetails />} />
          <Route path="/supplier/ceylon-seeds" element={<CeylonSeeds />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/products" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/order/:productId" element={<OrderPage />} />
          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
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
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
            style: {
              borderLeft: '5px solid #10b981',
              background: '#f0fdf4',
              color: '#166534',
            },
          },

          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
            style: {
              borderLeft: '5px solid #ef4444',
              background: '#fef2f2',
              color: '#991b1b',
            },
          },
        }}
      />
      <AppContent />
    </Router>
  )
}

export default App;
