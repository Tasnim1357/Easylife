import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';

const HRProfile = () => {
    const navigate=useNavigate()
    const{user,profile,setLoading}=useContext(AuthContext)
    const location=useLocation()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure= useAxiosSecure()
    
    const onSubmit = data => {
       
        const {name,Photo}=data;
       
        profile(name,Photo)
        .then(async()=>{


            const response = await axiosSecure.patch(`/hrname/${user?.email}`, { name: name});
       
            const response1 = await axiosSecure.patch(`/teamhrname/${user?.email}`, { name: name});

       
           
            setLoading(false)
            navigate(location?.state? location.state:location)
            toast.success('Your profile updated successfully')
        })
       .catch()
    }
    console.log(errors);
    return (
        <div>
            
            <div className='flex justify-center items-center mt-16'>
       <form onSubmit={handleSubmit(onSubmit)} className=' w-full md:w-1/2 border-2 md:p-8 p-2 space-y-3 grid grid-cols-1 rounded-2xl'>
        <h1 className='text-2xl font-bold text-[#202330] font-sora text-center'>Update Your Account</h1>
            <div>
                <label htmlFor="">Name</label> <br />
                <input type="text" placeholder="Name" defaultValue={user.displayName} className='w-full p-3 border-b-2 border-black' {...register("name",{required:true})} />
                {errors.name && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
            </div>
           
            <div>
                <label htmlFor="">Email</label> <br />
                <input type="text" placeholder="Email" value={user.email? user.email: 'No Email Found'} className='w-full p-3 border-b-2 border-black' {...register("Email", {required: true})} /> 
                {errors.Email && <p role="alert" className='text-red-600 text-lg'>Please give valid Email</p>}
            </div>
            <div>
                <label htmlFor="">photo URL</label> <br />
                <input type="text" placeholder="Photo" value={user.photoURL}  className='w-full p-3 border-b-2 border-black' {...register("Photo",{required:true})} />
                {errors.Photo && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
            </div>
           
      
  
        <input type="submit" value="Update" className='btn w-full bg-[#F9A51A] sm:text-2xl text-balance font-inter font-semibold duration-500 hover:bg-[#2F3D7E] hover:text-white'/>
       
      </form>
    
       </div>

        </div>
    );
};

export default HRProfile;