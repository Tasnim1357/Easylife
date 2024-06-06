import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import HRCard from '../HRCard/HRCard';

const Pending = () => {
    const axiosSecure=useAxiosSecure()
  const {user,loading}=useContext(AuthContext)

    const { data: requests2 = [],refetch } = useQuery({
        queryKey: ['requests2', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/api/requests/pending`, {
           
          });
          return data;
        },
      });

      const pending = requests2.slice(0, 3);



    return (
        <div className='mt-24'>

            <h1 className='text-5xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>All Pending Requests</h1>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
              {
                pending.map(req=><HRCard key={req._id} request={req}></HRCard>)
              }
            </div>
        </div>
    );
};

export default Pending;