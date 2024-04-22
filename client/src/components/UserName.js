import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import avatar from '../assets/avatar.png';
import logo from '../assets/logo.png';
import styles from '../styles/Username.module.css';
import toast, {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { usernameValidate } from '../helper/validate.js';
import { useAuthStore } from '../store/store.js';

function UserName() {

    const navigate = useNavigate();
    const setUsername = useAuthStore(state=> state.setUsername);
    const formik = useFormik({
        initialValues: {
            username: ''
        },
        validate: usernameValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            try {
                setUsername(values.username);
                navigate('/password');
            } catch (error) {
                toast.error('Cannot login!');
            }
            
        }
    })

    return (
        /*<div className='container mx-auto'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
            <div className='flex justify-center items-center h-screen'>
                <div className={styles.glass } style={{ width: "45%",height: "80%"}}>
                    <div className='title flex flex-col items-center'>
                        <h4 className='text-5xl font-bold'>Hello Again!</h4>
                        <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
                        Step into Cuhhub, where CUH community thrives!
                        </span>
                    </div>

                    <form className='py-1' onSubmit={formik.handleSubmit}>
                        <div className='profile flex justify-center py-4'>
                            <img src={avatar} className={styles.profile_img} alt='avatar' />
                        </div>
                        <div className='textbox flex flex-col items-center gap-4'>
                            <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='Username' />
                            <button type='submit' className={styles.btn}>Let's Go</button>
                        </div>
                        <div className='text-center py-4'>
                            <span className='text-gray-500'>Not a member? 
                                <Link className='text-red-500' to='/register'>Register Now</Link>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div> */
        <div className='container mx-auto'>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "45%", height: "80%", borderRadius: "20px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <div className='title flex flex-col items-center'>
                <h4 className='text-5xl font-bold text-gray-800'>Hello Again!</h4>
                <span className='py-4 text-xl w-2/3 text-center text-gray-600'>
                    Step into Cuhhub, where CUH community thrives!
                </span>
            </div>

            <form className='py-1' onSubmit={formik.handleSubmit}>
                <div className='profile flex justify-center py-4'>
                    <img src={logo} className={styles.profile_img} alt='logo' style={{ width: "100px", height: "100px", borderRadius: "50%" }} />
                </div>
                <div className='textbox flex flex-col items-center gap-4'>
                    <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='Username' style={{ padding: "10px", border: "2px solid #ddd", borderRadius: "8px", width: "80%", fontSize: "16px" }} />
                    <button type='submit' className={styles.btn} style={{ 
                        background: "linear-gradient(135deg, #64B5F6, #1976D2)",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                        transition: "background-color 0.3s, box-shadow 0.3s",
                        border: "none",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                    }}>
                        Let's Go
                    </button>
                </div>
                <div className='text-center py-4'>
                    <span className='text-gray-600'>Not a member? 
                        <Link className='text-red-500' to='/register'>Register Now</Link>
                    </span>
                </div>
            </form>
        </div>
    </div>
</div>

    );
}

export default UserName;