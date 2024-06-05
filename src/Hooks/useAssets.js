import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { AuthContext } from '../Pages/Provider/AuthProvider'
const useAssets = () => {
 const {user,loading}=useContext(AuthContext)


  const { data: assets=[], isLoading,refetch } = useQuery({
    queryKey: ['assets', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axios(`https://assignment12-server-gamma-six.vercel.app/assets`)
      return data
    },
  })

  console.log(assets,refetch)

  //   Fetch user info using logged in user email

  return [assets, isLoading]
}


export default useAssets


