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

const App = () => {
  return (
    <NextUIProvider>
      <div className="lg:flex">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/json" element={<Json />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
          </Routes>
        </Router>
      </div>
    </NextUIProvider>
  );
};

export default App;
