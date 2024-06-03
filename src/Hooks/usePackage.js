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