import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const ReqAsset = () => {
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
    const [isOpen, setIsOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    function open(item) {
        setCurrentItem(item);
        setIsOpen(true);
    }

    function close() {
        setIsOpen(false);
    }
  

    const { data: assets = [] } = useQuery({
        queryKey: ['assets', user?.email, searchTerm, filterType, filterStatus, current, itemsPerPage],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`assets/emp`, {
                params: {
                    search: searchTerm,
                    type: filterType,
                    status: filterStatus,
                    page: current,
                    size: itemsPerPage
                },
               
            });
            return data;
           
        },
       
    });


    useEffect(() => {
        fetch(`http://localhost:5000/assetsCount?search=${searchTerm}&type=${filterType}`)
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


    return (
        <div>
            <h1 className='text-4xl font-bold text-center my-10'>Request For an Asset</h1>

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
              Filter by Availability<br />
              <select
                name="status"
                className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out-of-stock</option>
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
        <th>Availability</th>
        <th>Request for an asset</th>
       
      </tr>
    </thead>
    <tbody>
      
                              {assets.map((asset, ind) => (
                <tr key={asset._id}>
                  <td>{ind + 1}</td>
                  <td>{asset.name}</td>
                  <td>{asset.type}</td>
                  <td>{asset.status}</td>
                  <td>
                    <Link to="#">
                      <button  onClick={() => open(asset)}  className="btn btn-ghost btn-md bg-orange-500 text-white" disabled={asset.status==='out-of-stock'}>Request</button>
                    </Link>
                  </td>
                </tr>
              ))}
  
    </tbody>
    
    
  </table>
</div>
{isOpen && (
                <Modal close={close} isOpen={isOpen} item={currentItem}  />
            )} 
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

export default ReqAsset;