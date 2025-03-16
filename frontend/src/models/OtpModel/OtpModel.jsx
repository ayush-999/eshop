/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"; // Ensure React is imported
import "./OtpModel.css";
import { RxCross1 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { SyncLoader } from "react-spinners";
import { server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OtpModel = ({ setOpen, phoneNumber }) => {
  const [loading, setLoading] = useState(false);
  const [otpConfig, setOtpConfig] = useState({
    otp: "",
    numInputs: 4,
    separator: "-",
    placeholder: "0000", // Ensure the placeholder length matches numInputs
    inputType: "number",
  });
  const [timer, setTimer] = useState(30);
  const [isResendVisible, setIsResendVisible] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const handleOTPChange = (otp) => {
    setOtpConfig((prevConfig) => ({ ...prevConfig, otp }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${server}/seller/verify-otp`, {
        phoneNumber: phoneNumber, // Use the phoneNumber prop
        otp: otpConfig.otp,
      });

      if (response.data.message === "OTP verified successfully") {
        toast.success("OTP verified successfully");
        setOpen(false);
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Failed to verify OTP:", error);
      toast.error("Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  const clearOtp = () => {
    setOtpConfig((prevConfig) => ({ ...prevConfig, otp: "" }));
  };

  const handleResendClick = () => {
    setTimer(30);
    setIsResendVisible(false);
  };

  return (
    <div className="otp-popup">
      <div className="otp-overlay">
        <div className="w-[30%] max-w-md md:w-[30%] lg:w-[25%] h-auto bg-white rounded-lg shadow-xs relative p-6 overflow-y-scroll">
          <RxCross1 className="otp-close" onClick={() => setOpen(false)} />
          <div className="block w-full">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center font-semibold text-xl md:text-2xl mb-4">
                Enter verification code
              </h2>
              <div className="otpInput-wrapper mb-5 mt-8 flex justify-center">
                <OtpInput
                  inputStyle="otpInput border border-primary-200 rounded-lg focus:border-primary-600 focus:outline-1"
                  numInputs={otpConfig.numInputs}
                  onChange={handleOTPChange}
                  renderSeparator={<span>{otpConfig.separator}</span>}
                  value={otpConfig.otp}
                  placeholder={otpConfig.placeholder}
                  inputType={otpConfig.inputType}
                  renderInput={(props) => <input {...props} />}
                  shouldAutoFocus
                />
              </div>

              <div className="otp-button-wrap flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex justify-center md:justify-start items-center w-full md:w-auto">
                  <p className="timer text-primary-600 font-medium hover:underline cursor-pointer text-center md:text-left">
                    {isResendVisible ? (
                      <span
                        className="font-semibold"
                        onClick={handleResendClick}
                      >
                        Resend
                      </span>
                    ) : (
                      `Resend in ${timer}s`
                    )}
                  </p>
                </div>
                <div className="flex justify-center md:justify-end items-center gap-3 w-full md:w-auto">
                  <button
                    className="border border-solid border-primary-200 text-primary-400 px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none ease-in-out duration-100 font-semibold rounded-lg cursor-pointer"
                    type="button"
                    disabled={otpConfig.otp.trim() === ""}
                    onClick={clearOtp}
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-semibold rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-70 ease-in-out duration-100 cursor-pointer"
                    disabled={otpConfig.otp.length < otpConfig.numInputs}
                  >
                    {loading ? (
                      <SyncLoader margin={1} size={8} color={"#fff"} />
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModel;
