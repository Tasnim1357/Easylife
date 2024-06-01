import React from 'react';

const About = () => {
    return (
        <div className='flex md:flex-row flex-col justify-between items-center gap-7 mt-24'>
            <div className='md:w-1/2 w-full bg-[#FFBD2B] md:h-screen h-[40vh] flex justify-center items-center rounded-2xl'>
        <div className='md:w-11/12 w-full'>
        <img src="https://i.ibb.co/tZs8TjK/business-people-working-laptop-488220-95249.jpg" className='w-full h-full p-5 shadow-2xl' alt="" />
        </div>
            </div>
            <div className='space-y-5 md:w-1/2 w-full'>
                <div className='space-y-3'>
                    <p className='text-[#FFBD2B] font-mono font-semibold text-2xl'>Why Choose Us</p>
                    <h1 className='sm:text-6xl text-lg font-bold'>What Makes <span className='text-[#FFBD2B] font-mono font-extrabold sm:text-7xl text-xl'>Easylife</span> Your Ideal Partner</h1>
                    <p className='text-xl text-[#939393] font-medium'>Our asset management platform simplifies tracking and managing your assets with real-time updates, comprehensive reporting, and seamless integration, ensuring efficiency and security for your organization.</p>
                </div>
                <div className='bg-[#FFBD2B] rounded-xl p-5 shadow-xl '>
                    <h1 className='sm:text-3xl text-base font-bold'>Asset Management</h1>
                    <p className='sm:text-xl text-base font-medium'>Our advanced asset managing service provides real-time visibility into your assets, ensuring you always know their location and status. This helps in reducing losses, improving utilization, and enhancing operational efficiency.</p>
                </div>
                <div className='bg-[#2A2A2A] rounded-xl p-5 shadow-xl'>
                <h1 className='sm:text-3xl text-base text-white'>Maintenance Management</h1>
                    <p className='sm:text-xl text-base font-medium text-[#C2C2C2]'>Our maintenance management service streamlines the scheduling, tracking, and execution of maintenance tasks. It ensures timely upkeep, minimizes downtime, and extends the lifespan of your assets, ultimately saving costs and improving productivity.</p>
                </div>
            </div>
        </div>
    );
};

export default About;