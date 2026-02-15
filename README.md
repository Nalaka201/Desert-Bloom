# Desert Bloom: Farmer & Admin System - Project Summary

Desert Bloom is a comprehensive web platform designed to empower farmers by connecting them with trusted seed suppliers and provide administrators with robust tools to manage the entire ecosystem.

## 🚀 Key Features

### 👨‍🌾 Farmer Portal
- **User Registration & Login**: Secure NIC-based authentication flow.
- **Product Ordering**: Seamless cart system for selecting seeds from various suppliers.
- **PDF Invoices**: Instant generation and download of digital receipts upon order placement.
- **Order History**: Track past orders, payments, and remaining balances.
- **Dynamic Profile**: Personalized profile management with dynamic initials in the navigation bar.

### 🛡️ Admin Panel
- **Integrated Dashboard**: Real-time overview of total revenue, total orders, and active users.
- **Order Management**: Detailed visibility of every order, including specific items, quantities, and payment status.
- **Supplier & Farmer Management**: Tools to add, edit, or remove suppliers and track registered farmers.
- **Site Content Control**: Ability to update landing page titles and subtitles directly from the panel.

## 🛠️ Technology Stack
- **Frontend**: React (Vite), React Router DOM (Navigation), Axios (API Communication).
- **Styling**: Vanilla CSS with modern, glassmorphic design elements.
- **Internationalization**: `react-i18next` (Supports English and Sinhala).
- **Backend (Reference)**: Django REST Framework.
- **Database**: MySQL (Comprehensive schema covering all system entities).

## 📊 Database Structure (`mysql_database.sql`)
- **`admins`**: Stores administrative credentials.
- **`farmers`**: Registered user profiles.
- **`suppliers`**: Seed providers' information and ratings.
- **`products`**: Available seed varieties with pricing.
- **`orders` & `order_items`**: Detailed tracking of transactions.
- **`site_content`**: Dynamic text for the frontend.

## 🔄 Recent Improvements
- Implemented **Submission Guards** to prevent duplicate order entries.
- Added **VS Code Terminal scripts** (`npm run admin`) for faster development access.
- Enhanced **Data Synchronization** between Farmer actions and the Admin Panel using `localStorage` fallbacks.
