import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
const usePackage = () => {
 const {user,loading}=useContext(AuthContext)
 

  const { data, isLoading,refetch } = useQuery({
    queryKey: ['pack','img', user?.email],
    enabled: !loading && !!user?.email,
    // queryFn: async () => {
    //   const { data } = await axios(`http://localhost:5000/hr/${user?.email}`)
    //   return data.package1
    // },
    queryFn: async () => {
        const response = await axios.get(`http://localhost:5000/hr/${user?.email}`)
        // Return both package1 and companyLogo
        return { package1: response.data.package1, companyLogo: response.data.companyLogo }
    },
  })

  const pack = data?.package1 || ''
    const img = data?.companyLogo || ''

 
    return [pack, img, isLoading, refetch]
  //   Fetch user info using logged in user email

//   return [pack,img, isLoading,refetch]
}

export default usePackage













{/* <div className='space-y-8'>

<div className='flex md:flex-row flex-col justify-between items-center gap-4'> */}
{/* Search by name */}
{/* <div>
<label htmlFor="" className='text-lg font-medium'>Search Your Product Here</label>
<input
  type="search"
  placeholder='Search Product here'
  className='p-3 w-3/4 border-2 border-gray-800 text-black rounded-xl'


/>
<button className='btn transform -translate-x-20'>Search</button>
</div> */}
{/* Filter */}
{/* <div>
<label className='font-lato font-medium text-lg dark:text-white'>
  Filter By Type<br />
  <select
    name="type"
    className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
   
  >
    <option value="">All</option>
    <option value="returnable">Returnable</option>
    <option value="non-returnable">Non-returnable</option>
  </select>
</label>
</div>
<div>
<label className='font-lato text-lg font-medium dark:text-white'>
  Filter by Availability<br />
  <select
    name="status"
    className='dark:text-black w-full p-2 mt-2 bg-white border-gray-700 border-2 rounded-xl'
   
  >
    <option value="">All</option>
    <option value="available">Available</option>
    <option value="out-of-stock">Out-of-stock</option>
  </select>
</label>
</div>

</div>
</div> */}