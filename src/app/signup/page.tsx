"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log(user);
      const response = await axios.post("/api/users/signup", user);
      setLoading(false);
      console.log(response);
      if (response.status === 200) {
        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.response.data.error);
      console.error("Signup failed", error);
      setLoading(false);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col w-[350px] rounded-lg  justify-center relative left-[50%] top-[50%] translate-x-[-50%] translate-y-[20%]">
      <h2 className="text-4xl font-bold text-center text-white-800 mb-10">
        {loading ? "Processing..." : "Signup"}
      </h2>
      <form action="/api/users/login">
        {error && (
          <div className="my-5  bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}
        <div className="flex flex-col  pb-3   text-lg ">
          <label htmlFor="username" className="text-xl m-2">
            username
          </label>
          <input
            type="text"
            className="text-black h-10 bg-white  focus:outline-none border rounded-md pl-2 focus:border-gray-600"
            placeholder="username"
            name="username"
            id="username"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col py-3 text-lg">
          <label htmlFor="email" className="text-xl m-2">
            email
          </label>
          <input
            type="email"
            className="text-black h-10 bg-white  focus:outline-none border rounded-md pl-2 focus:border-gray-600"
            name="email"
            placeholder="email"
            id="email"
            onChange={handleOnChange}
          />
        </div>
        <div className="flex flex-col py-3 mb-10 text-lg">
          <label htmlFor="password" className="text-xl m-2">
            password
          </label>
          <input
            type="password"
            className="text-black h-10 bg-white focus:outline-none  focus:border-gray-600 border rounded-md pl-2"
            name="password"
            placeholder="password"
            id="password"
            onChange={handleOnChange}
          />
        </div>

        <button
          className="block px-5 py-2 text-lg mx-auto  font-semibold   border  rounded-md disabled:text-gray-300 disabled:border-gray-500 enabled:hover:text-gray-300 enabled:hover:border-gray-500 enabled:border-gray-400 disabled:cursor-not-allowed "
          onClick={handleSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? "No Signup" : "Signup"}
        </button>
        <Link
          href="/login"
          className=" group text-lg flex items-center gap-2 mt-7 py-1 w-max"
        >
          Visit login page{" "}
          <FaArrowRightLong className="group-hover:translate-x-1 transition duration-400 ease-out" />
        </Link>
      </form>
    </div>
    //Here if wanted i can also use transition-all in place of transition-[gap] but using by specifying gap will helpful when there are different effects hover,focus,etc and you don't want to apply transition in them.
  );
}
