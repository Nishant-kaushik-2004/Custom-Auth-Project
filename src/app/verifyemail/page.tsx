"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

export default function Verifyemail() {
  // const router = useRouter();
  const [verified, setVerified] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [verifyStatus,setVerifyStatus] = useState("")

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      console.log(response.data);
      setVerifyStatus(response.data.message)
      setVerified(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error);
      } else {
        setError("An unknown error occurred");
      }
    }
  };
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1]; //Using only javascript
    setToken(urlToken || "");
    // const {query} = router;   //This is better approach as it uses next.js features unlike in above which uses simply javascript only no react no next.js
    // if (typeof query.token === 'string') {
    //   setToken(query.token);
    // } else {
    //   console.error('Invalid token value'); // Handle the case when token is undefined or an array
    // }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-300 text-center mb-4">
          Email Verification
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {token !== "" ? (
            <>
              Token:
              <span className="font-mono text-sm text-blue-600 break-words">
                {token}{" "}
              </span>
            </>
          ) : (
            "No Token"
          )}
        </p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}

        {verified ? (
          <p className="text-green-600 text-center font-semibold">
            {verifyStatus}
          </p>
        ) : (
          <button
            onClick={verifyUserEmail}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Verify Email
          </button>
        )}
      </div>
    </div>
  );
}
