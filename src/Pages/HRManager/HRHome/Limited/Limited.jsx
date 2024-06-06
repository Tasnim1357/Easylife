import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import HRCard3 from '../../HRCard/HRCard3';

const Limited = () => {

    const axiosSecure=useAxiosSecure()
    const {user,loading}=useContext(AuthContext)
  
      const { data: limited = [],refetch } = useQuery({
          queryKey: ['limited', user?.email],
          enabled: !loading && !!user?.email,
          queryFn: async () => {
            const { data } = await axiosSecure.get(`/api/requests/limited-stock`, {
             
            });
            return data;
          },
        });
        const limits = limited.slice(0, 4);
    return (
        <div  className='mt-24'>
        <h1 className='text-5xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Limited Stock Itmes</h1>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-4 gap-6'>
          {
            limits.map(limit=><HRCard3 key={limit._id} request={limit}></HRCard3>)
          }
        </div>
   </div>
    );
};

export default Limited;