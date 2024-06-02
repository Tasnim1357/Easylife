import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useActionData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';


const Assetlist = () => {
   

    const {user,loading}=useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const { data: assets=[], isLoading,refetch } = useQuery({
    queryKey: ['assets', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`http://localhost:5000/assets`)
      return data
    },
  })
 console.log(assets)


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
  };

  const filteredAssets = assets
    .filter((asset) => asset.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((asset) => (filterType ? asset.type === filterType : true))
    .filter((asset) => (filterStatus ? asset.status === filterStatus : true))
    .sort((a, b) => (sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity));








    return (
        <div>
            <h1 className=''>All the Asset list</h1>
            <div>

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
            Sort By Quantity ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
          </button>
        </div>
            </div>
             <div>


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
        <td><button><FaEdit className='text-green-500 text-4xl'></FaEdit></button></td>
        <td><button><FaTrash className='text-red-500 text-3xl'></FaTrash></button></td>
      </tr>)
    }       
     
      
    </tbody>
  </table>
</div>

            </div>
        </div>
    );
};

export default Assetlist;