import "./App.css";
import React, { useEffect } from "react";
import HomePage from "./Components/Homepage/HomePage";
import LoginForm from "./Components/LoginForm/LoginForm";
import NewPassword from "./Components/LoginForm/ForgotPassword/NewPassword";
import FlightBookingcomponent from "./Components/FlightBooking/FlightBookingComponent";
import OrderFood from "./Components/FoodOrder/OrderFood";
import PropertiesPage from "./Components/Properties-Section/PropertiesComponent";
import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="home/bookflight" element={<FlightBookingcomponent />} />
      <Route path="home/food" element={<OrderFood />} />
      <Route path="home/properties" element={<PropertiesPage />} />
      <Route
        path="/authentication/*"
        element={<LoginForm onUserSignedInData={""} />}
      />

      <Route path="/authentication/reset-password" element={<NewPassword />} />
      <Route path="*" element={<h1>Page not found!</h1>} />
    </Routes>
  );
}

export default App;
