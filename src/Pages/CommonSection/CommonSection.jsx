import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Packages from '../Packages/Packages';

const CommonSection = () => {
    return (
        <div>
            <Banner></Banner>
            <About></About>
            <Packages></Packages>
        </div>
    );
};

export default CommonSection;