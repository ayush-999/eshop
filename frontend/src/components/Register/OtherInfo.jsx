import { useState } from 'react';
import { RiEyeCloseLine, RiEyeLine } from 'react-icons/ri';
import { Field, ErrorMessage } from 'formik';

const OtherInfo = () => {
   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
   const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
      useState(false);
   function togglePasswordVisibility() {
      setIsPasswordVisible((prevState) => !prevState);
   }
   function toggleConfirmPasswordVisibility() {
      setIsConfirmPasswordVisible((prevState) => !prevState);
   }

   return (
      <div className='space-y-4 md:space-y-4'>
         <div className='input-with-icon-container'>
            <label
               htmlFor='password'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Password
            </label>
            <Field
               type={isPasswordVisible ? 'text' : 'password'}
               name='password'
               id='password'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
               autoComplete='new-password'
            />
            <span
               className='icon-container text-gray-400'
               onClick={togglePasswordVisibility}
            >
               {isPasswordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
            <ErrorMessage
               name='password'
               component='div'
               className='error-message'
            />
         </div>
         <div className='input-with-icon-container'>
            <label
               htmlFor='confirm-password'
               className='inline-block mb-2 text-sm font-medium text-gray-900'
            >
               Confirm password
            </label>
            <Field
               type={isConfirmPasswordVisible ? 'text' : 'password'}
               name='confirmPassword'
               id='confirmPassword'
               className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:border-primary-200 block w-full p-2.5 input-with-icon'
               placeholder='••••••••'
            />
            <span
               className='icon-container text-gray-400'
               onClick={toggleConfirmPasswordVisibility}
            >
               {isConfirmPasswordVisible ? <RiEyeCloseLine /> : <RiEyeLine />}
            </span>
            <ErrorMessage
               name='confirmPassword'
               component='div'
               className='error-message'
            />
         </div>
      </div>
   );
};

export default OtherInfo;
