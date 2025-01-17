import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, createHashRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/components/AuthLayout/AuthLayout";
import Login from "./modules/Authentication/components/Login/Login";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import Register from "./modules/Authentication/components/Register/Register";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import MasterLayout from "./modules/Shared/components/MasterLayout/MasterLayout";
import Home from "./modules/Home/components/Home/Home";
import RecipesList from "./modules/Recipes/components/RecipesList/RecipesList";
import CategoriesList from "./modules/Categories/components/CategoriesList/CategoriesList";
import UsersList from "./modules/Users/components/UsersList/UsersList";
import Notfound from "./modules/Shared/components/Notfound/Notfound";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./modules/Shared/components/ProtectedRoute/ProtectedRoute";
import RecipeData from "./modules/Recipes/components/RecipeData/RecipeData";
import VerifyAccount from "./modules/Authentication/components/VerifyAccount/VerifyAccount";
import Favourtites from "./modules/Recipes/components/Favourtites/Favourtites";
function App() {

  const routes = createHashRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login/> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "verify-account", element: <VerifyAccount /> },

      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
      </ProtectedRoute>
      ),
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "recipesList", element: <RecipesList /> },
        { path: "recipe-data", element: <RecipeData /> },
        { path: "categoriesList", element: <CategoriesList /> },
        { path: "favourites", element: <Favourtites /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
