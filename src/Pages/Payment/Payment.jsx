import { Elements } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../Provider/AuthProvider';
import usePackage from '../../Hooks/usePackage';
import { Helmet } from 'react-helmet-async';

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const axiosSecure= useAxiosSecure()
    const [pack]=usePackage()
    const {user}=useContext(AuthContext)
    const [selectedOption, setSelectedOption] = useState(pack);

  const handleOptionChange = async (event) => {
    const newOption = event.target.value;
    setSelectedOption(newOption);

    try {
      const response = await axiosSecure.patch(`/hrpack/${user?.email}`, {
        plan: newOption,
      });
      console.log('Plan updated:', response.data);
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  

    return (
        <div className='mt-24'>
           <Helmet>
            <title>EasyLife | Package payment</title>
          </Helmet>
            <h2 className='text-4xl font-bold text-center mb-10'>Please Pay First</h2>
            <div>
             
                <label className='font-lato sm:text-2xl text-base dark:text-white font-semibold mt-10 '><span className='sm:text-4xl text-yellow-500 text-base'>Upgrade your plan</span><br />
                       {/* <input type="text" placeholder='Subcategory_Name' required name='subcategory_Name' className='p-2 mt-2 dark:text-black w-full border-b-black border-b-2 outline-none' /> */}
                       <select name="status" className='dark:text-black md:w-1/3 w-full bg-white rounded-lg border  p-3 mt-10' id="cars"   value={selectedOption}
            onChange={handleOptionChange}>
                       <option value="5 Members for $5">5 Members for $5</option>
    <option value="10 Members for $8"> 10 Members for $8</option>
    <option value="20 Members for $15"> 20 Members for $15</option>
 
 </select>
                   </label>
            </div>

            <div className='mt-10 w-full md:w-1/2 mx-auto border-yellow-500 md:p-10 p-1 border-4 rounded-2xl'>
            <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
               </Elements>
            </div>
            
        </div>
    );
};

export default Payment;