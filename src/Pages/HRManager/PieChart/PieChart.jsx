import React, { useContext } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';



const PieChart = () => {
    const axiosSecure=useAxiosSecure()
    const {user,loading}=useContext(AuthContext)
  
    const { data: pie = [],refetch } = useQuery({
        queryKey: ['pie', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/api/requests/pie-chart`, {
           
          });
          return data;
        },
      });
console.log(pie)
    return (
        <div className='mt-24'>

            <h1 className='text-5xl font-bold my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Pie Chart</h1>
            
        </div>
    );
};

export default PieChart;