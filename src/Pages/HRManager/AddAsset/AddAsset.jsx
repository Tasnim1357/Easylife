import React, { useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';

const AddAsset = () => {
    const {user}=useContext(AuthContext)

    const handleAdd=(e)=>{
        e.preventDefault()
        const form =e.target;
        const name=form.name.value;
        const creator=user?.email;
        const type=form.type.value;
        const quantity=parseInt(form.quantity.value);
        const date=form.date.value;
        const status=form.status.value;
        console.log(name.title)
        const newAsset={name,creator,type,quantity,date,status}
        console.log(newAsset)

        fetch('http://localhost:5000/asset',{
            method:'POST',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify(newAsset)
        })
        .then(res=> res.json())
        .then(data =>{
            console.log(data)
            if(data.insertedId){
                Swal.fire({
                    title: "Great!",
                    text: "You added the Product!",
                    icon: "success"
                  });
            }
        })

    }
    return (
        <div className='mt-24'>
            <h2 className='text-4xl font-bold text-center my-5'>Add an Asset</h2>
            <div>
                <form className='border-2  w-full mx-auto p-7  rounded-2xl space-y-4 ' onSubmit={handleAdd}>
                <div>
               
               <label className='font-lato text-lg dark:text-white'>Product Name <br />
                   <input type="text" placeholder='Item_name' required name='name' className='p-2 mt-2 w-full dark:text-black border-b-black border-b-2 outline-none' />
                
               </label>

               </div>
               <div>
                   
                   <label className='font-lato text-lg dark:text-white'> Product Type<br />
                       {/* <input type="text" placeholder='Subcategory_Name' required name='subcategory_Name' className='p-2 mt-2 dark:text-black w-full border-b-black border-b-2 outline-none' /> */}
                       <select name="type" className='dark:text-black w-full p-2 mt-2' id="cars">
   <option value="returnable">Returnable</option>
   <option value="non-returnable">Non-returnable</option>
  
 </select>
                   </label>
                   </div>
               <div>
                    <label className='font-lato text-lg dark:text-white'>Product Quantity<br />
                      
                        <input type="text" placeholder='Quantity' name='quantity' required  className='p-2 mt-2 w-full dark:text-black border-b-black border-b-2 outline-none'  />
                    </label>
                 
                    </div>
               <div>
                    <label className='font-lato text-lg dark:text-white'>Added Date<br />
                      
                        <input type="date" placeholder='Give Date' name='date' required  className='p-2 mt-2 w-full dark:text-black border-b-black border-b-2 outline-none'  />
                    </label>
                 
                    </div>
                    <div>
                   
                   <label className='font-lato text-lg dark:text-white'> Product Status<br />
                       {/* <input type="text" placeholder='Subcategory_Name' required name='subcategory_Name' className='p-2 mt-2 dark:text-black w-full border-b-black border-b-2 outline-none' /> */}
                       <select name="status" className='dark:text-black w-full p-2 mt-2' id="cars">
   <option value="available">Available</option>
   <option value="out-of-stock">Out-of-stock</option>
  
 </select>
                   </label>
                   </div>
                   <div>
                        
                        <input type="submit" name="" id="" value="Add Asset" className="btn btn-block font-lato bg-[#FFBD2B] text-[#2D394B] duration-500 hover:text-[#AF9F7B] hover:bg-[#2D394B] mt-3" />
                        </div>
                </form>
            </div>
        </div>
    );
};

export default AddAsset;