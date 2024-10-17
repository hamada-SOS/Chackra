import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [

            {path:"", element:<LoginPage/>},
            {path:"/AdminLogin", element:<AdminLogin/>},
        ]
    }
])