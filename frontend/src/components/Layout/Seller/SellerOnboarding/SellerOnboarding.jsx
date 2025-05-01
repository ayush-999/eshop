import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { SyncLoader } from 'react-spinners';
import { server } from '../../../../server';

const steps = [
  { id: 'seller-details', title: 'Seller Details' },
  { id: 'tax-details', title: 'Tax Details' },
  { id: 'pickup-address', title: 'Pickup Address' },
  { id: 'bank-details', title: 'Bank Details' },
];

const SellerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [sellerData, setSellerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const res = await axios.get(`${server}/seller/getSeller`, {
          withCredentials: true,
        });
        setSellerData(res.data.seller);
        
        // Determine which step to show based on completed data
        if (!res.data.seller.shopName) {
          setCurrentStep(0);
        } else if (!res.data.seller.gstNumber) {
          setCurrentStep(1);
        } else if (!res.data.seller.addresses?.length) {
          setCurrentStep(2);
        } else if (!res.data.seller.bankDetails?.length) {
          setCurrentStep(3);
        } else {
          // All steps completed but not verified yet
          navigate('/seller/pending-verification');
        }
      } catch (err) {
        toast.error('Failed to fetch seller data');
        navigate('/seller-login');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSellerData();
  }, [navigate]);

  const handleNext = async (values, { setSubmitting }) => {
    try {
      // Save step data to backend
      await axios.put(`${server}/seller/update`, values, {
        withCredentials: true,
      });
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // All steps completed
        navigate('/seller/pending-verification');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save data');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <SyncLoader color="#2563eb" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`rounded-full w-8 h-8 flex items-center justify-center ${
                index <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`ml-2 ${
                index <= currentStep ? 'font-semibold text-blue-600' : 'text-gray-500'
              }`}
            >
              {step.title}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {currentStep === 0 && (
          <SellerDetailsStep 
            sellerData={sellerData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {currentStep === 1 && (
          <TaxDetailsStep 
            sellerData={sellerData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {currentStep === 2 && (
          <PickupAddressStep 
            sellerData={sellerData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {currentStep === 3 && (
          <BankDetailsStep 
            sellerData={sellerData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
      </div>
    </div>
  );
};

// Step 1: Seller Details
const SellerDetailsStep = ({ sellerData, onNext, onBack }) => {
  const initialValues = {
    shopName: sellerData?.shopName || '',
    sellerName: sellerData?.sellerName || '',
    phoneNumber: sellerData?.phoneNumber || '',
    gender: sellerData?.gender || '',
    establishmentDate: sellerData?.establishmentDate || '',
    sellerLogo: sellerData?.sellerLogo || '',
  };

  const validationSchema = Yup.object().shape({
    shopName: Yup.string().required('Shop name is required'),
    sellerName: Yup.string().required('Seller name is required'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    gender: Yup.string()
      .oneOf(['male', 'female', 'other'], 'Invalid gender')
      .required('Gender is required'),
    establishmentDate: Yup.date()
      .max(new Date(), 'Establishment date cannot be in the future')
      .required('Establishment date is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onNext}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <h2 className="text-xl font-semibold mb-6">Seller Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop Name *
              </label>
              <Field
                name="shopName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your shop name"
              />
              <ErrorMessage
                name="shopName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <Field
                name="sellerName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              <ErrorMessage
                name="sellerName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <Field
                name="phoneNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 10-digit phone number"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender *
              </label>
              <Field
                as="select"
                name="gender"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Establishment Date *
              </label>
              <Field
                name="establishmentDate"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="establishmentDate"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop Logo
              </label>
              <input
                type="file"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("sellerLogo", file);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? <SyncLoader size={8} color="#fff" /> : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Step 2: Tax Details
const TaxDetailsStep = ({ sellerData, onNext, onBack }) => {
  const initialValues = {
    gstNumber: sellerData?.gstNumber || '',
    panNumber: sellerData?.panNumber || '',
    aadharNumber: sellerData?.aadharNumber || '',
    sellerActLicense: sellerData?.sellerActLicense || '',
    tradeLicense: sellerData?.tradeLicense || '',
    fssaiLicense: sellerData?.fssaiLicense || '',
    otherLicense: sellerData?.otherLicense || '',
  };

  const validationSchema = Yup.object().shape({
    gstNumber: Yup.string()
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST number')
      .required('GST number is required'),
    panNumber: Yup.string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
      .required('PAN number is required'),
    aadharNumber: Yup.string()
      .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
      .required('Aadhar number is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onNext}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-semibold mb-6">Tax & Legal Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST Number *
              </label>
              <Field
                name="gstNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="22ABCDE1234F1Z5"
              />
              <ErrorMessage
                name="gstNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PAN Number *
              </label>
              <Field
                name="panNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ABCDE1234F"
              />
              <ErrorMessage
                name="panNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhar Number *
              </label>
              <Field
                name="aadharNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="123412341234"
              />
              <ErrorMessage
                name="aadharNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Act License
              </label>
              <Field
                name="sellerActLicense"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter license number if applicable"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trade License
              </label>
              <Field
                name="tradeLicense"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter trade license number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                FSSAI License
              </label>
              <Field
                name="fssaiLicense"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter FSSAI license number"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Other License (if any)
              </label>
              <Field
                name="otherLicense"
                as="textarea"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter any other license details"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? <SyncLoader size={8} color="#fff" /> : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Step 3: Pickup Address
const PickupAddressStep = ({ sellerData, onNext, onBack }) => {
  const initialValues = {
    addressType: 'pickup',
    sellerName: sellerData?.addresses?.[0]?.sellerName || sellerData?.sellerName || '',
    sellerPhone: sellerData?.addresses?.[0]?.sellerPhone || sellerData?.phoneNumber || '',
    country: sellerData?.addresses?.[0]?.country || 'India',
    state: sellerData?.addresses?.[0]?.state || '',
    city: sellerData?.addresses?.[0]?.city || '',
    pincode: sellerData?.addresses?.[0]?.pincode || '',
    landmark: sellerData?.addresses?.[0]?.landmark || '',
    sellerAddress: sellerData?.addresses?.[0]?.sellerAddress || '',
    sellerAlternatePhone: sellerData?.addresses?.[0]?.sellerAlternatePhone || '',
    isDefault: sellerData?.addresses?.[0]?.isDefault || 1,
  };

  const validationSchema = Yup.object().shape({
    sellerName: Yup.string().required('Name is required'),
    sellerPhone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    sellerAddress: Yup.string().required('Address is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        // Convert address to array format expected by backend
        const addressData = {
          addresses: [values]
        };
        onNext(addressData, actions);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-semibold mb-6">Pickup Address</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Person Name *
              </label>
              <Field
                name="sellerName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter contact person name"
              />
              <ErrorMessage
                name="sellerName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone Number *
              </label>
              <Field
                name="sellerPhone"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 10-digit phone number"
              />
              <ErrorMessage
                name="sellerPhone"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternate Phone Number
              </label>
              <Field
                name="sellerAlternatePhone"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter alternate phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <Field
                name="country"
                as="select"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="India">India</option>
                <option value="Other">Other</option>
              </Field>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <Field
                name="state"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter state"
              />
              <ErrorMessage
                name="state"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <Field
                name="city"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter city"
              />
              <ErrorMessage
                name="city"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode *
              </label>
              <Field
                name="pincode"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter 6-digit pincode"
              />
              <ErrorMessage
                name="pincode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label>
              <Field
                name="landmark"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter nearby landmark"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Address *
              </label>
              <Field
                name="sellerAddress"
                as="textarea"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter complete address with street, building, etc."
              />
              <ErrorMessage
                name="sellerAddress"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                name="isDefault"
                value={1}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700">
                Set as default pickup address
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? <SyncLoader size={8} color="#fff" /> : 'Next'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Step 4: Bank Details
const BankDetailsStep = ({ sellerData, onNext, onBack }) => {
  const initialValues = {
    bankName: sellerData?.bankDetails?.[0]?.bankName || '',
    accountNumber: sellerData?.bankDetails?.[0]?.accountNumber || '',
    ifscCode: sellerData?.bankDetails?.[0]?.ifscCode || '',
    branchName: sellerData?.bankDetails?.[0]?.branchName || '',
    accountType: sellerData?.bankDetails?.[0]?.accountType || 'savings',
  };

  const validationSchema = Yup.object().shape({
    bankName: Yup.string().required('Bank name is required'),
    accountNumber: Yup.string()
      .matches(/^[0-9]{9,18}$/, 'Account number must be 9-18 digits')
      .required('Account number is required'),
    ifscCode: Yup.string()
      .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
      .required('IFSC code is required'),
    branchName: Yup.string().required('Branch name is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        // Convert bank details to array format expected by backend
        const bankData = {
          bankDetails: [values]
        };
        onNext(bankData, actions);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <h2 className="text-xl font-semibold mb-6">Bank Account Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name *
              </label>
              <Field
                name="bankName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter bank name"
              />
              <ErrorMessage
                name="bankName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Number *
              </label>
              <Field
                name="accountNumber"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter account number"
              />
              <ErrorMessage
                name="accountNumber"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                IFSC Code *
              </label>
              <Field
                name="ifscCode"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter IFSC code"
              />
              <ErrorMessage
                name="ifscCode"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name *
              </label>
              <Field
                name="branchName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter branch name"
              />
              <ErrorMessage
                name="branchName"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Account Type *
              </label>
              <Field
                as="select"
                name="accountType"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </Field>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-md">
            <h3 className="text-sm font-medium text-yellow-800">Important Note</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Please ensure your bank account details are correct. Payments will be 
              processed to this account. You won't be able to change these details 
              for 7 days after submission.
            </p>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70"
            >
              {isSubmitting ? <SyncLoader size={8} color="#fff" /> : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SellerOnboarding;