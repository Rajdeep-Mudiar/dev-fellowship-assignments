import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AllRooms from "./pages/AllRooms";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import OwnerLayout from "./pages/owner/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import AddRoom from "./pages/owner/AddRoom";
import ManageRooms from "./pages/owner/ManageRooms";
import ManageBookings from "./pages/owner/ManageBookings";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

const App = () => {
  const isOwnerPath = useLocation().pathname.includes("owner");

  return (
    <div className="flex flex-col min-h-screen">
      {!isOwnerPath && <Navbar />}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AllRooms />} />
          <Route path="/hotels" element={<AllRooms />} />
          <Route path="/rooms/:id" element={<RoomDetails />} />
          <Route path="/hotels/:id" element={<RoomDetails />} />

          {/* User Protected Routes */}
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />

          {/* Admin / Owner Portal */}
          <Route
            path="/owner"
            element={
              <AdminRoute>
                <OwnerLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="add-hotel" element={<AddRoom />} />
            <Route path="hotels" element={<ManageRooms />} />
            <Route path="bookings" element={<ManageBookings />} />
          </Route>
        </Routes>
      </div>
      {!isOwnerPath && <Footer />}
    </div>
  );
};

export default App;
