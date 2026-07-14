import { SettingsProvider } from "./context/SettingsContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";


// Layout
import MainLayout from "./layouts/MainLayout";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import IndustriesPage from "./pages/IndustriesPage";
import Contact from "./pages/Contact";
import Proposal from "./pages/Proposal";
import FAQ from "./pages/FAQ";

// Admin
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Contacts from "./admin/Contacts";
import Proposals from "./admin/Proposals";
import Settings from "./admin/Settings";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

 <SettingsProvider>

      <Routes>

        {/* Public Website */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/services"
            element={<ServicesPage />}
          />

          <Route
            path="/industries"
            element={<IndustriesPage />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/proposal"
            element={<Proposal />}
          />

          
          <Route
            path="/faq"
            element={<FAQ />}
          />

        </Route>

        {/* Admin Login */}

        <Route
          path="/admin/login"
          element={<Login />}
        />

        {/* Protected Admin */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="contacts"
            element={<Contacts />}
          />

          <Route
            path="proposals"
            element={<Proposals />}
          />

 <Route
    path="settings"
    element={<Settings />}
  />

        </Route>

      </Routes>

        </SettingsProvider>


    </BrowserRouter>
  );
}

export default App;