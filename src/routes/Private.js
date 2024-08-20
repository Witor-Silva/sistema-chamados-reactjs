import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

export default function Private({ children }) {
  const { signed, loading } = useContext(AuthContext);


  if (loading) {
    <div>

    </div>
  }

  if (!signed) {
    return <Navigate to="/" />
  }
  return children;
}
