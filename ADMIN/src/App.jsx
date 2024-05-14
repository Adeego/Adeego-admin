import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import Orders from "./Pages/Orders";
import Customers from "./Pages/Customers";
import Sidebar from "./Components/Sidebar/Sidebar";
import PendingOrders from "./Pages/PendingOrders";
import Login from "./Auth/Login";
import Logout from "./Pages/Logout";
import Json from "./Components/Products/Json";
import { NextUIProvider } from "@nextui-org/react";
import Notification from "./Components/PushNotification";

import { Toaster } from "@/components/ui/sonner";

const App = () => {
  return (
    <NextUIProvider>
      <div className="md:flex md:gap-4 md:pr-2">
        <Router>
          <Sidebar />
          <Notification />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json" element={<Json />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
          <div className="fixed z-[999]">
            <Toaster position="top-center" />
          </div>
        </Router>
      </div>
    </NextUIProvider>
  );
};

export default App;
