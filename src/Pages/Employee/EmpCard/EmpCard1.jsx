import React from 'react';

const EmpCard1 = ({request}) => {
    const {name, quantity, status1,note, type}=request;
    return (
        <div className="card  bg-[url('https://t3.ftcdn.net/jpg/05/24/14/44/360_F_524144420_kAYcOWuld4q0ggrzc4ObD1CFMtr8ELk5.jpg')]  shadow-xl duration-500 cursor-pointer hover:scale-105">
        <div className="card-body ">
         <div>
         <h2 className=" text-center text-2xl font-semibold text-[#22311e]">{name}</h2>
          <p className='text-xl font-semibold'>{note}</p>
         </div>
          <div className='flex flex-wrap justify-between items-center'>
            <p className='text-xl font-semibold w-1/2'>{status1}</p>
            <p className='text-xl font-semibold '>Quantity: {quantity}</p>
          </div>
          <div className="card-actions justify-end text-xl font-semibold ">
           <span className='border-2 p-3 shadow-lg rounded-xl bg-[#44a8be] text-white'> {type}</span>
          </div>
        </div>
      </div>
    );
};

export default EmpCard1;