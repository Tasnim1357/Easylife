import React from 'react';

const EmployeeCard = ({emp}) => {
    const {name, image}=emp;
    return (
       <div>
         <div className="flex items-center space-y-4 flex-col justify-center">
        <div className=" bg-gray-400 overflow-hidden rounded-2xl">
         <div className=" overflow-hidden sm:w-[400px] sm:h-[400px] w-[200px] h-[200px]">
            <img src={image} 
        className="hover:scale-110 transition duration-500 h-full w-full cursor-pointer object-cover"
        />
         </div>
        <h2 className="px-4 py-3 text-center text-white"> This is {name}</h2>
        </div>
      </div>
       </div>
    );
};

export default EmployeeCard;