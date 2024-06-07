import React from 'react';
import CommonSection from '../CommonSection/CommonSection';
import useRole from '../../Hooks/useRole';
import HRHome from '../HRManager/HRHome/HRHome';
import { Helmet } from 'react-helmet-async';

const Home = () => {

    const [role]=useRole()
    return (
        <div>
          {
             role==='HR' &&   <Helmet>
             <title>EasyLife | HR Manager Home</title>
           </Helmet>
          }
          <Helmet>
            <title>EasyLife | Home</title>
          </Helmet>
            <CommonSection></CommonSection>
          <div>
            {
                role==='HR' && <HRHome></HRHome>
            }
          </div>
        </div>
    );
};

export default Home;