import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { RiAdminFill } from "react-icons/ri";
import { IoPeople } from "react-icons/io5";
import { useContext, useEffect, useState } from 'react';

const MyTeam = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];
    
    const { data: hr = [],refetch } = useQuery({
        queryKey: ['HR', user?.email ,current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/myteam/${user?.email}`, {
           
          });
          return data;
        },
      });


      const { data: team2 = []} = useQuery({
        queryKey: ['team2', user?.email ,current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/myteam2/${hr.adminEmail}`, {
            params: {
              
               page: current,
               size: itemsPerPage,
            },
          });
          return data;
        },
      });


      useEffect(() => {
        fetch(`http://localhost:5000/teamCount`)
            .then(res => res.json())
            .then(data => setCount(data.count));
    }, []);

    const handlePrev = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    };

    const handleNxt = () => {
        if (current < pages.length - 1) {
            setCurrent(current + 1);
        }
    };
    return (
        <div className='mt-24'>
            <h1 className='text-4xl font-bold text-center my-5'>My Team</h1>

            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Employee Image</th>
        <th>Employee Name</th>
        <th>Member Type</th>
       
       
      </tr>
    </thead>
    <tbody>
      
                              {team2.map((employee,idx) => (
                <tr key={employee._id}>
                  <td>
             
                       {idx+1}         
                    </td>
                  <td><img src={employee.image} className='w-16 rounded-xl h-16' alt="" /></td>
                  <td>{employee.name}</td>
                  <td>{employee.membertype==='employee'?<IoPeople className='text-4xl text-orange-600' /> : <RiAdminFill className='text-4xl  text-orange-600' />}</td>
                  
                </tr>
              ))}
  
    </tbody>
    
    
  </table>
 
</div>


<div className='pagination mt-4 flex justify-center'>
                   
                   <button className='btn btn-warning mr-1' onClick={handlePrev} disabled={current === 0}>Previous</button>
                   {pages.map(page => (
                       <button
                           key={page}
                           className={current === page ? ' btn-error mx-2 btn  text-white' : 'btn btn-outline'}
                           onClick={() => setCurrent(page)}
                       >
                           {page + 1}
                       </button>
                   ))}
                   <button className='btn btn-warning mx-2' onClick={handleNxt} disabled={current === pages.length - 1}>Next</button>
               </div>
        </div>
    );
};

export default MyTeam;