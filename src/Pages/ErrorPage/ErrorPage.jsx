import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <div id="error-page" className='flex justify-center items-center h-[80vh] p-3'>
           <Helmet>
            <title>EasyLife | Errorpage</title>
          </Helmet>
    <div className='space-y-5'>
    <h1 className='text-6xl works-sans font-bold'>Oops!</h1>
      <p className='text-2xl work-sans font-medium'>Sorry, an unexpected error has occurred.</p>
      <p className='text-4xl works-sans text-red-600 font-semibold'>404 
        <i className='ml-3'>{error.statusText || error.message}</i>
      </p>
      <Link to='/' className='btn text-xl font-inter border-2 border-blue-600 hover:border-green-500'>Go To Homepage</Link>
    </div>
    </div>
    );
};

export default ErrorPage;