import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");

  const [firstName, setFristname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data, status } = await axios.post(
        `http://localhost:1337/api/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
          contact,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(status);

      if (status == 201) {
        console.log(data);
        alert("User registerd Successfully");
        // navigate(`../verify/${data.id}`)
        navigate(`/verify/${data.id}`);
      } else return alert(data.message)
    } catch (error) {
      console.log(error);

    }
  };

  return (
    <div className="w-screen lg:h-screen bg-purple-900 flex justify-center items-center flex-wrap lg:px-40 lg:space-x-20">
      <div className="lg:flex-[0.3] p-10 lg:p-0  flex flex-col items-start justify-around space-y-10 text-white">
        <p className="text-2xl lg:text-4xl">Tportal</p>
        <p className="text-sm lg:text-xl">
          We are excited to have you join our community of learners and
          test-takers. Please fill out the information below to create your
          account and gain access to our extensive collection of practice exams
          and study materials.
        </p>
        <Link
          to={"../login"}
          className="bg-white text-purple-900 px-5 py-1 text-xl w-32 rounded-md"
        >
          Login
        </Link>
      </div>
      <div className="lg:flex-[0.7] bg-slate-200 justify-center items-center shadow-lg">
        <h1 className="w-full text-center mt-5">Register</h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-wrap p-10 "
          action=""
        >
          <div className="flex flex-col lg:w-80 lg:mx-10 my-5">
            <label htmlFor="">First Name *</label>
            <input
              className="h-10 outline-none focus:border-blue-400 border-2 rounded-md px-4"
              type="text"
              placeholder="Abhishek"
              name="firstName"
              onChange={(e) => {
                setFristname(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col lg:w-80 lg:mx-10 my-5">
            <label htmlFor="">Last Name *</label>
            <input
              className="h-10 outline-none bg-white focus:border-blue-400 border-2 rounded-md px-4"
              type="text"
              placeholder="Bhat"
              name="lastName"
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col lg:w-80 lg:mx-10 my-5">
            <label htmlFor="">Email </label>
            <input
              className="h-10 outline-none focus:border-blue-400 border-2 rounded-md px-4"
              type="email"
              placeholder="abhishekbhat.dev@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name={"email"}
              required
            />
          </div>
          <div className="flex flex-col lg:w-80 lg:mx-10 my-5">
            <label htmlFor="">Contact</label>
            <input
              className="h-10 outline-none focus:border-blue-400 border-2 rounded-md px-4"
              type="text"
              placeholder="9113021066"
              name="contact"
              required
              onChange={(e) => {
                setContact(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col lg:w-80 lg:mx-10 my-5">
            <label htmlFor="">Password</label>
            <input
              className="h-10 outline-none focus:border-blue-400 border-2 rounded-md px-4"
              type="password"
              placeholder="******"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <div className="w-80 lg:mx-10 my-5">
            <button
              type="submit"
              className="bg-blue-900 w-full text-xl text-white px-5 py-1 mt-5 rounded-sm"
            >
              Register
            </button>
          </div>
        </form>
        {err && (
          <div className="w-full text-red-900 pb-5 flex justify-center items-center">
            <p>{err}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
