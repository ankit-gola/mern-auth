// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'

// const Verify = () => {
//     const {token} = useParams()
//     const [status, setStatus] = useState("Verifying...")
//     const navigate = useNavigate()

//     useEffect(()=>{
//         const verifyEmail = async()=>{
//             try {
//                 const res = await axios.post(`http://localhost:8000/user/verify`, {},{
//                     headers:{
//                         Authorization: `Bearer ${token}`
//                     }
//                 })
//                 if(res.data.success){
//                     setStatus("✅ Email Verified Successfully")
//                     setTimeout(()=>{
//                         navigate('/login')
//                     }, 2000)
//                 }else{
//                     setStatus("❌ Invalid or Expired Token")
//                 }
//             } catch (error) {
//                 console.log(error);
//                 setStatus("❌ Verification Failed.Please try again")
                
//             }
//         };

//         verifyEmail()
//     },[token, navigate])
//   return (
//     <div className='relative w-full h-[760px] bg-green-100 overflow-hidden'>
//        <div className='min-h-screen flex items-center justify-center'>
//         <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
//             <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
//         </div>
//        </div>
//     </div>
//   )
// }

// export default Verify

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await axios.get(`http://localhost:8000/user/verify/${token}`);
        setStatus("success");

        // ✅ AUTO REDIRECT after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        setStatus("failed");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "verifying" && <p>Verifying...</p>}
      {status === "success" && <p style={{ color: "green" }}>✅ Email Verified Successfully</p>}
      {status === "failed" && <p style={{ color: "red" }}>❌ Verification Failed. Please try again</p>}
    </div>
  );
};

export default Verify;

