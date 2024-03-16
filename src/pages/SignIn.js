import React,{useState} from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData,setFormData] = useState({name:"", email:"",password: "",contact:"", designation:"", organization:""});
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    const navigate = useNavigate();

    // the below handleChange function will take the value from form and store in formData
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.id] : e.target.value
        })
    }
    
    //the below function will send the formData that contans user credentials to backend and register it to DB
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true)
            const res = await axios.post(`http://localhost:8000/api/v1/user/register`, formData);
            const responseData = res.data;
            console.log(responseData);
            if(!responseData.success){
                setError(responseData.message);
                setLoading(false);
            }
            setError(null);
            setLoading(false);
            // if everything goes fine user is registered then navigate to sign-in page
            navigate("/")

        } catch (error) {
            console.log(`Error in sign up of user ${error}`);
        }
    }

  return (
    <>
        <div className='mx-auto my-10 shadow-zinc-600 shadow-md max-w-xl'>
            {error?(<p className='text-red-600'>error</p>):""}
            <div className='w-full flex flex-col items-center justify-center gap-4 p-3'>
                <h1 className='font-semibold text-lg sm:text-2xl text-orange-300'>Sign In</h1>
                <form className='w-full text-xs sm:text-lg' onSubmit={handleSubmit}>   
                    <div className='flex items-center flex-wrap gap-4 mb-2'>
                        <label  style={{width:"20%"}}>
                            Email 
                        </label>
                        <input type='email' placeholder='Enter your email' value={formData.password} onChange={handleChange} id='password'
                            className='border border-slate-700 rounded p-1 outline-none bg-transparent' style={{width:"70%"}} required/>
                    </div>
                    <div className='flex items-center flex-wrap gap-4 mb-2'>
                        <label  style={{width:"20%"}}>
                            Password 
                        </label>
                        <input type='password' placeholder='Enter your password' value={formData.email} onChange={handleChange} id='email'
                            className='border border-slate-700 rounded p-1 outline-none bg-transparent' style={{width:"70%"}} required/>
                    </div>
                    <button disabled={loading} type='submit' className='w-full bg-blue-700 p-3 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-70'>
                        {loading?"Logging":"Sign Up"}
                    </button>
                    <p className='mt-3 text-md'>New User? <Link to="/sign-up"><span className='text-blue-700'>Sign-up</span></Link></p> 
                </form>
            </div> 
                     
        </div>
    </>
  )
}

export default SignIn