
import { createBrowserRouter } from "react-router-dom";

import Login from "../pages/Login.jsx";
import Home from "../pages/Home.jsx";
import Table from "../pages/Table.jsx";
import Navbar from "../pages/Navbar.jsx";
import Profile from "../pages/Profile.jsx";
import Register from "../pages/Register.jsx";


const router = createBrowserRouter([
    
    {
        path: "/",
        element: <Navbar/>,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/table",
                element: <Table />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ]
    }
    
]);

export default router