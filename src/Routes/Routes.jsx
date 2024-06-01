import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";

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
        }
      ]
    },
  ]);

  export default router
  