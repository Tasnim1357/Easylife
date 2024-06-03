import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Pages/Provider/AuthProvider';
import useRole from '../../Hooks/useRole';

const AdminRoute = ({children}) => {
    const {user, loading}=useContext(AuthContext)
    const location=useLocation()
  const [role,isLoading]=useRole()

    if(loading || isLoading){
        return <div className='flex justify-center items-center'>
            <span className="loading loading-dots loading-lg dark:text-white"></span>
        </div>
    }
    
    if(user && role==='HR'){
        return children;
    }


   return <Navigate to='/' state={{from:location}} replace ></Navigate>
};

export default AdminRoute;