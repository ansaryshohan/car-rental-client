import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AddCarsPage from "../pages/AddCarsPage";
import AllCarsPage from "../pages/AllCarsPage";
import CarDetailsPage from "../pages/CarDetailsPage";
import ConfirmBookingPage from "../pages/ConfirmBookingPage";
import ContactUsPage from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MyBookingsPage from "../pages/MyBookingsPage";
import MyCarsPage from "../pages/MyCarsPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/available-cars",
        element: <AllCarsPage />,
      },
      {
        path: "/cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/confirm-booking/:id",
        element: (
          <PrivateRoute>
            <ConfirmBookingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-cars",
        element: (
          <PrivateRoute>
            {" "}
            <AddCarsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-cars",
        element: (
          <PrivateRoute>
            <MyCarsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            {" "}
            <MyBookingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            {" "}
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <RestrictedRoute>
            {" "}
            <LoginPage />
          </RestrictedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <RestrictedRoute>
            {" "}
            <RegisterPage />
          </RestrictedRoute>
        ),
      },
    ],
  },
]);

export default router;
