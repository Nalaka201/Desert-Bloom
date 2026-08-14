<div align="center">

# Aswenna.lk

### A Smart Agricultural Platform Connecting Sri Lankan Farmers with Seed Suppliers

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Django](https://img.shields.io/badge/Django-5-092E20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Open-Meteo](https://img.shields.io/badge/Open--Meteo-Weather_API-00BFFF?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://open-meteo.com/)
[![i18n](https://img.shields.io/badge/i18n-EN_%7C_සිංහල_%7C_தமிழ்-orange?style=for-the-badge)](https://react.i18next.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> **Aswenna.lk** is a full-stack web platform built to digitize and simplify the agricultural supply chain in Sri Lanka. It empowers farmers to browse seed suppliers, place orders, download digital invoices, and track their purchase history — all in one place. A live weather advisory system provides real-time farming recommendations based on district-level conditions. Administrators get a powerful dashboard to manage the entire ecosystem in real-time.

</div>

---

## 📸 Overview

| Role | Portal | Key Capabilities |
|------|--------|-----------------|
| 👨‍🌾 **Farmer** | `/home`, `/suppliers`, `/order/:id` | Browse seeds, place orders, download PDF invoices |
| 🛡️ **Admin** | `/admin` | Manage suppliers, farmers, orders & site content |
| 🌦️ **Weather** | Home Page Widget | Live district weather + farming advisory (Open-Meteo API) |

---

## ✨ Features

### 👨‍🌾 Farmer Portal
- **🔐 Secure Authentication** — NIC-based registration & login with password recovery
- **🛒 Seed Ordering System** — Browse suppliers, view seed varieties, and place orders seamlessly
- **📄 PDF Invoice Generation** — Instant digital receipts generated via `jsPDF` upon order completion
- **📦 Order History** — Track all past orders with payment status & remaining balance breakdown
- **👤 Dynamic Profile** — Personalized profile management with initials displayed in the navbar
- **🌐 Trilingual Support** — Full **English**, **Sinhala (සිංහල)**, and **Tamil (தமிழ்)** language switching

### 🌦️ Live Weather & Farming Advisory *(Open-Meteo API)*
- **📡 Real-Time Weather Data** — Fetches live conditions from [Open-Meteo](https://open-meteo.com/) for 4 major agricultural districts — no API key required
- **📍 GPS Auto-Location** — Uses browser Geolocation API to auto-select the farmer's nearest district
- **🌾 Farming Advisory Engine** — Automatically generates actionable advice (spray, sow, harvest, avoid) based on temperature, humidity, and rainfall data
- **🎮 3D Weather Scene** — Interactive Three.js animated weather scene (sunny / cloudy / rain / thunderstorm / night) that changes with live conditions
- **📊 Seed Demand Ticker** — Real-time scrolling ticker showing high-demand seed varieties and market trend changes
- **⏱️ Auto-Refresh** — Weather data refreshes automatically every **30 minutes**

### 🛡️ Admin Panel
- **📊 Live Dashboard** — Real-time metrics: total revenue, orders placed, and active user count
- **📋 Order Management** — Detailed view of every transaction including items, quantities & payment status
- **🏪 Supplier Management** — Add, edit, or remove seed suppliers with ratings & contact details
- **👥 Farmer Management** — View and manage all registered farmers on the platform
- **✏️ Content Control** — Update landing page text (titles & subtitles) directly from the admin panel

---

## 🌦️ Weather API Integration — Open-Meteo

The platform integrates the **[Open-Meteo API](https://open-meteo.com/)** — a free, open-source weather forecasting API that requires **no API key** and no registration.

### How It Works

```
Browser → GPS Geolocation API → Nearest District Detection
       → Open-Meteo REST API → Live Weather Data
       → Farming Advisory Engine → Actionable Recommendations
```

### API Endpoint Used

```
GET https://api.open-meteo.com/v1/forecast
    ?latitude={lat}
    &longitude={lon}
    &current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,is_day
    &timezone=Asia/Colombo
```

### Response Fields Used

| Field | Description | Used For |
|-------|-------------|----------|
| `temperature_2m` | Air temperature at 2m height (°C) | Temp display & heat alerts |
| `relative_humidity_2m` | Relative humidity (%) | Fungal disease risk alerts |
| `precipitation` | Current precipitation (mm) | Rainfall indicator |
| `weather_code` | WMO weather interpretation code | 3D scene type & weather label |
| `wind_speed_10m` | Wind speed at 10m (km/h) | Wind metric display |
| `is_day` | Day/night indicator (0 or 1) | Day/night 3D scene switching |

### Supported Districts

| District | Latitude | Longitude |
|----------|----------|-----------|
| Anuradhapura | 8.3114°N | 80.4037°E |
| Polonnaruwa | 7.9403°N | 81.0188°E |
| Kurunegala | 7.4818°N | 80.3609°E |
| Kandy | 7.2906°N | 80.6337°E |

### Farming Advisory Logic

| Condition | Status | Action |
|-----------|--------|--------|
| Rain detected (any precipitation code) | ⚠️ Caution | Postpone spraying & sowing |
| Temperature > 35°C | 🌡️ Warning | Avoid midday fieldwork, increase irrigation |
| Humidity > 85% | 🍄 Warning | Apply fungicide, inspect for fungal disease |
| All clear | ✅ Good | Safe for sowing, spraying, harvesting |

> **Key Advantage**: Open-Meteo is **completely free**, has **no rate limits** for reasonable usage, and requires **zero API key setup** — making it ideal for agricultural apps.

---

## 🌐 Internationalization (i18n)

The platform fully supports **3 languages** via `react-i18next` with browser-level language auto-detection:

| Language | Code | File | Status |
|----------|------|------|--------|
| English | `en` | `src/locales/en.json` | ✅ Full support |
| Sinhala (සිංහල) | `si` | `src/locales/si.json` | ✅ Full support |
| Tamil (தமிழ்) | `ta` | `src/locales/ta.json` | ✅ Full support |

Translated content includes: navigation, order forms, weather alerts, farming advice labels, supplier details, profile pages, and all error/success messages.

---

## 🏗️ Project Architecture

```
Desert-Bloom-Website-main/
│
├── 📁 src/                        # React Frontend (Vite)
│   ├── 📁 pages/                  # All route-level page components
│   │   ├── Home.jsx               # Main landing page (includes WeatherWidget)
│   │   ├── Login.jsx              # Farmer login
│   │   ├── Register.jsx           # Farmer registration
│   │   ├── ForgotPassword.jsx     # Password recovery flow
│   │   ├── Suppliers.jsx          # Supplier listing page
│   │   ├── SupplierDetails.jsx    # Individual supplier + products
│   │   ├── OrderPage.jsx          # Order placement flow
│   │   ├── OrderHistory.jsx       # Past orders tracker
│   │   ├── Profile.jsx            # Farmer profile management
│   │   ├── SuccessPage.jsx        # Post-order confirmation
│   │   ├── AdminLogin.jsx         # Admin authentication
│   │   ├── AdminRegister.jsx      # Admin account creation
│   │   └── AdminPanel.jsx         # Full admin dashboard
│   │
│   ├── 📁 components/
│   │   ├── 📁 common/
│   │   │   ├── Navbar.jsx               # Top navigation bar
│   │   │   ├── Footer.jsx               # Site footer
│   │   │   ├── LanguageSwitcher.jsx     # EN / සි / த language toggle
│   │   │   └── NotificationDropdown.jsx # Notification bell UI
│   │   ├── 📁 home/
│   │   │   ├── WeatherWidget.jsx        # 🌦️ Live weather + farming advisory
│   │   │   ├── WeatherScene3D.jsx       # Three.js animated weather scene
│   │   │   ├── FeatureSection.jsx       # Platform feature highlights
│   │   │   ├── SupplierSection.jsx      # Featured suppliers carousel
│   │   │   └── TestimonialSection.jsx   # Farmer testimonials
│   │   └── OrderPDF.jsx                 # jsPDF invoice generator
│   │
│   ├── 📁 locales/                # i18n translation files
│   │   ├── en.json                # English translations
│   │   ├── si.json                # Sinhala (සිංහල) translations
│   │   └── ta.json                # Tamil (தமிழ்) translations
│   │
│   ├── 📁 services/
│   │   └── api.js                 # Axios instance + Django API endpoints
│   ├── 📁 styles/                 # Component-level CSS
│   ├── 📁 data/                   # Static data / mock data
│   ├── i18n.js                    # i18next configuration (EN/SI/TA)
│   ├── App.jsx                    # Root component + React Router config
│   └── main.jsx                   # Application entry point
│
├── 📁 backend_django/             # Django REST Framework Backend
│   ├── 📁 api/                    # API views, serializers & URLs
│   ├── 📁 farmer_project/         # Django project settings
│   ├── manage.py                  # Django management CLI
│   └── requirements.txt           # Python dependencies
│
├── mysql_database.sql             # Complete MySQL database schema
├── vite.config.js                 # Vite build configuration
├── package.json                   # Node.js dependencies & npm scripts
└── eslint.config.js               # ESLint configuration
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [React](https://react.dev/) | 19 | UI library |
| [Vite](https://vitejs.dev/) | 7 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com/) | 7 | Client-side routing |
| [Axios](https://axios-http.com/) | 1.x | HTTP API client |
| [react-i18next](https://react.i18next.com/) | 16 | EN / Sinhala / Tamil i18n |
| [jsPDF](https://github.com/parallax/jsPDF) + html2canvas | Latest | PDF invoice generation |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + Three.js | 9 / 0.185 | 3D animated weather scenes |
| [Open-Meteo API](https://open-meteo.com/) | Free REST | Live weather data (no API key) |
| Vanilla CSS | — | Glassmorphic, modern styling |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Django](https://www.djangoproject.com/) | 5+ | Web framework |
| [Django REST Framework](https://www.django-rest-framework.org/) | 3.14+ | REST API |
| [django-cors-headers](https://github.com/adamchainz/django-cors-headers) | 4.3+ | CORS handling |
| [mysqlclient](https://github.com/PyMySQL/mysqlclient) | 2.2+ | MySQL connector |
| [python-dotenv](https://github.com/theskumar/python-dotenv) | 1.0+ | Environment variables |
| MySQL | 8 | Relational database |

---

## 🗄️ Database Schema

The `mysql_database.sql` file contains the complete schema for the following tables:

| Table | Description |
|-------|-------------|
| `admins` | Admin credentials and roles |
| `farmers` | Registered farmer profiles (NIC-based) |
| `suppliers` | Seed supplier info, ratings, and contact details |
| `products` | Seed varieties with pricing per supplier |
| `orders` | Order header — farmer, supplier, total & payment status |
| `order_items` | Line items per order (product, quantity, unit price) |
| `site_content` | Editable frontend text (managed via Admin Panel) |

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18+ → [Download](https://nodejs.org/)
- **Python** 3.10+ → [Download](https://www.python.org/)
- **MySQL** 8.0+ → [Download](https://dev.mysql.com/downloads/)
- **Git** → [Download](https://git-scm.com/)

> ✅ **No external API keys required** — The Open-Meteo weather API is completely free with no registration.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Nalaka201/Desert-Bloom-Website.git
cd Desert-Bloom-Website-main
```

---

### 2️⃣ Database Setup

1. Open MySQL and create the database:
```sql
CREATE DATABASE desert_bloom;
```

2. Import the schema:
```bash
mysql -u root -p desert_bloom < mysql_database.sql
```

---

### 3️⃣ Backend Setup (Django)

```bash
# Navigate to the backend folder
cd backend_django

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `backend_django/` with your database credentials:

```env
DB_NAME=desert_bloom
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306
SECRET_KEY=your_django_secret_key
DEBUG=True
```

Run the Django server:

```bash
python manage.py migrate
python manage.py runserver
```

> ✅ Django API will be running at `http://localhost:8000`

---

### 4️⃣ Frontend Setup (React + Vite)

Open a **new terminal** and navigate back to the project root:

```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

> ✅ The app will be running at `http://localhost:5173`

---

### 5️⃣ Access the Application

| Portal | URL |
|--------|-----|
| 🌱 Farmer Login | `http://localhost:5173/` |
| 🛡️ Admin Login | `http://localhost:5173/admin-login` |

**💡 Quick Admin Access (Windows shortcut):**
```bash
npm run admin
```
This opens the Admin Login page directly in your browser.

---

## 📡 API Routes (Django Backend)

The Django REST Framework backend exposes a REST API consumed by the React frontend via Axios (`src/services/api.js`):

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/farmers/register` | `POST` | Farmer account registration |
| `/api/farmers/` | `GET` | Retrieve all farmers (Admin) |
| `/api/suppliers/` | `GET` | Supplier listing |
| `/api/products/` | `GET` | Product/seed listings |
| `/api/orders/` | `GET` / `POST` | Retrieve all orders / Create new order |
| `/api/admins/` | `GET / POST` | Admin authentication and management |
| `/api/site-content/` | `GET / PUT` | Dynamic frontend text management |

### External API

| API | Endpoint | Auth | Purpose |
|-----|----------|------|---------|
| [Open-Meteo](https://open-meteo.com/) | `https://api.open-meteo.com/v1/forecast` | ❌ None required | Live weather for farming advisory |

---

## 🌐 Application Routes (React Frontend)

| Path | Component | Access |
|------|-----------|--------|
| `/` | `Login` | Public |
| `/register` | `Register` | Public |
| `/forgot-password` | `ForgotPassword` | Public |
| `/home` | `Home` *(+ Weather Widget)* | Farmer |
| `/suppliers` | `Suppliers` | Farmer |
| `/supplier/:id` | `SupplierDetails` | Farmer |
| `/order/:productId` | `OrderPage` | Farmer |
| `/order-success` | `SuccessPage` | Farmer |
| `/history` | `OrderHistory` | Farmer |
| `/profile` | `Profile` | Farmer |
| `/admin-login` | `AdminLogin` | Admin |
| `/admin-register` | `AdminRegister` | Admin |
| `/admin` | `AdminPanel` | Admin |

---

## 🔄 Recent Improvements

- ✅ **Tamil Language (தமிழ்) Added** — Full trilingual support (EN / සිංහල / தமிழ்) across all pages
- ✅ **Open-Meteo Weather API** — Live farming weather advisory with GPS auto-district detection
- ✅ **3D Weather Scenes** — Three.js animated scenes change dynamically with real weather data
- ✅ **Seed Demand Ticker** — Live scrolling ticker for high-demand seed varieties & market trends
- ✅ **Submission Guards** — Prevents duplicate order submissions on slow connections
- ✅ **localStorage Fallbacks** — Ensures data sync between Farmer actions & Admin Panel when offline
- ✅ **`npm run admin` Script** — VS Code terminal shortcut for faster admin development access

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ for Sri Lankan Farmers &nbsp;|&nbsp; **aswenna.lk**

🇱🇰 &nbsp; English · සිංහල · தமிழ்

</div>
