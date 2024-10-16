import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [
            {path:"", element:<LoginPage/>},
        ]
    }
])