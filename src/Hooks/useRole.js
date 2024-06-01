import axios from 'axios'
import useAuth from './useAuth'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
const useRole = () => {
 const {user,loading}=useContext(AuthContext)


  const { data: role = '', isLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`/user/${user?.email}`)
      return data.role
    },
  })

  //   Fetch user info using logged in user email

  return [role, isLoading]
}

export default useRole