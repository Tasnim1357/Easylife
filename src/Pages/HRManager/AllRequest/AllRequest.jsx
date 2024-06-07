import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const AllRequest = () => {
    const {user,loading}=useContext(AuthContext)
    const axiosSecure= useAxiosSecure()
    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];


    const { data: requests1 = [],refetch } = useQuery({
        queryKey: ['requests1', user?.email, searchName, searchEmail, current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/requests`, {
            params: {
                name: searchName,
                email: searchEmail,
               page: current,
               size: itemsPerPage,
            },
          });
          return data;
        },
      });


      useEffect(() => {
        fetch(`https://assignment12-server-gamma-six.vercel.app/requestsCount?search=${searchName}&email=${searchEmail}`)
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




    const handleDel= (item)=>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, reject it!"
        }).then( async(result) => {
          if (result.isConfirmed) {


            const res= await axiosSecure.delete(`/request/${item._id}`);
            console.log(res.data)
      
                if(res.data.deletedCount>0){
                  refetch();
                  
                Swal.fire({
                title: "Rejected!",
                text: `${item.name} has been rejected.`,
                icon: "success"
              });
                }
            
          }
        });
      }


      const handleapprove=async(request)=>{
  


        try {
          // Update the request status
          const response = await axiosSecure.patch(`/requesthr/${request._id}`, { status1: 'approved', approvalDate: new Date() });
          if (response.data.modifiedCount > 0) {
            Swal.fire({
              title: "Great!",
              text: "You successfully approved the request!",
              icon: "success"
            });
              refetch()
                
                
           
          }
        } catch (error) {
          console.error('Error updating request and asset:', error);
        }
                
                   
                }
    

    
    return (
        <div className='mt-24'>
          
          <Helmet>
            <title>EasyLife | All Requests</title>
          </Helmet>
            <h1 className='text-4xl font-bold text-center my-5'>All Requests are here</h1>


               <div className='space-y-8 my-20'>
        <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
          {/* Search by name */}
          <div className='flex sm:flex-row flex-col justify-between gap-5'>
           


<input
          type="text"
          className='p-3 w-full border-2 border-gray-800 text-black rounded-xl'
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          className='p-3 w-full border-2 border-gray-800 text-black rounded-xl'
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        
         
          </div>
         
        </div>
      </div>
            <div>
            <div className="overflow-x-auto">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr>
        <th>
         #
        </th>
        <th>Asset Name</th>
        <th>Asset Type</th>
        <th>Name of Requester</th>
        <th>Email of Requester</th>
        <th> Request Date</th>
        <th> Additional Note</th>
        <th>Request status</th>
        <th>Approve</th>
        <th>Reject</th>
       
      </tr>
    </thead>
    <tbody>
      
                              {requests1.map((request, ind) => (
                <tr key={request._id}>
                  <td>{ind + 1}</td>
                  <td>{request.name}</td>
                  <td>{request.type}</td>
                  <td>{request.userName}</td>
                  <td>{request.userEmail}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.note}</td>
                  <td>{request.status1}</td>
                  <td>
                                <button className='btn  btn-ghost btn-md bg-orange-500   text-white w-full' disabled=
                                {request.status1==='approved'} onClick={()=>handleapprove(request)}>Approve</button>
                
                  </td>
                  
                  <td><button className='btn  btn-ghost btn-md bg-orange-500 text-white w-3/4' onClick={()=>handleDel(request)}>Reject</button></td>
                </tr>
              ))}
  
    </tbody>
    
    
  </table>
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

export default AllRequest;