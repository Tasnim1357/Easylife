import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

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
  console.log(limited)
    return (
        <div  className='mt-24'>
        <h1 className='text-5xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Limited Stock Itmes</h1>
   </div>
    );
};

export default Limited;