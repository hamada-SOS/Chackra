import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import TheFuckinD from "../Components/Drawer/TheFuckinD";
import HomePage from "../Pages/HomePage/HomePage";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [

            {path:"fvv", element:<LoginPage/>},
            {path:"/AdminLogin", element:<AdminLogin/>},
            {path:"", element:<HomePage/>},
        ]
    }
])