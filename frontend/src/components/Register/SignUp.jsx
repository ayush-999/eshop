import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpInfo from './SignUpInfo';
import PersonalInfo from './PersonalInfo';
import OtherInfo from './OtherInfo';

const SignUp = () => {
   const [page, setPage] = useState(0);
   const [formData, setFormData] = useState({
      fname: '',
      email: '',
      userPic: null,
      userCountry: '',
      password: '',
      confirmPassword: '',
   });
   const FormTitles = ['step-1', 'step-2', 'step-3'];
   const navigate = useNavigate();

   const PageDisplay = () => {
      if (page === 0) {
         return <SignUpInfo formData={formData} setFormData={setFormData} />;
      } else if (page === 1) {
         return <PersonalInfo formData={formData} setFormData={setFormData} />;
      } else {
         return <OtherInfo formData={formData} setFormData={setFormData} />;
      }
   };

   const handleSubmit = () => {
      const formDataCopy = { ...formData };
      formDataCopy.userPic = formData.userPic ? formData.userPic.name : null;
      console.log(formDataCopy);
   };

   const isNextDisabled = () => {
      if (page === 0) {
         return !formData.fname || !formData.email;
      } else if (page === 1) {
         return !formData.userPic || !formData.userCountry;
      } else if (page === 2) {
         return !formData.password || !formData.confirmPassword;
      }
      return false;
   };

   const getProgressBarColor = () => {
      if (page === 0) {
         return 'bg-primary-300';
      } else if (page === 1) {
         return 'bg-yellow-300';
      } else {
         return 'bg-green-300';
      }
   };
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
                     Sign Up here
                  </h1>
                  <div className='bg-gray-50 rounded-lg shadow-sm overflow-hidden p-1'>
                     <div className='relative h-2 flex items-center justify-center'>
                        <div
                           className={`absolute top-0 bottom-0 left-0 rounded-lg ${getProgressBarColor()}`}
                           style={{
                              width:
                                 page === 0
                                    ? '33.34%'
                                    : page === 1
                                    ? '66.33%'
                                    : '100%',
                           }}
                        ></div>
                     </div>
                  </div>
                  <div className='form-container'>
                     <div className='register-body'>{PageDisplay()}</div>
                     <div className='register-footer'>
                        <div className='flex justify-end mt-5'>
                           <button
                              className='text-white bg-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center mr-2'
                              onClick={() => {
                                 if (page === 0) {
                                    navigate('/sign-in');
                                 } else {
                                    setPage((currPage) => currPage - 1);
                                 }
                              }}
                           >
                              {page === 0 ? 'Go to Login' : 'Back'}
                           </button>
                           <button
                              className='text-white bg-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center  disabled:opacity-70'
                              disabled={isNextDisabled()}
                              onClick={() => {
                                 if (page == FormTitles.length - 1) {
                                    handleSubmit();
                                 } else {
                                    setPage((currPage) => currPage + 1);
                                 }
                              }}
                           >
                              {page === FormTitles.length - 1
                                 ? 'Submit'
                                 : 'Next'}
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default SignUp;
