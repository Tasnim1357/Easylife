import React from 'react';
import Pending from '../Pending/Pending';
import Topmost from '../Topmost/Topmost';
import Limited from './Limited/Limited';
import PieChart from '../PieChart/PieChart';
import Pie1 from './Pie1/Pie1';
import EmpSection from './Employeecard/EmpSection';
import AssetCollection from './AssetCollection/AssetCollection';

const HRHome = () => {
    return (
        <div>
            <Pending></Pending>
            <Topmost></Topmost>
            <Limited></Limited>
           <Pie1></Pie1>
           <EmpSection></EmpSection>
           <AssetCollection></AssetCollection>
        </div>
    );
};

export default HRHome;