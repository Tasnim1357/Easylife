import React from 'react';

const Packages = () => {
    return (
        <div className='mt-24 space-y-8'>
            <h2 className='font-bold text-5xl  border-b-yellow-500 pb-6 border-b-4 w-1/2'>Explore Our Packages</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>


            <div className="card  bg-base-100 shadow-xl image-full">
  <figure><img src="https://i.ibb.co/27cmq2p/photo-1580894732444-8ecded7900cd-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title font-semibold text-white text-2xl text-center">Package 01</h2>
    <p className='text-4xl font-mono text-[#FFBD2B] font-bold'> 5 Members for $5</p>
    <div className="card-actions justify-end">
      <button className="btn  btn-outline bg-white">Buy Now</button>
    </div>
  </div>
</div>
            <div className="card  bg-base-100 shadow-xl image-full">
  <figure><img src="https://i.ibb.co/ZMSR95b/photo-1600880292203-757bb62b4baf-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title font-semibold text-white text-2xl text-center">Package 02</h2>
    <p className='text-4xl font-mono text-[#FFBD2B] font-bold'> 10 Members for $8</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline bg-white">Buy Now</button>
    </div>
  </div>
</div>
            <div className="card  bg-base-100 shadow-xl image-full">
  <figure><img src="https://i.ibb.co/pJFW1Dy/photo-1542744173-8e7e53415bb0-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title font-semibold text-white text-2xl text-center">Package 03</h2>
    <p className='text-4xl font-mono text-[#FFBD2B] font-bold'> 20 Members for $15</p>
    <div className="card-actions justify-end">
      <button className="btn btn-outline bg-white">Buy Now</button>
    </div>
  </div>
</div>
            </div>
            
        </div>
    );
};

export default Packages;