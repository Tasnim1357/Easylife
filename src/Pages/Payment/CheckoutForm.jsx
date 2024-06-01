import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const CheckoutForm = () => {

    const [error, setError]=useState('');
    const [clientSecret, setClientSecret]=useState('')
    const stripe=useStripe();
    const [transactionId, setTransactionId]=useState('')
    const {user}=useContext(AuthContext)
    const elements = useElements();
    const navigate=useNavigate()
   

    useEffect( () => {
        // Create PaymentIntent as soon as the page loads
        if(totalPrice>0){
            axios.post("/create-payment-intent", {price: totalPrice})
            .then((res) => {
              console.log(res.data.clientSecret);
              setClientSecret(res.data.clientSecret);
            })
        }
     
      }, [axiosSecure,totalPrice]);





    const handleSubmit=async(e)=>{
        e.preventDefault();
        
    if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
      const card = elements.getElement(CardElement);

      if (card == null) {
        return;
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });

      if (error) {
        console.log('[error]', error);
        setError(error.message)
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      setError('')
    }

    // confirm payment

    const {paymentIntent,error: confirmError }=await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
            card: card,
            billing_details:{
                email:user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if(confirmError){
        console.log('confirm error')
    }else{
        console.log('payment-intent',paymentIntent)
        if(paymentIntent.status === 'succeeded'){
            console.log('transaction id',paymentIntent.id);
            setTransactionId(paymentIntent.id)
            // now save the payment in the database
            const payment={
                email: user.email,
                price:totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(), //utc date convert. use moment js to
               
                status: 'pending'
            }

            const res= await axios.post('/payments',payment);
            console.log('payment saved',res.data);
            refetch();
            if(res.data?.paymentResult?.insertedId){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for the taka poisa",
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/dashboard/paymentHistory')
            }
        }
    }
  
  
    }









    return (
        <form onSubmit={handleSubmit}>
        <CardElement
   options={{
     style: {
       base: {
         fontSize: '16px',
         color: '#424770',
         '::placeholder': {
           color: '#aab7c4',
         },
       },
       invalid: {
         color: '#9e2146',
       },
     },
   }}
 />
 <button className='btn btn-sm btn-primary' type="submit" disabled={!stripe || !clientSecret}>
   Pay
 </button>
 <p className='text-red-600'>{error}</p>
 {transactionId && <p className='text-green-600'>Your transaction id: {transactionId}</p>}
   </form>
    );
};

export default CheckoutForm;