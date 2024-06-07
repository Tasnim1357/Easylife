import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import usePackage from '../../../Hooks/usePackage';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const AddEmployee = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const [memberCount, setMemberCount] = useState(0);
    const numberOfPage = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPage).keys()];
    const [pack,img,companyName]=usePackage()
    const match = pack.match(/(\d+)/);
    const number = match ? parseInt(match[0], 10) : null;
    const navigate= useNavigate()

    const [selectedEmployees, setSelectedEmployees] = useState([]);
    
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
      

  
      useEffect(() => {
        fetch(`http://localhost:5000/employeeCount`)
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







  const handleSelectEmployee = (empId) => {
      setSelectedEmployees((prevSelected) => {
          if (prevSelected.includes(empId)) {
              return prevSelected.filter((id) => id !== empId);
          } else {
              return [...prevSelected, empId];
          }
      });
  };

  const handleAdd = async (emp) => {


      if(memberCount < number){

        const employee = {
          name: emp.name,
          email: emp.email,
          dob: emp.dob,
          image: emp.image,
          adminEmail: user?.email,
          admin: user?.displayName,
          company: companyName,
          logo: img,
      };

      try {
          const menuRes = await axiosSecure.post('/team', employee);
          if (menuRes.data.insertedId) {
              Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${emp.name} is added to the Team`,
                  showConfirmButton: false,
                  timer: 1500,
              });

              const response = await axiosSecure.patch(`/employee/${emp._id}`, { company: companyName, logo: img });
              if (response.data.modifiedCount > 0) {
                  refetch();
              }

              const response1 = await axiosSecure.patch(`/hr/${user?.email}`, { memberCount3:  1 });
              if (response1.data.modifiedCount > 0) {
                 
                  refetch();
              }
              setMemberCount((prevCount) => prevCount + 1);
          }
      } catch (error) {
          console.error('Error adding employee:', error);
      }

      }
    else{
      toast.warn('You have reached the limit');
          navigate('/payment');
          return;
    }
    
  };

  const handleAddSelected = async () => {
      if (memberCount + selectedEmployees.length > number) {
          toast.warn('You have reached the limit');
          navigate('/payment');
          return;
      }

      for (const empId of selectedEmployees) {
          const emp = employees.find((e) => e._id === empId);
          if (emp) {
              await handleAdd(emp);
          }
      }
      setSelectedEmployees([]);
  };













     
    return (
        <div className='mt-24'>
             <Helmet>
            <title>EasyLife | Add Employee</title>
          </Helmet>
            <h1 className='text-4xl font-bold text-center my-5'>Add Your Employee</h1>



            <div className='mt-10'>
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
               checked={selectedEmployees.includes(asset._id)}
               onChange={() => handleSelectEmployee(asset._id)}
               disabled={asset.logo}
              
            />
                    </td>
                  <td><img src={asset.image} className='w-16 rounded-xl h-16' alt="" /></td>
                  <td>{asset.name}</td>
                  <td>Employee</td>
                  <td>
                    <Link to="#">
                      <button  className="btn btn-ghost btn-md bg-orange-500 text-white" onClick={()=>handleAdd(asset)} disabled={asset.logo}  >Add to the Team</button>
                    </Link>
                  </td>
                </tr>
              ))}
  
    </tbody>
    
    
  </table>
  <div>
    <button className='btn btn-ghost btn-md bg-orange-500 text-white'    onClick={handleAddSelected}>Add selected members To the Team</button>
  </div>
</div>

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

export default AddEmployee;