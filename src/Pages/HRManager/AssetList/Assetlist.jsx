import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useActionData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';
import Swal from 'sweetalert2';


const Assetlist = () => {
   

    const {user,loading}=useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [isSorting, setIsSorting] = useState(false);
  const [count, setCount] = useState(0);
  const [itemsPerPage] = useState(10);
  const [current, setCurrent] = useState(0);

  const numberOfPage = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()];

  const { data: assets = [], refetch } = useQuery({
    queryKey: ['assets', user?.email, current, itemsPerPage],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
        const { data } = await axios.get(`http://localhost:5000/assets`, {
            params: { page: current, size: itemsPerPage }
        });
        return data;
    },
});


useEffect(() => {
  fetch('http://localhost:5000/productsCount/')
      .then(res => res.json())
      .then(data => setCount(data.count));
}, []);

 const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterType = (e) => {
    setFilterType(e.target.value);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
  };


  const handleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setIsSorting(true);
};

  const filteredAssets = assets
    .filter((asset) => asset.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((asset) => (filterType ? asset.type === filterType : true))
    .filter((asset) => (filterStatus ? asset.status === filterStatus : true))
    
    if (isSorting) {
        filteredAssets.sort((a, b) => (sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity));
    }



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


            const res= await axios.delete(`http://localhost:5000/assets/${item._id}`);
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
        <div>
            <h1 className='text-4xl font-bold text-center my-10'>All the Asset list</h1>
            <div className='space-y-8'>

            <div className='flex md:flex-row flex-col justify-between items-center gap-4'>
          {/* Search by name */}
          <div>
            <label htmlFor="" className='text-lg font-medium'>Search Your Product Here</label>
            <input
              type="search"
              placeholder='Search Product here'
              className='p-3 w-full border-2 border-gray-800 text-black rounded-xl'
              value={searchTerm}
              onChange={handleSearch}

            />
          </div>
          {/* Filter */}
          <div>
            <label className='font-lato font-medium text-lg dark:text-white'>
              Filter By Type<br />
              <select
                name="type"
                className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
                onChange={handleFilterType}
              >
                <option value="">All</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-returnable</option>
              </select>
            </label>
          </div>
          <div>
            <label className='font-lato text-lg font-medium dark:text-white'>
              Filter by Status<br />
              <select
                name="status"
                className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
                onChange={handleFilterStatus}
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out-of-stock</option>
              </select>
            </label>
          </div>
          {/* Sort by quantity */}
          <button className='btn btn-info btn-outline text-red-600' onClick={handleSortOrder}>
            Sort By Quantity ({sortOrder === 'asc' ? 'Descending' : 'Ascending'})
          </button>
        </div>
            </div>
             <div className='mt-10'>


            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Product Name</th>
        <th>Product Type</th>
        <th>Product Quantity</th>
        <th>Added Date</th>
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
   
    {
        filteredAssets.map((asset,idx)=> <tr key={asset._id}>
        <th>{idx+1}</th>
        <td>{asset.name}</td>
        <td>{asset.type}</td>
        <td>{asset.quantity}</td>
        <td>{asset.date}</td>
        <td><Link to={`/update/${asset._id}`}><button><FaEdit className='text-green-500 text-4xl'></FaEdit></button></Link></td>
        <td><button  onClick={()=>handleDel(asset)}><FaTrash className='text-red-500 text-3xl'></FaTrash></button></td>
      </tr>)
    }       
     
      
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
        </div>
    );
};

export default Assetlist;