import React from 'react';

const HRCard3 = ({request}) => {
    const {name, quantity, status1,note, type}=request;
    return (
        <div className="card  bg-[#fffdd9] border-2  shadow-xl duration-500 cursor-pointer hover:scale-105">
        <div className="card-body ">
         <div>
         <h2 className=" text-center text-2xl font-semibold text-[#c56ce8]">{name}</h2>
          <p className='text-xl font-semibold'>{note}</p>
         </div>
          <div className='flex flex-wrap justify-between items-center'>
            <p className='text-xl font-semibold w-1/2'>{status1}</p>
            <p className='text-xl font-semibold '>Quantity: {quantity}</p>
          </div>
          <div className="card-actions justify-end text-xl font-semibold ">
           <span className='border-2 p-3 border-[#c09145] rounded-xl bg-[#ac5dcb] text-white'> {type}</span>
          </div>
        </div>
      </div>
    );
};

export default HRCard3;