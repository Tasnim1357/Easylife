import React from 'react';
import Pending from '../Pending/Pending';
import Topmost from '../Topmost/Topmost';
import Limited from './Limited/Limited';
import PieChart from '../PieChart/PieChart';

const HRHome = () => {
    return (
        <div>
            <Pending></Pending>
            <Topmost></Topmost>
            <Limited></Limited>
            <PieChart></PieChart>
        </div>
    );
};

export default HRHome;