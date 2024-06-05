import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyEmployee = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];





    const { data: team = [],refetch } = useQuery({
        queryKey: ['team', user?.email ,current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/team/${user?.email}`, {
            params: {
              
               page: current,
               size: itemsPerPage,
            },
          });
          return data;
        },
      });

    

      
    const handleDel= (item)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!"
        }).then( async(result) => {
          if (result.isConfirmed) {


            const res= await axiosSecure.delete(`/team/${item._id}`);
            console.log(res.data)
      
                if(res.data.deletedCount>0){
                  refetch();
                  
                Swal.fire({
                title: "Remove!",
                text: `${item.name} has been removed.`,
                icon: "success"
              });
                }

                const response1 = await axiosSecure.patch(`/hr/${user?.email}`, { memberCount3: -1 });
                if (response1.data.modifiedCount > 0) {
                  Swal.fire({
                      title: "Great!",
                      text: "You successfully removed the team!",
                      icon: "success"
                  });
                  refetch();
              }
            
          }
        });
      }

      useEffect(() => {
        fetch(`https://assignment12-server-gamma-six.vercel.app/teamCount`)
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
            <h1 className='text-4xl font-bold text-center my-5'>My Employee List</h1>
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
        <th>Action</th>
       
      </tr>
    </thead>
    <tbody>
      
                              {team.map((employee,idx) => (
                <tr key={employee._id}>
                  <td>
             
                       {idx+1}         
                    </td>
                  <td><img src={employee.image} className='w-16 rounded-xl h-16' alt="" /></td>
                  <td>{employee.name}</td>
                  <td>{employee.membertype}</td>
                  <td>
                    <Link to="#">
                      <button  className="btn btn-ghost btn-md bg-orange-500 text-white" onClick={()=>handleDel(employee)}  >Remove from the Team</button>
                    </Link>
                  </td>
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

export default MyEmployee;