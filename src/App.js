import "./App.css";
import React, { Suspense } from "react";
import HomePage from "./Components/Homepage/HomePage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoadSpinner from "./Components/PublicHelper/Spinner";

const LoginForm = React.lazy(() => import("./Components/LoginForm/LoginForm"));
const NewPassword = React.lazy(() =>
  import("./Components/LoginForm/ForgotPassword/NewPassword")
);
const FlightBookingcomponent = React.lazy(() =>
  import("./Components/FlightBooking/FlightBookingComponent")
);
const OrderFood = React.lazy(() => import("./Components/FoodOrder/OrderFood"));
const PropertiesPage = React.lazy(() =>
  import("./Components/Properties-Section/PropertiesComponent")
);

function App() {
  return (
    <Suspense fallback={<LoadSpinner />}>
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

        <Route
          path="/authentication/reset-password"
          element={<NewPassword />}
        />
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Routes>
    </Suspense>
  );
}

export default App;
