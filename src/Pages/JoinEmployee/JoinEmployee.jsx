import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import { Helmet } from 'react-helmet-async';

import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';
import { FcGoogle } from 'react-icons/fc';
const JoinEmployee = () => {
const {createUser,profile,setLoading,goolgeLogin}=useContext(AuthContext)
const [showPassword,setShowPassword]=useState(false)
    const { register, handleSubmit, formState: { errors },reset} = useForm();
    const location=useLocation()
    const navigate = useNavigate();
 
  
    const onSubmit = async (data) => {
        try {
          const { name, image, Email, password, dob } = data;
    
          // Image upload to imgbb and get URL
          const imageFile = new FormData();
          imageFile.append('image', image[0]);
          const res = await axios.post(image_hosting_api, imageFile);
          
          if (res.data.success) {
            const imageUrl = res.data.data.display_url;
    
            // Create user
            await createUser(Email, password);
            await profile(name, imageUrl);
    
            // Save user to database
            const currentUser = { email: Email, role: 'employee' };
            await axios.put('https://assignment12-server-gamma-six.vercel.app/user', currentUser);
    
            const employee = { name, email: Email, dob, image: imageUrl };
            await axios.put('https://assignment12-server-gamma-six.vercel.app/employee', employee);
    
            toast.success("User created successfully");
    
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${name} is added as an employee`,
              showConfirmButton: false,
              timer: 1500
            });
    
            setLoading(false);
            reset();
            navigate(location?.state?.from || '/');
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      };
    
      const socialLogin = (social) => {
        social()
          .then(async (result) => {
            const { user } = result;
            const currentUser = { email: user.email, role: 'employee' };
            await axios.put('https://assignment12-server-gamma-six.vercel.app/user', currentUser);
    
            const employee = {
              name: user.displayName,
              email: user.email,
              dob: null,
              image: user.photoURL,
            };
            await axios.put('https://assignment12-server-gamma-six.vercel.app/employee', employee);
    
            toast.success("User logged in successfully");
    
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} is added as an employee`,
              showConfirmButton: false,
              timer: 1500
            });
    
            setLoading(false);
            reset();
            navigate(location?.state?.from || '/');
          })
          .catch(error => {
            console.error(error);
            toast.warn(`${error.message}. Give valid email and password`);
          });
      };
    



    return (
    <div >
         <Helmet>
            <title>EasyLife | Join as Employee</title>
          </Helmet>
     
      <div className='flex justify-around md:flex-row flex-col gap-1 mt-16'>
      <div className='md:w-1/2 w-full'>
      <img src="https://i.ibb.co/PGxhqJq/portrait-of-happy-redhaired-woman-employee-in-optical-glasses-has-satisfied-expression-works-with-mo.jpg" className='w-full h-full' alt="" />
        </div>
         <div className='md:w-1/2 w-full -mt-6'>
         <div className='flex justify-center items-center mt-10'>
         <form onSubmit={handleSubmit(onSubmit)} className=' w-full md:w-full border-2 md:p-8 p-2 space-y-3 grid grid-cols-1 rounded-2xl'>
          <h1 className='text-2xl font-bold text-[#151515] dark:text-white font-poppins  duration-500 hover:text-[#AF9F7B] text-center'>Join as an Employee</h1>
              <div>
                  <label htmlFor="" className='dark:text-white'>Name</label> <br />
                  <input type="text" placeholder="Name" className='w-full p-3 border-b-2 border-black outline-none' {...register("name",{required:true})} />
                  {errors.name && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
              </div>
             
              <div>
                  <label htmlFor="" className='dark:text-white'>Email</label> <br />
                  <input type="text" placeholder="Email"  className='w-full p-3 border-b-2 border-black outline-none' {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} /> 
                  {errors.Email && <p role="alert" className='text-red-600 text-lg'>Please give valid Email</p>}
              </div>
              <div>
                  <label htmlFor="" className='dark:text-white'>Date of birth</label> <br />
                  <input type="date" placeholder="Date of Birth"  className='w-full p-3 border-b-2 border-black outline-none' {...register("dob", {required: true})} /> 
                  {errors.Email && <p role="alert" className='text-red-600 text-lg'>Please give valid Date of Birth</p>}
              </div>
              <div>
                  <label htmlFor="" className='dark:text-white'>Photo</label> <br />
                  <input type="file" placeholder="Photo"  className='w-full p-3 border-b-2 border-black outline-none' {...register("image",{required:true})} />
                  {errors.image && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
              </div>
              <div className='relative'>
                  <label htmlFor="" className='dark:text-white'>Password</label> <br />
                  <input 
                  type={ showPassword ?"text" :"password" }
                  placeholder="Password"  className='w-full p-3 border-b-2 border-black outline-none' {...register('password', { 
            required: 'Password is required',
            minLength: {
              value:6 ,
              message: 'Password must be at least 6 characters long',
            },
            validate: {
              uppercase: value => /[A-Z]/.test(value) || 'Password must contain at least one uppercase letter',
              lowercase: value => /[a-z]/.test(value) || 'Password must contain at least one lowercase letter'
            }
          })} />
          <span className='absolute top-[45%] transform -translate-x-8' onClick={()=>setShowPassword(!showPassword)}>
              {
                  showPassword ? <FaRegEyeSlash className='text-2xl' /> : <FaRegEye className='text-2xl' />
              }
          </span>
          
                 {errors.password && <p role="alert" className='text-red-600 text-lg'>{errors.password.message}</p>}
                  </div>
      
        
    
          <input type="submit" value="Sign Up" className='btn w-full font-lato sm:text-xl text-balance bg-[#ECA300] text-[#2D394B] duration-500 hover:text-[#ECA300] hover:bg-[#2D394B]'/>
          <p className='dark:text-white'>Already have an account?Please <Link to='/login' className='btn-link text-lg font-sora font-bold'>Sign In</Link></p>
        </form>
      
         </div>
         <div className='border-2 p-3 rounded-3xl text-center w-full  md:w-full lg:w-1/2 mx-auto mt-4 border-gray-300 flex justify-center items-center space-x-4 duration-500 hover:bg-[#6e85d5] hover:border hover:border-green-600 cursor-pointer'>
     <FcGoogle className='text-2xl' />
      <h1 className='font-bold text-[#2F3D7E] font-sora text-center  text-sm sm:text-base dark:text-white ' onClick={()=>socialLogin(goolgeLogin)}>Continue With Google</h1>
     </div>
         </div>
      </div>
     
      
    </div>
  
    );
};

export default JoinEmployee;