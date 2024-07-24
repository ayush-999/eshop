import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { server } from "../server";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // useEffect(() => {
  //   if (activation_token) {
  //     const sendRequest = async () => {
  //       await axios
  //         .post(`${server}/user/activation`, {
  //           activation_token,
  //         })
  //         .then((res) => {
  //           console.log(res);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           setError(true);
  //         });
  //     };
  //     sendRequest();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (activation_token) {
  //     const sendRequest = async () => {
  //       try {
  //         const res = await axios.post(`${server}/user/activation`, {
  //           activation_token,
  //         });
  //         setMessage(res.data.message);
  //       } catch (error) {
  //         if (error.response && error.response.data.message) {
  //           setMessage(error.response.data.message);
  //         } else {
  //           setMessage("An error occurred");
  //         }
  //         setError(true);
  //       }
  //     };
  //     sendRequest();
  //   }
  // }, [activation_token]);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, { activation_token })
          .then((res) => {
            setMessage(res.data.message);
            setError(false);
          })
          .catch((error) => {
            console.log(error);
            setError(true);
            setMessage(error.response.data.message);
          });
      };
      sendRequest();
    }
  }, [activation_token]);

  return (
    <section className="bg-gray-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-auto h-12 mr-2"
            src="/img/logo-black.png"
            alt="logo"
          />
        </Link>
        <div className="w-full bg-white rounded-[15px] shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6">
            {error ? (
              <>
                <div className="text-5xl text-center flex justify-center">
                  <IoIosCloseCircle className="text-error-700" />
                </div>
                <div className="text-center">
                  <p className="mt-3">{message || "Your token is expired!"}</p>
                </div>
              </>
            ) : (
              <>
                <div className="text-5xl text-center flex justify-center">
                  <FaCheckCircle className="text-green-600" />
                </div>
                <div className="text-center">
                  <p className="mt-3">
                    {message || "Your account has been created successfully"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivationPage;
