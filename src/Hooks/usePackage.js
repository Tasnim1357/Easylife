import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
const usePackage = () => {
 const {user,loading}=useContext(AuthContext)


  const { data: pack = '', isLoading,refetch } = useQuery({
    queryKey: ['pack', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`http://localhost:5000/hr/${user?.email}`)
      return data.package1
    },
  })

  //   Fetch user info using logged in user email

  return [pack, isLoading,refetch]
}

export default usePackage