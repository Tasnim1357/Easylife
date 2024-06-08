import React, { useContext } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../Provider/AuthProvider';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Pie1 = () => {
    const axiosSecure=useAxiosSecure()
    const {user,loading}=useContext(AuthContext)
  
    const { data: pie = [], isLoading } = useQuery({
        queryKey: ['pie', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/api/requests/pie-chart`, {
           
          });
          return data;
        },
      });



const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
    return (
        <div className='mt-24'>

            <h1 className='text-5xl font-bold my-5 border-b-yellow-500 pb-6 border-b-4 w-1/2'>Pie Chart</h1>
           
           <div>
           {
                 isLoading? <div className='flex justify-center'><span className="loading loading-bars loading-lg"></span></div>
                 :
                 <div className='flex justify-center items-center'>

                 <PieChart width={400} height={400}>
               <Pie
                 data={pie}
                 cx="50%"
                 cy="50%"
                 labelLine={false}
                 label={renderCustomizedLabel}
                 outerRadius={180}
                 fill="#8884d8"
                 dataKey="value"
               >
                 {pie.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                 ))}
               </Pie>
               <Legend className='flex flex-wrap'></Legend>
             </PieChart>
                 </div>
           }
           </div>
           
         
        </div>
    );
};

export default Pie1;