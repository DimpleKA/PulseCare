import React, { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import OtpInput from 'react-otp-input';
import { BaseUrl } from "./BaseUrl";

const PatientLoginForm = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [hideOtpModal, setHideOtpModal] = useState("hidden"); //initially hide otp modal

  // Patient Registration form data starts
  const [patientName, setName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientMobile, setPatientMobile] = useState(8123573669);
  const [patientPassword, setPassword] = useState("");
  const [patientConPassword, setConPassword] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientSex, setPatientSex] = useState("");
  // Patient Registration form data ends

  const [otp, setOtp] = useState('');

  const displayLogin = () => {
    setShowLogin(true);
  };

  const displayRegistration = () => {
    setShowLogin(false);
  };

  const handlePatientRegistration = async (e) => {
    e.preventDefault();

    const registrationForm = new FormData();
    registrationForm.append("name", patientName);
    registrationForm.append("email", patientEmail);
    registrationForm.append("mobile", patientMobile);
    registrationForm.append("password", patientPassword);
    registrationForm.append("confirmPassword", patientConPassword);
    registrationForm.append("age", patientAge);
    registrationForm.append("sex", patientSex);


    try {
      const response = await axios.post(
        `${BaseUrl}/api/patients/register`,
        registrationForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Handle successful registration
        setHideOtpModal(" ");  //maek the otp modal box visible
        console.log("Otp sent ");
      } else {
        // Handle registration failure
        console.error("Registration failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Otp verification axios starts below
  const verifyOtp = async (e) =>{
    // e.preventDefault();
    const verifyOtpForm = new FormData();

    verifyOtpForm.append("email",patientEmail);
    verifyOtpForm.append("otp",otp);
    console.log("verify otp executed")

    try{
      const otpResponse = axios.post(`${BaseUrl}/api/patients/register/api/patients/verify-otp`,verifyOtpForm,
        {
          headers:{
        "Content-Type":"application/json",
          },
        }
      );
      if(otpResponse.status==200){
        console.log("Otp verified registraiton done");
        setHideOtpModal("hidden");
      }else {
        // Handle registration failure
                                                //set the alert that the entered OTP does not match.
        console.error("Registration failed!");
      }

    }catch(error){
      console.error("An error occurred:", error);
    }

  }
    // Otp verification axios ends

// when the 6 digit otp entered then form autosubmit
useEffect(()=>{
  if(otp.length>4){
    verifyOtp(); 
  }
},[otp])

  return (
    <div className="Patient-login-form bg-custom-graybg">
      {/* Breadcrum starts */}
      <div className="p-8">
        <Breadcrumb aria-label="Default breadcrumb example">
          <BreadcrumbItem href="/" icon={HiHome}>
            Home
          </BreadcrumbItem>

          <BreadcrumbItem>Patient Login</BreadcrumbItem>
          {/* <BreadcrumbItem>Flowbite React</BreadcrumbItem> */}
        </Breadcrumb>
      </div>
      {/* Breadcrum ends */}

      <div className="w-full flex justify-center align-middle">
        {/* Otp verification Modal starts */}
        <div
          id="popup-modal"
          tabIndex="-1"
          className={`${hideOtpModal} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full`}
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <button type="button" onClick={()=>setHideOtpModal("hidden")} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
            </button> */}
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <p className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Please enter the OTP which was sent to your email:{" "}
                  <strong>{patientEmail}</strong>.
                </p>
                {false ? (
  <p className="mb-5 text-lg font-normal text-red-700 dark:text-red-700">
    {/* Render this if condition is true */}
   Incorrect OTP!
  </p>
) : (
  <p className="mb-5 text-lg font-normal text-green-500 dark:text-green-500">
    {/* Render this if condition is false */}
    Registraiton successful !
  </p>
)}
               
{/* react otp input starts */}
<OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span> - </span>}
      containerStyle={"justify center"}
      inputStyle={{ color: "red", border: "1px solid #ccc", padding: "10px", width: "40px", margin: "5px" }}
      renderInput={(props) => <input {...props} />}
    />
{/* react otp input ends */}

                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400"></h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Verify OTP
                </button>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Otp verification Modal ends */}

        <div className="lg:w-3/5  flex">
          {showLogin ? (
            //   login form starts
            <form className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-5 m-5 w-full ">
              <div className="mb-5">
                <div className="heading text-center font-bold text-2xl">
                  Patient <span className="text-custom-maroon">Login</span>
                </div>
                <div className="togglle flex w-full justify-center">
                  <div
                    className="login rounded-md bg-custom-maroon text-white p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayLogin}
                  >
                    Login
                  </div>
                  <div
                    className="registration  p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayRegistration}
                  >
                    Registration
                  </div>
                </div>

                <label
                  for="website-admin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    id="website-admin"
                    className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email/username"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>

              <div className="w-full flex justify-center align-middle">
                <button
                  type="submit"
                  className="text-white bg-custom-maroon hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </div>
            </form>
          ) : (
            // login form ends
            // registration form starts
            <form
              className="max-w-sm mx-auto border-2 border-custom-maroon2 bg-white rounded-lg p-10 m-3  w-full"
              onSubmit={handlePatientRegistration}
            >
              <div className="mb-5">
                <div className="heading text-center font-bold text-2xl">
                  Patient{" "}
                  <span className="text-custom-maroon">Registraiton</span>
                </div>
                <div className="togglle flex w-full justify-center">
                  <div
                    className="login p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayLogin}
                  >
                    Login
                  </div>
                  <div
                    className="registration bg-custom-maroon text-white rounded-md  p-2 border w-1/2 flex justify-center align-middle my-2"
                    onClick={displayRegistration}
                  >
                    Registration
                  </div>
                </div>

                {/* 1. email for registration starts */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    name="floating_email"
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email address
                  </label>
                </div>
                {/* 1. email for registration ends */}

                {/* 2. password for registration starts */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    value={patientPassword}
                    onChange={(e) => setPassword(e.target.value)}
                    name="floating_password"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Password
                  </label>
                </div>
                {/* 2. password for registration ends */}

                {/* 3. cpassword for registration ends */}
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="password"
                    value={patientConPassword}
                    onChange={(e) => setConPassword(e.target.value)}
                    name="repeat_password"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Confirm password
                  </label>
                </div>
                {/* 3. cpassword for registration ends */}

                {/* 4. Name for registration starts */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setName(e.target.value)}
                      name="floating_first_name"
                      id="floating_first_name"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_first_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Full Name
                    </label>
                  </div>
                  {/* 4. Name for registration ends */}

                  {/* 4. Gender for registration starts */}
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      value={patientSex}
                      onChange={(e) => setPatientSex(e.target.value)}
                      name="patientSex"
                      id="patientSex"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label
                      htmlFor="patientSex"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Gender
                    </label>
                  </div>
                  {/* 4. Gender for registration ends */}
                </div>

                {/* 5.Phone number for registration starts */}
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      value={patientMobile}
                      onChange={(e) => {
                        setPatientMobile(e.target.value);
                      }}
                      name="floating_phone"
                      id="floating_phone"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      for="floating_phone"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Phone number{" "}
                    </label>
                  </div>
                  {/* 5.Phone number for registration ends */}

                  {/* 6. Age number for registration starts */}
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value)}
                      name="patientAge"
                      id="patientAge"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      required
                    >
                      <option value="" disabled>
                        Select Age
                      </option>

                      {[...Array(115)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <label
                      htmlFor="patientAge"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Age
                    </label>
                  </div>
                  {/* 6. Age number for registration ends */}
                </div>
              </div>

              <div className="w-full flex justify-center align-middle">
                <button
                  type="button"
                  className="text-white bg-custom-maroon hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
                </button>
              </div>
            </form>
            // registration form ends
          )}

          {/*login form ends */}
        </div>
      </div>
    </div>
  );
};

export default PatientLoginForm;
