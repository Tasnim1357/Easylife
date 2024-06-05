// import PropTypes from 'prop-types'
import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
    Button,
  } from '@headlessui/react'
  import { Fragment, useContext } from 'react'
  import { useForm } from 'react-hook-form'
  import Swal from 'sweetalert2';

import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Provider/AuthProvider';

  
  const Modal = ({ close, isOpen, item}) => {
  
   const {user}=useContext(AuthContext)
    
      const axiosSecure=useAxiosSecure();
  
      const { register, handleSubmit } = useForm()
      const onSubmit = async(data) =>{
        console.log(data)
        
     const requested={
        assetId:item._id,
        note:data.note,
        userName: user?.displayName,
        userEmail: user?.email,
        requestDate: new Date(),
        name:item.name,
        type: item.type,
        status1:'pending',
        approvalDate:null


     }

     try {
        const response = await axiosSecure.post('/request',requested);
        console.log('Asset added:', response.data);

        if(response.data.insertedId){
            Swal.fire({
                title: "Great!",
                text: "You successfully sent the request!",
                icon: "success"
              });
              close()
        }
      } catch (error) {
        console.error('Error adding asset:', error);
      }




      } 
      
  
  
    return (
      <Transition appear show={isOpen}>
       <Dialog
          as='div'
          className='relative z-10'
          onClose={close}
        >
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-50' />
          </TransitionChild>
  
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle
                    as='h3'
                    className='text-lg font-medium text-center leading-6 text-gray-900'
                  >
                     <p className='text-2xl font-medium'>Request for an asset</p>
                  </DialogTitle>
                  <div className='mt-2 w-full'>
                   
                  
                    <div>
            
              <div>
              <form onSubmit={handleSubmit(onSubmit)}>
        
        <label className="form-control w-full my-6 ">
    <div className="label">
      <span className="label-text">Give Your Note</span>
     
    </div>
    <input
     type="text" 
     placeholder="Notes" 
     {...register("note",{required:true})}
     className="input input-bordered w-full " />
   
  </label>
  
 
  
        <button className='btn btn-info'>Send Request </button>
      </form>
              </div>
         
         
          </div>
                  </div>
                  <hr className='mt-8 ' />
                  <div className='mt-2 '>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      onClick={close}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
    </Transition>
    )
  }
  
  // UpdateRoomModal.propTypes = {
  //   setIsEditModalOpen: PropTypes.func,
  //   isOpen: PropTypes.bool,
  // }
  
  export default Modal