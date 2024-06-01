import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import JoinHR from "../Pages/JoinHR/JoinHR";
import Payment from "../Pages/Payment/Payment";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/joinemployee',
          element:<JoinEmployee></JoinEmployee>
        },
        {
          path:'/joinhr',
          element:<JoinHR></JoinHR>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/payment',
          element:<Payment></Payment>
        }

      ]
    },
  ]);

  export default router
  