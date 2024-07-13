import { Link } from 'react-router-dom';
import './SignIn.css';
import { useState } from 'react';
const SignInPage = () => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
   }

   const isFormValid = email !== '' && password !== '';
   return (
      <section className='bg-gray-100'>
         <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <Link
               to='/'
               className='flex items-center mb-6 text-2xl font-semibold text-gray-900'
            >
               <img
                  className='w-auto h-12 mr-2'
                  src='img/logo-black.png'
                  alt='logo'
               />
            </Link>
            <div className='w-full bg-white rounded-[15px] shadow md:mt-0 sm:max-w-md xl:p-0'>
               <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                  <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                     Sign In to your account
                  </h1>
                  <form className='space-y-4 md:space-y-4' action='#'>
                     <div>
                        <label
                           htmlFor='email'
                           className='inline-block mb-2 text-sm font-medium text-gray-900'
                        >
                           Your email
                        </label>
                        <input
                           type='email'
                           name='email'
                           id='email'
                           className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5'
                           placeholder='name@company.com'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           autoComplete='email'
                        />
                     </div>
                     <div className='relative'>
                        <label
                           htmlFor='password'
                           className='inline-block mb-2 text-sm font-medium text-gray-900'
                        >
                           Password
                        </label>
                        <input
                           type={isPasswordVisible ? 'text' : 'password'}
                           name='password'
                           id='password'
                           className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-600 block w-full p-2.5 input-with-icon'
                           placeholder='••••••••'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           autoComplete='current-password'
                        />
                        <span
                           className='icon-container text-gray-600'
                           onClick={togglePasswordVisibility}
                        >
                           {isPasswordVisible ? (
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={1.5}
                                 stroke='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                                 />
                              </svg>
                           ) : (
                              <svg
                                 xmlns='http://www.w3.org/2000/svg'
                                 fill='none'
                                 viewBox='0 0 24 24'
                                 strokeWidth={1.5}
                                 stroke='currentColor'
                                 className='w-5 h-5'
                              >
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                                 />
                                 <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                                 />
                              </svg>
                           )}
                        </span>
                     </div>
                     <div className='flex items-center justify-between forgotPassword'>
                        <div className='flex items-start'>
                           <div className='flex items-center h-5'>
                              <input
                                 id='remember'
                                 aria-describedby='remember'
                                 type='checkbox'
                                 className='w-4 h-4 border border-gray-400 rounded accent-primary-700'
                              />
                           </div>
                           <div className='ml-3 text-sm'>
                              <label
                                 htmlFor='remember'
                                 className='text-gray-400'
                              >
                                 Remember me
                              </label>
                           </div>
                        </div>
                        <Link
                           to='#'
                           className='text-sm font-medium hover:text-primary-600 text-gray-400 hover:underline'
                        >
                           Forgot password?
                        </Link>
                     </div>
                     <button
                        type='submit'
                        className='w-full text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:bg-primary-800 font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70'
                        disabled={!isFormValid}
                     >
                        Sign In
                     </button>
                     <p className='text-sm font-light text-gray-400 text-center'>
                        Don’t have an account yet?
                        <Link
                           to='/sign-up'
                           className='font-medium text-primary-400 hover:text-primary-600 hover:underline ml-1'
                        >
                           Sign Up
                        </Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SignInPage;
