import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../public/download.svg'
import useRole from '../../../Hooks/useRole';
import { AuthContext } from '../../Provider/AuthProvider';
import usePackage from '../../../Hooks/usePackage';
// import { AuthContext } from '../../Provider/AuthProvider';
// import { ThemeContext } from '../../Root/Root';
// import { MdOutlineWbSunny } from "react-icons/md";
// import { FaMoon } from "react-icons/fa";


const Navbar = () => {
  const {user,logOut}=useContext(AuthContext)
  const [, img] = usePackage();
  
 
//   const{handleTheme,theme}=useContext(ThemeContext)

const [role]=useRole()
// console.log(role)
//   const handleThemeToggle = () => {
//     handleTheme(theme === 'dark' ? 'light' : 'dark');
//   };
    const Navlinks1=<>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/'>Home</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/joinemployee'>Join as Employee</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/joinhr'>Join as HR Manager</Link></li>
    </>
    const Navlinks2=<>
      <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/'>Home</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/myrequest'> My Requested Assets </Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/req'>Request for an Asset  </Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-lg dark:text-white'><Link to='/myteam'>My Team</Link></li>

    </>
    const Navlinks3=<>
      <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/'>Home</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/assets'> Asset List</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/addasset'>Add an Asset</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/allreq'>All Requests</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/myemp'>My Employee List</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/arts'>Custom Request List</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/addemp'> Add an Employee</Link></li>
       <li className=' text-white  duration-500 hover:text-[#ECA300] font-medium text-base dark:text-white'><Link to='/arts'>Profile</Link></li>

    </>

const renderNavLinks = (role) => {
  if (role === 'employee') {
      return Navlinks2;
  } else if (role === 'HR') {
      return Navlinks3;
  } else {
      return Navlinks1;
  }
};



    const userSignOut=()=>{
      logOut()
      .then()
      .catch()
    }

  

    return (
        <div className="navbar bg-[#2A2A2A]   dark:bg-black">
        <div className="navbar-start z-50 w-[50%]">
          <div className="dropdown ">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm bg-[#2A2A2A] dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52">
           
        {Navlinks1}
        {/* <li>
         
        <label className="cursor-pointer grid place-items-center w-12">
  <input type="checkbox"  checked={theme === 'dark'} // Checked state based on the current theme
        onChange={handleThemeToggle} value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
 
  <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" ></path></svg>
  <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
</label>
          </li> */}
        <li className='mb-5'>
        {
            user && <div className="tooltip p-0 ml-2" data-tip={user.displayName}>
             <img src={user.photoURL} alt="" className='w-[60px] h-[60px] rounded-full border-2 p-1  border-yellow-600'/>
          </div>
            
          }

          

        </li>
        <li>
        {
          user ?  
          <Link to='/login' className="btn font-lato bg-[#ECA300] text-[#2D394B] duration-500 hover:text-[#ECA300] hover:bg-[#2D394B] font-base text-lg" onClick={userSignOut}>Logout</Link>
        : 
          <Link to='/login' className="btn font-lato bg-[#ECA300] text-[#2D394B] duration-500 hover:text-[#ECA300] hover:bg-[#2D394B] font-base text-lg">Login</Link>
      
        }
           </li>
         
            </ul>
          </div>
          {
            role==='HR'? <img src={img} className='w-20 h-20'></img>:<img src={logo} alt="" />
          }
         
        </div>
        <div className="navbar-center hidden lg:flex w-[64%]">
          <ul className="menu menu-horizontal px-1 dark:text-white">
          {/* {
            role==='employee'? Navlinks2: Navlinks1
          }
          {
            role==='HR'? Navlinks3: Navlinks1
          }
          */}
          {
            renderNavLinks(role)
          }
          
          </ul>
        </div>
        <div className="navbar-end hidden lg:flex space-x-4">
        {
              user && <div className="dropdown dropdown-hover mr-4  dark:text-white">
            <img src={user.photoURL} alt="" className='w-[60px] bg-white h-[60px] rounded-full border-2 p-1 border-yellow-600'/>
              <ul tabIndex={0} className="dropdown-content z-[10] menu p-2 dark:bg-black shadow bg-base-100 rounded-box w-52">
                <li><a>{user.displayName}</a></li>
               
              
              </ul>
            </div>
              
            }
      
         

      {
          user?  
          <Link  className='btn font-lato bg-[#ECA300] text-white duration-500 hover:text-[#AF9F7B] hover:bg-[#2D394B] font-base text-xl'><button onClick={userSignOut}>LogOut</button></Link>
        : 
        <Link to='/login' className='btn font-lato bg-[#ECA300] text-[#2D394B] duration-500 hover:text-[#AF9F7B] hover:bg-[#2D394B] font-base text-xl '>Login</Link>
      
        }
       
     
         </div> 
         
       
      </div>
    );
};

export default Navbar;