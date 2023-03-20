import React, { useRef, useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const captchaRef = useRef(null);
  const [otp, setOtp] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const [resend,setResend] = useState(false);

  //asking to send otp to mail or resend
  const sendOtpToMail = async (req, res) => {
    // if(!resend) return alert('Wait for some time') 
    const { status } = await axios.get(
      `http://localhost:1337/api/auth/otp/${id}`
    );
    console.log(status);
    if(status == 201){
      alert('email sent succesfully')
      setResend(!resend);
    }
    else{
      alert('something went wrong')
    }
  };

  //Verifying ReCaptcha token generated
  const verifyCaptcha = async (val) => {
    const { data, status } = await axios.post(
      "http://localhost:1337/api/auth/verifycapctha",
      { token: val }
    );
    if (status === 200) setCaptcha(true);
    else alert("Please verify as a human");
  };

  //verifying mail through the otp
  const verifyEmail = async (e) => {
    try {
      e.preventDefault();
      if (!captcha) return alert("Please verify as a human");
      if (otp === "") return alert("Please enter the otp");

      const { data, status } = await axios.post(
        "http://localhost:1337/api/auth/verifyemail",
        { id, otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        alert("Email verified successfully");
        navigate("../login");
      } else alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  let count = 0;


 
 
  
  return (
    <div className="bg-purple-900 w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-start p-10 rounded-sm -mt-40 space-y-3 bg-purple-500 flex-wrap">
        <h1 className="text-white text-center w-full text-3xl underline">
          Verify Email
        </h1>
        <div className="px-1 text-white">
          <p className="text-md">
            An Otp has been sent to the registered ****** email and it will be
            valid for 5 minutes
          </p>
        </div>
        <form onSubmit={verifyEmail} className="w-full space-y-3 px-1">
          <input
            type="text"
            className="h-10 rounded-md outline-none focus:outline-blue-500 px-5 w-full "
            placeholder="******"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
          />
          <ReCAPTCHA
            sitekey="6LfwxAUlAAAAAK87qIXvF9f8NqzBScJ4o_jksyC7"
            ref={captchaRef}
            onChange={verifyCaptcha}
            size="normal"
          />

          <button type="submit" className="bg-slate-100 w-28 py-1 rounded-sm">
            Verify
          </button>
        </form>
        <div>
          <p className="text-white">
            Didn't recieve the oto{" "}
            <button onClick={sendOtpToMail} className="underline text-blue-900"> Resend the otp</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
