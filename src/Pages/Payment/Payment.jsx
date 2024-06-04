import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
  

    return (
        <div className='mt-24'>
            <h2 className='text-4xl font-bold text-center'>Please Pay First</h2>
            <div>
             
                <label className='font-lato text-lg dark:text-white'>Upgrade your plan<br />
                       {/* <input type="text" placeholder='Subcategory_Name' required name='subcategory_Name' className='p-2 mt-2 dark:text-black w-full border-b-black border-b-2 outline-none' /> */}
                       <select name="status" className='dark:text-black w-1/3 bg-white rounded-lg border  p-3 mt-2' id="cars">
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