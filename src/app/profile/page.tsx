"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  __v: number;
};

export default function Profile() {
  const router = useRouter();
  const [data, setdata] = useState<User | null>(null);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const responseData = await axios.get("/api/users/me");
        setloading(false);
        setdata(responseData.data.data);
      };
      fetchData();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setloading(false);
      seterror(error.response.data.error);
      console.error("data fetching failed", error);
    }
  }, []);
  const handleLogout = async () => {
    const logoutResponse = await axios.post("/api/users/logout");
    console.log(logoutResponse);
    if (logoutResponse.data.success) {
      router.push("/login");
    }
  };
  if (loading) {
    return (
      <div className="max-w-lg mx-auto p-6  rounded-lg ">
        <h2 className="text-3xl p-1 font-bold mb-24 mt-10 text-center text-gray-400 dark:text-gray-500 shadow-md dark:shadow-gray-700">
          User Profile
        </h2>
        <p className="text-3xl text-center">Loading...</p>
        <button
          className="m-14  py-2 px-4 w-28 block mx-auto shadow-gray-300 shadow-md bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition-all duration-300 hover:shadow-none dark:shadow-red-900 disabled"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-lg mx-auto p-6  rounded-lg ">
        <h2 className="text-3xl p-1 font-bold mb-24 mt-10 text-center text-gray-400 dark:text-gray-500 shadow-md dark:shadow-gray-700">
          User Profile
        </h2>
        <p className="text-3xl ">
          Oops... an error occured while loading the user details
        </p>
        <button
          className="m-14  py-2 px-4 w-28 block mx-auto shadow-gray-300 shadow-md bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition-all duration-300 hover:shadow-none dark:shadow-red-900 disabled"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-lg mx-auto p-6  rounded-lg ">
      <h2 className="text-3xl p-1 font-bold mb-24 mt-10 text-center text-gray-400 dark:text-gray-500 shadow-md dark:shadow-gray-700">
        User Profile
      </h2>
      <div className="space-y-8">
        <p className="text-lg">
          <strong>ID:</strong> {data?._id}
        </p>
        <p className="text-lg ">
          <strong>Username:</strong> {data?.username}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {data?.email}
        </p>
        <p className="text-lg">
          <strong>Verified:</strong> {data?.isVerified ? "Yes" : "No"}
        </p>
        <p className="text-lg">
          <strong>Admin:</strong> {data?.isAdmin ? "Yes" : "No"}
        </p>
        <p className="text-lg">
          <strong>Version:</strong> {data?.__v}
        </p>
      </div>
      <button
        className="m-14  py-2 px-4 w-28 block mx-auto shadow-gray-300 shadow-md bg-red-600 text-white font-bold rounded-md hover:bg-red-500 transition-all duration-300 hover:shadow-none dark:shadow-red-900 "
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
