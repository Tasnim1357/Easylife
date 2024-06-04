import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import usePackage from '../../../Hooks/usePackage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const AddEmployee = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const [memberCount , setmemberCount]=useState(0);
    const [pack,img,companyName]=usePackage()
    const match = pack.match(/(\d+)/);
    const number = match ? parseInt(match[0], 10) : null;
    const navigate= useNavigate()
    
    const { data: employees = [],refetch } = useQuery({
        queryKey: ['employees', user?.email ,current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/employees`, {
            params: {
              
               page: current,
               size: itemsPerPage,
            },
          });
          return data;
        },
      });
      

  





    const handleAdd = async (emp) => {
        if (memberCount < 2) {
            const employee = {
                name: emp.name,
                email: emp.email,
                dob: emp.dob,
                image: emp.image,
                membertype: 'employee',
                adminEmail: user?.email,
                admin: user?.displayName,
                company: companyName,
                logo: img
            };

            const menuRes = await axiosSecure.post('/team', employee);
            if (menuRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${emp.name} is added to the Team`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

            const response = await axiosSecure.patch(`/employee/${emp._id}`, { company: companyName, logo: img });
            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    title: "Great!",
                    text: "You successfully added to the team!",
                    icon: "success"
                });
                refetch();
            }
            const response1 = await axiosSecure.patch(`/hr/${user?.email}`, { memberCount3: 1 });
            if (response1.data.modifiedCount > 0) {
              Swal.fire({
                  title: "Great!",
                  text: "You successfully added to the team!",
                  icon: "success"
              });
              refetch();
          }
            setmemberCount((prevCount) => prevCount + 1);
        } else {
            toast.warn('You have reached the limit');
            navigate('/payment');
        }
    };

     
    return (
        <div>
            <h1>Add an Employee</h1>



            <div>
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
        <th>Request for an asset</th>
       
      </tr>
    </thead>
    <tbody>
      
                              {employees.map((asset) => (
                <tr key={asset._id}>
                  <td>
                  <input
              type="checkbox"
              
              
            />
                    </td>
                  <td><img src={asset.image} className='w-16 rounded-xl h-16' alt="" /></td>
                  <td>{asset.name}</td>
                  <td>Employee</td>
                  <td>
                    <Link to="#">
                      <button  className="btn btn-ghost btn-md bg-orange-500 text-white" onClick={()=>handleAdd(asset)}   >Add to the Team</button>
                    </Link>
                  </td>
                </tr>
              ))}
  
    </tbody>
    
    
  </table>
  <div>
    <button className='btn btn-ghost btn-md bg-orange-500 text-white'>Add selected members To the Team</button>
  </div>
</div>

            </div>

            
        </div>
    );
};

export default AddEmployee;