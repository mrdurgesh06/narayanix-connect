import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ScrollToHash from "../components/ScrollToHash";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">

      <ScrollToHash />

      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />

    </div>
  );
}

export default MainLayout;