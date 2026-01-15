import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    // 🔒 SAFETY CHECK
    if (!token) {
      setStatus("failed");
      return;
    }

    const verifyUser = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_BASE_URL}/user/verify/${token}`
        );

        setStatus("success");

        // ✅ AUTO REDIRECT after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);

      } catch (error) {
        console.error("Verification error:", error);
        setStatus("failed");
      }
    };

    verifyUser();
  }, [token, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {status === "verifying" && <p>🔄 Verifying your email...</p>}
      {status === "success" && (
        <p style={{ color: "green" }}>✅ Email Verified Successfully</p>
      )}
      {status === "failed" && (
        <p style={{ color: "red" }}>
          ❌ Verification Failed. Link may be expired.
        </p>
      )}
    </div>
  );
};

export default Verify;
