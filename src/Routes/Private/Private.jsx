import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Pages/Provider/AuthProvider';


const Private = ({children}) => {
    const {user,loading}=useContext(AuthContext)
    const location=useLocation()
   
    if(loading){
        return <div className='flex justify-center items-center'>
            <span className="loading loading-dots loading-lg dark:text-white"></span>
        </div>
    }
    
    if(user){
        return children;
    }


   return <Navigate state={{from:location}} replace to='/login'></Navigate>
};

export default Private;