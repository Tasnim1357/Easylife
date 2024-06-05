import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const image_hosting_key= import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api= `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// import { Helmet } from 'react-helmet-async';

import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/AuthProvider';

const JoinHR = () => {
const {createUser,profile,setLoading}=useContext(AuthContext)
const [showPassword,setShowPassword]=useState(false)
    const { register, handleSubmit, formState: { errors },reset} = useForm();
    const navigate=useNavigate()


    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axios.post(image_hosting_api, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });
        return res.data.success ? res.data.data.display_url : null;
    };
  

    const onSubmit = async (data) => {
     

        
        

        const saveUser = async (data) => {
            const currentUser = {
                email: data.Email,
                role: 'HR',
            };
            const { data: data1 } = await axios.put('https://assignment12-server-gamma-six.vercel.app/user', currentUser);
            return data1;
        };
        try {
         
            const { name,company, image,image2,package1, Email, password,dob } = data;

      




        await saveUser(data);
        console.log(data);

        // Upload user photo
        const userPhotoUrl = await uploadImage(data.image[0]);
        // Upload company logo
        const companyLogoUrl = await uploadImage(data.image2[0]);

        if (userPhotoUrl && companyLogoUrl) {
            const hr = {
                name,
                email: Email,
                dob,
                company,
                package1,
                userPhoto: userPhotoUrl,
                companyLogo: companyLogoUrl,
            };

            await createUser(Email, password);
            await profile(name, userPhotoUrl);
            toast.success("User created successfully");
            

            const menuRes = await axios.put('https://assignment12-server-gamma-six.vercel.app/hr', hr);
            console.log(menuRes.data);
            navigate('/payment')
            if (menuRes.data.modifiedCount) {
                setLoading(false);
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added to the employee`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
            

           
        }
    

          
        catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
    <div >
         {/* <Helmet>
            <title>ArtRoof | Register</title>
          </Helmet> */}
     
      <div className='flex justify-around md:flex-row flex-col gap-1 mt-16'>
      <div className='md:w-1/2 w-full'>
      <img src="https://i.ibb.co/Lp1Nq1y/1000-F-190830361-t-Ro-Wd-RPz-Vc-OVd-Cq-Fw8-Hn-JGu-Taw-Nt-HMd1.jpg" className='w-full h-full' alt="" />
        </div>
         <div className='md:w-1/2 w-full -mt-6'>
         <div className='flex justify-center items-center mt-10'>
         <form onSubmit={handleSubmit(onSubmit)} className=' w-full md:w-full border-2 md:p-8 p-2 space-y-3 grid grid-cols-1 rounded-2xl'>
          <h1 className='text-2xl font-bold text-[#151515] dark:text-white font-poppins  duration-500 hover:text-[#AF9F7B] text-center'>Join as a HR Mananger</h1>
              <div>
                  <label htmlFor="" className='dark:text-white'>Full Name</label> <br />
                  <input type="text" placeholder="Name" className='w-full p-3 border-b-2 border-black outline-none' {...register("name",{required:true})} />
                  {errors.name && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
              </div>
              <div>
                  <label htmlFor="" className='dark:text-white'>Company Name</label> <br />
                  <input type="text" placeholder="Name" className='w-full p-3 border-b-2 border-black outline-none' {...register("company",{required:true})} />
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
                  <label htmlFor="" className='dark:text-white'>User Photo</label> <br />
                  <input type="file" placeholder="Photo"  className='w-full p-3 border-b-2 border-black outline-none' {...register("image",{required:true})} />
                  {errors.image && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
              </div>
              <div>
                  <label htmlFor="" className='dark:text-white'>Company Logo</label> <br />
                  <input type="file" placeholder="Photo"  className='w-full p-3 border-b-2 border-black outline-none' {...register("image2",{required:true})} />
                  {errors.image2 && <p role="alert" className='text-red-600 text-lg'>This field required</p>}
              </div>
              <div>
                   
                    <label className='font-lato text-lg dark:text-white'> Select a Package<br />
                        {/* <input type="text" placeholder='Subcategory_Name' required name='subcategory_Name' className='p-2 mt-2 dark:text-black w-full border-b-black border-b-2 outline-none' /> */}
                        <select  {...register('package1',{required:true})}className='dark:text-black w-full p-2 mt-2' id="cars">
    <option value="5 Members for $5">5 Members for $5</option>
    <option value="10 Members for $8"> 10 Members for $8</option>
    <option value="20 Members for $15"> 20 Members for $15</option>
 
  </select>
                      
                    </label>
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
         </div>
      </div>
     
      
    </div>
  
    );
};

export default JoinHR;