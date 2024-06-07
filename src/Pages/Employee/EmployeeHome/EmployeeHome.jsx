import React from 'react';
import MyPending from '../MyPending/MyPending';
import MyMonthly from '../My Monthly/MyMonthly';
import Notice from '../Notice/Notice';

const EmployeeHome = () => {
    return (
        <div>
            <MyPending></MyPending>
            <MyMonthly></MyMonthly>
            <Notice></Notice>
        </div>
    );
};

export default EmployeeHome;