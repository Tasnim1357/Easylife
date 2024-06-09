import { createBrowserRouter } from "react-router-dom";
import Root from "../Pages/Root/Root";
import Home from "../Pages/Home/Home";
import JoinEmployee from "../Pages/JoinEmployee/JoinEmployee";
import Login from "../Pages/Login/Login";
import JoinHR from "../Pages/JoinHR/JoinHR";
import Payment from "../Pages/Payment/Payment";
import AddAsset from "../Pages/HRManager/AddAsset/AddAsset";
import Assetlist from "../Pages/HRManager/AssetList/Assetlist";
import UpdateAsset from "../Pages/HRManager/Updateasset/UpdateAsset";
import AdminRoute from "./Private/AdminRoute";
import ReqAsset from "../Pages/Employee/RequuestAsset/ReqAsset";
import { GiPrivate } from "react-icons/gi";
import Private from './Private/Private';
import MyRequest from "../Pages/Employee/My Requested/MyRequest";
import AllRequest from "../Pages/HRManager/AllRequest/AllRequest";
import AddEmployee from "../Pages/HRManager/AddEmployee/AddEmployee";
import MyEmployee from "../Pages/HRManager/Myemployee/MyEmployee";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import EmpProfile from "../Pages/Employee/EmployeeProfile/EmpProfile";
import HRProfile from "../Pages/HRManager/HRProfile/HRProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      errorElement:<ErrorPage></ErrorPage>,
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
          element:<AdminRoute><Payment></Payment></AdminRoute>
        },
        {
          path:'/addasset',
          element:<AdminRoute><AddAsset></AddAsset></AdminRoute>
        },
        {
          path:'/assets',
          element:<AdminRoute><Assetlist></Assetlist></AdminRoute>
        },
        {
          path:'/allreq',
          element:<AdminRoute><AllRequest></AllRequest></AdminRoute>
        },
        {
          path:'/addemp',
          element:<AdminRoute><AddEmployee></AddEmployee></AdminRoute>
        },
        {
          path:'/myemp',
          element: <AdminRoute><MyEmployee></MyEmployee></AdminRoute>
        },
        {
          path:'/update/:id',
          element:<AdminRoute><UpdateAsset></UpdateAsset></AdminRoute>,
          loader: ({params})=> fetch(`https://assignment12-server-gamma-six.vercel.app/assets/${params.id}`)
        },
        {
          path:'/hrprofile',
          element:<AdminRoute><HRProfile></HRProfile></AdminRoute>
        },
        {
          path:'/req',
          element:<Private><ReqAsset></ReqAsset></Private>
        },
        {
          path: '/myrequest',
          element:<Private><MyRequest></MyRequest></Private>
        },
        {
          path:'/myteam',
          element: <Private><MyTeam></MyTeam></Private>
        },
        {
          path:'/empprofile',
          element:<Private><EmpProfile></EmpProfile></Private>
        }

      ]
    },
  ]);

  export default router
  