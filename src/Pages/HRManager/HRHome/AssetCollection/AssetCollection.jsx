import React from 'react';

const AssetCollection = () => {
    return (
        <div className='mt-24 space-y-8'>
             <h1 className='sm:text-5xl text-2xl font-bold  my-5 border-b-yellow-500 pb-6 border-b-4 sm:w-1/2 w-3/4'>Different Assets </h1>
             <p className='sm:text-4xl text-2xl font-semibold text-center'>Assets for Employees</p>
             <div className='mt-10 grid grid-cols-1 md:grid-cols-4 gap-6'>


             <div className="card  bg-base-100 shadow-xl rounded-2xl overflow-hidden">
  <figure><img src="https://i.ibb.co/Y7tRk8R/photo-1618424181497-157f25b6ddd5-q-80-w-1000-auto-format-fit-crop-ixlib-rb-4-0.jpg"  alt="Shoes" className='h-[300px] w-full duration-500 hover:scale-125 object-cover cursor-pointer' /></figure>
  

  <div className="card-body p-3">
    <h2 className="card-title text-2xl font-semibold">Laptop</h2>
    <p className='font-medium'>Laptops are crucial assets in asset management, enhancing mobility, productivity, and connectivity for employees.</p>
   
  </div>
</div>





             <div className="card  bg-base-100 shadow-xl rounded-2xl">
  <figure><img src="https://i.ibb.co/s6mtq7B/360-F-343148725-LLIgr5-Sp1-Xfv-G5xwm-V8w6h-Rk-Pyb-KOqva.jpg" alt="Shoes" className='h-[300px] w-full duration-500 hover:scale-125 object-cover cursor-pointer' /></figure>
  

  <div className="card-body p-3">
    <h2 className="card-title text-2xl font-semibold">Desk</h2>
    <p className='font-medium'>Desks are essential assets in asset management, providing organized, functional workspaces that boost productivity.</p>
   
  </div>
</div>

             <div className="card  bg-base-100 shadow-xl rounded-2xl">
  <figure><img src="https://cdn.pixabay.com/photo/2018/04/07/08/28/notepad-3297994_640.jpg" alt="Shoes" className='h-[300px] w-full duration-500 hover:scale-125 object-cover cursor-pointer' /></figure>
  

  <div className="card-body p-3">
    <h2 className="card-title text-2xl font-semibold">Paper</h2>
    <p className='font-medium'>Paper is a vital asset in asset management, supporting documentation, communication, and record-keeping processes efficiently.</p>
   
  </div>
</div>



             <div className="card  bg-base-100 shadow-xl rounded-2xl">
  <figure><img src="https://i.ibb.co/4Nw3Nt6/depositphotos-319375484-stock-photo-wireless-computer-mouse-on-black.webp" alt="Shoes" className='h-[300px] w-full duration-500 hover:scale-125 object-cover cursor-pointer' /></figure>
  

  <div className="card-body p-3">
    <h2 className="card-title text-2xl font-semibold">Mouse</h2>
    <p className='font-medium'>A mouse is an essential asset in asset management, enhancing user interaction and productivity with computers.</p>
   
  </div>
</div>





             </div>
        </div>
    );
};

export default AssetCollection;