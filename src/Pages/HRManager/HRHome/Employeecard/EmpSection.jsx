import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import EmployeeCard from './EmployeeCard';




const EmpSection = () => {
    const axiosSecure=useAxiosSecure()
const {user,loading}=useContext(AuthContext)

  const { data: employee = [],refetch } = useQuery({
      queryKey: ['emp', user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
        const { data } = await axiosSecure.get(`/employees1`, {
         
        });
        return data;
      },
    });
    const emp = employee.slice(0, 3);
    return (
        <div className='mt-24'>
            <h1 className='sm:text-5xl text-2xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 sm:w-1/2 w-3/4'>Employees </h1>
            <p className='sm:text-4xl text-2xl font-semibold text-center'>Meet Employees</p>
            <div className='mt-10 grid grid-cols-1 md:grid-cols-3 gap-6'>
                {
                    emp.map(e=><EmployeeCard key={e._id} emp={e}></EmployeeCard>)
                }
            </div>
            
        </div>
    );
};

export default EmpSection;