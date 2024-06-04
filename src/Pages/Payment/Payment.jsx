import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
const stripePromise=loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const location= useLocation()

    return (
        <div>
            <h2 className='text-4xl font-bold text-center'>Please Pay First</h2>
            <div>
                <p>Select a plan</p>
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