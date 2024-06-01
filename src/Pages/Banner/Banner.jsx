import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div className='mt-0 '>
        <Swiper
  // install Swiper modules
  modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
  spaceBetween={50}
  slidesPerView={1}
  navigation
  autoplay={{delay:2000}}
  pagination={{ clickable: true }}
  scrollbar={{ draggable: true }}
  onSwiper={(swiper) => console.log(swiper)}
  onSlideChange={() => console.log('slide change')}
  className='w-full'
>
  <SwiperSlide><div className='relative rounded-b-lg'>
  <img src="https://i.ibb.co/Jsx0KHY/photo-1553877522-43269d4ea984-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt=""  className='w-full h-[40vh] md:h-screen rounded-b-lg ' />
    <div className='absolute top-0 h-full w-full flex justify-center items-center'>
        <div className='bg-black/60 md:h-[60vh] sm:w-1/2  space-y-5 sm:p-5 p-1 rounded-2xl w-full'>
            <p className='text-white text-lg md:text-7xl font-bold font-poppins' style={
              {lineHeight:1.1}
            }>You can work as {' '} <span className='text-[#FFBD2B]'>
              <Typewriter
        words={['Employee', 'HR Manager']}
        loop={false}
        cursorStyle='_'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
       
      />
              </span></p>
            <p className='text-white text-xs md:text-2xl font-light font-poppins'>Efficiently manage assets with  <br /><span className='font-poppins font-semibold md:text-4xl text-lg'> our intuitive asset management system</span></p>
            <Link><button className='btn bg-[#FFBD2B] text-lg mt-6'>Join as HR Manager</button></Link>
        </div>
    </div>
    </div></SwiperSlide>
  <SwiperSlide><div className='relative'>
  <img src="https://i.ibb.co/F4X3mq2/stock-photo-multicultural-businesspeople-working-in-an-office-lobby-group-of-happy-businesspeople-sm.jpg" alt=""  className='w-full h-[40vh] md:h-screen rounded-b-lg ' />
    <div className='absolute top-0 h-full w-full flex justify-center items-center'>
        <div className='bg-black/60  md:h-[50vh] sm:w-1/2 space-y-5 sm:p-5 p-1 rounded-2xl w-full'>
        <p className='text-white text-xs md:text-6xl font-medium font-poppins'>Efficiently manage assets with  <br /><span className='font-poppins font-semibold md:text-4xl text-lg'> our intuitive asset management system {' '}
        <span className='text-[#FFBD2B]'>
              <Typewriter
        words={['Easylife', 'Easylife']}
        loop={false}
        cursorStyle='_'
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
       
      />
              </span>
        </span></p>
            <Link><button className='btn bg-[#FFBD2B] text-lg mt-6'>Join as an Employee</button></Link>
        </div>
    </div>
    </div></SwiperSlide>
  
  
 
</Swiper>
        
    </div>
    );
};

export default Banner;