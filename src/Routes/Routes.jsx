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
          path:'/update/:id',
          element:<AdminRoute><UpdateAsset></UpdateAsset></AdminRoute>,
          loader: ({params})=> fetch(`http://localhost:5000/assets/${params.id}`)
        },
        {
          path:'/req',
          element:<ReqAsset></ReqAsset>
        },
        {
          path: '/myrequest',
          element:<Private><MyRequest></MyRequest></Private>
        }

      ]
    },
  ]);

  export default router
  