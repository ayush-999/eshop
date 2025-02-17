/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"; // Ensure React is imported
import "./OtpModel.css";
import { RxCross1 } from "react-icons/rx";
import OtpInput from "react-otp-input";
import { SyncLoader } from "react-spinners";

const OtpModel = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);
  const [{ otp, numInputs, separator, placeholder, inputType }, setConfig] = useState({
    otp: "",
    numInputs: 4,
    separator: "-",
    minLength: 0,
    maxLength: 40,
    placeholder: "0",
    inputType: "number",
  });

  const [timer, setTimer] = useState(30); // State to track the timer
  const [isResendVisible, setIsResendVisible] = useState(false); // State to control Resend text visibility

  // Start the timer when the component mounts
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1); // Decrease timer every second
      }, 1000);
      return () => clearInterval(interval); // Cleanup interval on unmount
    } else {
      setIsResendVisible(true); // Show "Resend" after timer reaches 0
    }
  }, [timer]);

  const handleOTPChange = (otp) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
  };

  const handleSubmit = async (values) => {
    // setLoading(true);
    alert("hi");
  };

  const clearOtp = () => {
    setConfig((prevConfig) => ({ ...prevConfig, otp: "" }));
  };

  const handleResendClick = () => {
    // Reset timer and Resend visibility
    setTimer(30);
    setIsResendVisible(false);
  };

  return (
    <div className="otp-popup">
      <div className="otp-overlay">
        <div className="w-[25%] h-[30vh] bg-white rounded-[.9375rem] shadow-sm relative p-6 overflow-y-scroll">
          <RxCross1 className="otp-close" onClick={() => setOpen(false)} />
          <div className="block w-full">
            <form onSubmit={handleSubmit}>
              <h2 className="text-center font-semibold text-xl mb-4">
                Enter verification code
              </h2>
              <div className="otpInput-wrapper mb-5 mt-8 flex justify-center">
                <OtpInput
                  inputStyle="otpInput border border-primary-200 rounded-lg focus:border-primary-600 focus:outline-1"
                  numInputs={numInputs}
                  onChange={handleOTPChange}
                  renderSeparator={<span>{separator}</span>}
                  value={otp}
                  placeholder={placeholder}
                  inputType={inputType}
                  renderInput={(props) => <input {...props} />}
                  shouldAutoFocus
                />
              </div>

              <div className="otp-button-wrap flex justify-between items-center">
                <div className="flex justify-end items-center ">
                  <p className="timer text-primary-600 font-medium hover:underline cursor-pointer">
                    {isResendVisible ? (
                      <span className="font-semibold" onClick={handleResendClick}>Resend</span>
                    ) : (
                      `Resend in ${timer}s`
                    )}
                  </p>
                </div>
                <div className="flex justify-end items-center gap-3">
                  <button
                    className="border border-solid border-primary-200 text-primary-400 px-6 py-2 bg-transparent hover:bg-primary-600 hover:text-white outline-none focus:outline-none ease-in-out duration-100 font-semibold rounded-lg cursor-pointer"
                    type="button"
                    disabled={otp.trim() === ""}
                    onClick={clearOtp}
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-semibold rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-70 ease-in-out duration-100 cursor-pointer"
                    disabled={otp.length < numInputs}
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
