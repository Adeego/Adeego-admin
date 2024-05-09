import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import Orders from './Pages/Orders';
import Customers from './Pages/Customers';
import Sidebar from './Components/Sidebar';
import PendingOrders from './Pages/PendingOrders';
import Login from './Auth/Login';
import Logout from './Pages/Logout';
import Json from './Components/Products/Json';
import {NextUIProvider} from "@nextui-org/react";

import { messaging } from './Components/PushNotification';
import { useEffect } from 'react';
import { getToken, onMessage } from "firebase/messaging";

const App = () => {

  async function requestPermission() {
    //requesting permission using Notification API
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "BEBEBf0kdNYh6Y6W7H0L4TjLKSKzFTh1Xd-gD_-vZ51l1uFJUApRaV4PztMT8JDSDwPxr-Py9H8H5eOIUwAWLMA",
      });

      //We can send token to server
      console.log("Token generated : ", token);
    } else if (permission === "denied") {
      //notifications are blocked
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    requestPermission();

    onMessage(messaging, (payload) => {
      console.log(payload)
    });
  }, []);

  return (
    <NextUIProvider>
      <div className='flex flex-row ml-36 h-screen bg-LightGrey'>
        <Router>
          <Sidebar/>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/json" element={<Json/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/customers" element={<Customers/>} />
          </Routes>
        </Router>
      </div>
    </NextUIProvider>
  )
}

export default App;