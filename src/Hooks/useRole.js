import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
// import useAxiosSecure from './useAxiosSecure';
const useRole = () => {
 const {user,loading}=useContext(AuthContext)
//  const axiosSecure=useAxiosSecure()

  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`http://localhost:5000/user/${user?.email}`)
      return data.role
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole