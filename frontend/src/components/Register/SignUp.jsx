import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncLoader } from 'react-spinners';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import SignUpInfo from './SignUpInfo';
import PersonalInfo from './PersonalInfo';
import OtherInfo from './OtherInfo';
import { server } from '../../server';

const SignUp = () => {
   const [page, setPage] = useState(0);
   const [loading, setLoading] = useState(false);
   const FormTitles = ['step-1', 'step-2', 'step-3'];
   const navigate = useNavigate();

   const initialValues = {
      fname: '',
      email: '',
      userPic: null,
      userCountry: '',
      password: '',
      confirmPassword: '',
   };

   const validationSchema = [
      Yup.object().shape({
         fname: Yup.string().required('Full name is required'),
         email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
      }),
      Yup.object().shape({
         userCountry: Yup.string().required('Country is required'),
      }),
      Yup.object().shape({
         password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
         confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm password is required'),
      }),
   ];

   const handleSubmit = async (values) => {
      setLoading(true);
      const newForm = new FormData();
      newForm.append('name', values.fname);
      newForm.append('email', values.email);
      if (values.userPic) {
         newForm.append('file', values.userPic);
      }
      newForm.append('addresses[country]', values.userCountry);
      newForm.append('password', values.password);
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };

      axios
         .post(`${server}/user/create-user`, newForm, config)
         .then((res) => {
            toast.success(res.data.message);
         })
         .catch((err) => {
            if (
               err.response &&
               err.response.data &&
               err.response.data.message
            ) {
               toast.error(err.response.data.message);
            } else {
               toast.error('An error occurred. Please try again.');
            }
         })
         .finally(() => {
            setLoading(false);
         });
   };

   const isNextDisabled = (errors, touched) => {
      if (page === 0) {
         return (
            !touched.fname || !touched.email || errors.fname || errors.email
         );
      } else if (page === 1) {
         return !touched.userCountry || errors.userCountry;
      } else if (page === 2) {
         return errors.password || errors.confirmPassword;
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
                  <Formik
                     initialValues={initialValues}
                     validationSchema={validationSchema[page]}
                     onSubmit={(values) => {
                        if (page === FormTitles.length - 1) {
                           handleSubmit(values);
                        } else {
                           setPage(page + 1);
                        }
                     }}
                  >
                     {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                           {page === 0 && (
                              <SignUpInfo
                                 formData={values}
                                 setFormData={setFieldValue}
                              />
                           )}
                           {page === 1 && (
                              <PersonalInfo
                                 formData={values}
                                 setFormData={setFieldValue}
                              />
                           )}
                           {page === 2 && (
                              <OtherInfo
                                 formData={values}
                                 setFormData={setFieldValue}
                              />
                           )}
                           <div className='flex justify-end mt-5'>
                              <button
                                 type='button'
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
                                 type='submit'
                                 className='text-white bg-primary-700 hover:bg-primary-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-3 text-center disabled:opacity-70'
                                 disabled={
                                    isNextDisabled(errors, touched) || loading
                                 }
                              >
                                 {loading ? (
                                    <SyncLoader
                                       margin={1}
                                       size={8}
                                       color={'#fff'}
                                    />
                                 ) : page === FormTitles.length - 1 ? (
                                    'Submit'
                                 ) : (
                                    'Next'
                                 )}
                              </button>
                           </div>
                        </Form>
                     )}
                  </Formik>
               </div>
            </div>
         </div>
         <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
            toastStyle={{
               margin: 'auto',
               marginTop: '10px',
               borderRadius: '10px',
            }}
         />
      </section>
   );
};

export default SignUp;
