import React from 'react';
import CommonSection from '../CommonSection/CommonSection';
import useRole from '../../Hooks/useRole';
import HRHome from '../HRManager/HRHome/HRHome';

const Home = () => {

    const [role]=useRole()
    return (
        <div>
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