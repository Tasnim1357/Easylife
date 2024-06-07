import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import EmpCard1 from '../EmpCard/EmpCard1';

const MyMonthly = () => {

    const axiosSecure=useAxiosSecure()
    const {user,loading}=useContext(AuthContext)
  
      const { data: monthly = [],refetch } = useQuery({
          queryKey: ['monthly', user?.email],
          enabled: !loading && !!user?.email,
          queryFn: async () => {
            const { data } = await axiosSecure.get(`/monthly-requests/${user?.email}`, {
             
            });
            return data;
          },
        });
  

        console.log(monthly)
    return (
        <div className='mt-24'>
            <h1 className='text-5xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>My Monthly Requests</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    monthly.map(req=><EmpCard1 key={req._id} request={req}></EmpCard1>)
                }
             </div>
        </div>
    );
};

export default MyMonthly;