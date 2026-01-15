 

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
        await axios.get(`https://mern-auth-sezn.onrender.com/user/verify/${token}`);
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

