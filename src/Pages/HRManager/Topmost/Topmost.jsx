import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import HRCard2 from '../HRCard/HRCard2';

const Topmost = () => {
    const axiosSecure=useAxiosSecure()
    const {user,loading}=useContext(AuthContext)
  
      const { data: top = [],refetch } = useQuery({
          queryKey: ['top', user?.email],
          enabled: !loading && !!user?.email,
          queryFn: async () => {
            const { data } = await axiosSecure.get(`/topmost-requests`, {
             
            });
            return data;
          },
        });

        const top2 = top.slice(0, 3);

    return (
        <div  className='mt-24'>
             <h1 className='text-5xl font-bold my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Top Most Requests</h1>
             <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
              {
                top2.map(topItem=><HRCard2 key={topItem._id} request={topItem}></HRCard2>)

              }
             </div>
        </div>
    );
};

export default Topmost;