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
      <AppContent />
    </Router>
  )
}

export default App;
