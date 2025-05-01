import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../../../server';

const PendingVerification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await axios.get(`${server}/seller/getSeller`, {
          withCredentials: true,
        });
        
        if (res.data.seller.status === 'active') {
          navigate('/seller/dashboard');
        }
      } catch (err) {
        navigate('/seller-login');
      }
    };
    
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="text-center p-8">
      <h1 className="text-2xl font-bold mb-4">
        We have received your request
      </h1>
      <p className="text-lg">
        We will verify your details soon and activate your account.
      </p>
    </div>
  );
};

export default PendingVerification;