import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async(data) => {
        const userInfo = {
            Email: data.Email,
            Password: data.Password,
        };

        try {
            const res = await axios.post("http://localhost:8000/login", userInfo);
            const { token, user } = res.data;

            if (res.data) {
                toast.success("Login successful");
                
                // Store token and user info
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));

                // Close modal
                document.getElementById("my_modal_3").close();
                
                // Redirect user
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            }
        } catch (err) {
            if (err.response) {
                console.error(err);
                toast.error("Error: " + err.response.data.message);
            }
        }
    };

    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box dark:text-black">
                    <form onSubmit={handleSubmit(onSubmit)} method="dialog">
                        <Link to='/' className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("my_modal_3").close()}>✕</Link>
                        <h3 className="font-bold text-lg">Login</h3>
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input 
                                type="email" 
                                placeholder='Enter your email' 
                                className='w-80 px-3 py-1 border rounded-md outline-none' 
                                {...register("Email", { required: true })} 
                            />
                            <br />
                            {errors.Email && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input 
                                type="password" 
                                placeholder='Enter your password' 
                                className='w-80 px-3 py-1 border rounded-md outline-none' 
                                {...register("Password", { required: true })} 
                            />
                            <br />
                            {errors.Password && <span className='text-sm text-red-500'>This field is required</span>}
                        </div>
                        <div className='flex justify-between mt-4'>
                            <button 
                                type='submit' 
                                className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'
                            >
                                Login
                            </button>
                            <p>Not registered? <Link to='/signup' className='underline text-blue-500 cursor-pointer'>Signup</Link></p>
                        </div>
                    </form>
                </div>
            </dialog>
        </div>
    );
}

export default Login;
