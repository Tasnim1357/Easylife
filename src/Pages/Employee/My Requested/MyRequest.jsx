import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import PDFFile from '../PDFFile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';

const MyRequest = () => {

    const {user,loading}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()

    const [count, setCount] = useState(0);
    const [itemsPerPage] = useState(10);
    const [current, setCurrent] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const numberOfPage = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPage).keys()];
 

    const { data: requests = [],refetch } = useQuery({
        queryKey: ['requests', user?.email, searchTerm, filterType, filterStatus, current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
          const { data } = await axiosSecure.get(`request/${user?.email}`, {
            params: {
              search: searchTerm,
              type: filterType,
              status: filterStatus,
              page: current,
              size: itemsPerPage,
            },
          });
          return data;
        },
      });
    


    useEffect(() => {
        fetch(`https://assignment12-server-gamma-six.vercel.app/requestCount?search=${searchTerm}&type=${filterType}`)
            .then(res => res.json())
            .then(data => setCount(data.count));
    }, [searchTerm,filterType]);

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
          confirmButtonText: "Yes, delete it!"
        }).then( async(result) => {
          if (result.isConfirmed) {


            const res= await axiosSecure.delete(`/request/${item._id}`);
            console.log(res.data)
      
                if(res.data.deletedCount>0){
                  refetch();
                  
                Swal.fire({
                title: "Deleted!",
                text: `${item.name} has been deleted.`,
                icon: "success"
              });
                }
            
          }
        });
      }
   const handlereturn=async(request)=>{
  


    try {
      // Update the request status
      const response = await axiosSecure.patch(`/request/${request._id}`, { status1: 'returned' });
      if (response.data.modifiedCount > 0) {
        Swal.fire({
          title: "Great!",
          text: "You successfully returned the request!",
          icon: "success"
        });
          refetch()
        // Update the asset quantity
        const response1 = await axiosSecure.patch(`/assetlist/${request.assetId}`, { incrementBy: 1 });
        if (response1.data.message === 'Asset quantity updated successfully') {
          console.log('Asset quantity incremented by 1');
        } else {
          console.error('Failed to update asset quantity');
        }
      }
    } catch (error) {
      console.error('Error updating request and asset:', error);
    }
            
               
            }



        
   

  

    return (
        <div>
            <h2 className='text-4xl font-bold text-center my-10'>My Requested Assets</h2>

            
            <div className='space-y-8 my-20'>
        <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
          {/* Search by name */}
          <div>
            <label htmlFor="" className='text-lg font-medium'>Search Your Product Here</label>
           
            <input
              type="search"
              placeholder='Search Product here'
              className='p-3 w-full border-2 border-gray-800 text-black rounded-xl'
              value={searchTerm}
              onChange={(e) =>{
                setSearchTerm(e.target.value)
                setCurrent(0)
              }}

              
            />
         
          </div>
          {/* Filter by Type */}
          <div>
            <label className='font-lato font-medium text-lg dark:text-white'>
              Filter By Type<br />
              <select
                name="type"
                className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value)
                  setCurrent(0)
                }}
              >
                <option value="">All</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-returnable</option>
              </select>
            </label>
          </div>
          {/* Filter by Availability */}
          <div>
            <label className='font-lato text-lg font-medium dark:text-white'>
              Filter by Status<label/>
              <select
                name="status1"
                className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </label>
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
        <th> Request Date</th>
        <th> Approval Date</th>
        <th>Request status</th>
        <th>Action</th>
       
      </tr>
    </thead>
    <tbody>
      
                              {requests.map((request, ind) => (
                <tr key={request._id}>
                  <td>{ind + 1}</td>
                  <td>{request.name}</td>
                  <td>{request.type}</td>
                  <td>{request.requestDate}</td>
                  <td>{request.approvalDate}</td>
                  <td>{request.status1}</td>
                  <td>

                    {
                        request.status1==='pending' &&  <Link to="#">
                        <button  onClick={()=>handleDel(request)}   className="btn btn-ghost btn-md bg-orange-500 text-white" >Cancel</button>
                      </Link>
                    }
                    {
                        request.status1=== 'approved' &&  
                            <PDFDownloadLink document={<PDFFile></PDFFile>} fileName='FORMe2300'>
                                {({loading})=>loading ? 
                                (<button>Loading document...</button>):
                                 (<button className='btn  btn-ghost btn-md bg-orange-500 text-white w-1/2'>Print</button>)
                                 }
                            </PDFDownloadLink>
                           
                            
                     
                    }
                    {
                        (request.status1 === 'approved' && request.type==='returnable' ) && <button className='btn  btn-ghost btn-md bg-orange-500 text-white w-1/2' onClick={()=>handlereturn(request)}>Return</button>
                    }
                    {
                      (request.status1 === 'returned' && request.type==='returnable' )&&  <button className='btn  btn-ghost btn-md bg-orange-500 text-white w-1/2' disabled={request.status1==='returned'}>Return</button>
                    }
                
                  </td>
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

export default MyRequest;