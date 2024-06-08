import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
const useEmployee = () => {
 const {user,loading}=useContext(AuthContext)
 

  const { data, isLoading,refetch } = useQuery({
    queryKey: ['img1','companyName', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
        const response = await axios.get(`https://assignment12-server-gamma-six.vercel.app/employee/${user?.email}`)
        // Return both package1 and companyLogo
        return { companyLogo: response.data.logo,company:response.data.company }
    },
  })

    const img1 = data?.companyLogo || ''
    const companyName = data?.company || ''

 
    return [ img1,companyName, isLoading, refetch]
  //   Fetch user info using logged in user email

}

export default useEmployee






