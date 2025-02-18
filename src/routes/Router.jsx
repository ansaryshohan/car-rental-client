import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AboutUsPage from "../pages/AboutUsPage";
import AddCarsPage from "../pages/AddCarsPage";
import AllCarsPage from "../pages/AllCarsPage";
import ContactUsPage from "../pages/ContactUsPage";
import ErrorPage from "../pages/ErrorPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import MyCarsPage from "../pages/MyCarsPage";
import CarDetailsPage from "../pages/CarDetailsPage";

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
        path: "/all-cars",
        element: <AllCarsPage />,
      },
      {
        path: "/cars/:id",
        element: <CarDetailsPage />,
      },
      {
        path: "/add-cars",
        element: <AddCarsPage />,
      },
      {
        path: "/my-cars",
        element: <MyCarsPage />,
      },
      {
        path: "/about-us",
        element: <AboutUsPage />,
      },
      {
        path: "/contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
