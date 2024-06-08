import React, { useEffect, useRef, useState } from 'react';
import MyPending from '../MyPending/MyPending';
import MyMonthly from '../My Monthly/MyMonthly';
import Notice from '../Notice/Notice';
import useEmployee from '../../../Hooks/useEmployee';
import { toast } from 'react-toastify';

const EmployeeHome = () => {
    const [,companyName,isLoading]=useEmployee()
    const toastShownRef = useRef(false);

    useEffect(() => {
        if (!companyName && !isLoading && !toastShownRef.current) {
            toast.warn('Please Contact with your HR');
            toastShownRef.current = true; // Ensure toast is only shown once
        }
    }, [companyName, isLoading]);

 
    // if(!companyName && !isLoading){
    //   toast.warn('Please Contact with your HR')
    // }
    return (
        <div>
            <MyPending></MyPending>
            <MyMonthly></MyMonthly>
            <Notice></Notice>
        </div>
    );
};

export default EmployeeHome;