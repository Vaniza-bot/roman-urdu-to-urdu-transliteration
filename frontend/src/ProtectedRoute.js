import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await axios.get("http://localhost:5000/me", {
          withCredentials: true,
        });

        if (res.data.success) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (err) {
        setAuth(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!auth) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;