import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/LoginPage/LoginPage";
import AdminLogin from "../Pages/AdminLogin/AdminLogin";
import TheFuckinD from "../Components/Drawer/TheFuckinD";
import HomePage from "../Pages/HomePage/HomePage";
import ProblemtopicsPage from "../Pages/ProblemTopicsPage/ProblemtopicsPage";
import ProblemByTopics from "../Pages/ProblemByTopicsPage/ProblemByTopics";
import SolvingPage from "../Pages/solvingPAge/SolvingPage";
import ProblemDetails from "../Components/CodeEditor/ProblemDetails";

export const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children: [

            {path:"fvv", element:<LoginPage/>},
            {path:"/AdminLogin", element:<AdminLogin/>},
            {path:"/", element:<HomePage/>},
            {path:"/ProblemtopicsPage", element:<ProblemtopicsPage/>},
            {path:"/ProblemByTopics", element:<ProblemByTopics/>},
            {path:"/SolvingPage", element:< SolvingPage/>},




        ]
    }
])