import React, { useState, useEffect } from "react";
// import {GoSearch} from 'react-icons/go'
import axios from "axios";

const ExamCard = ({
  id,
  title,
  category,
  startTime,
  endTime,
  date,
  description,
  city,
}) => {
  const token = localStorage.getItem("auth_token") || null;

  const registerForExam = async () => {
    try {
      if (token == null) return alert("Please login for exam");

      const { data, status } = await axios.post(
        "http://localhost:1337/api/user/register",
        {
          examId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if(status == 200) return alert('Registered Successfully')
      else return alert(data.message)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-5 border-b-2 py-5">
      <div>
        <h2 className="text-3xl my-2">{title}</h2>
        <ul className="space-y-5">
          <li>Category:{category}</li>
          <li>City:{city}</li>
          <div className="flex justify-between flex-wrap">
            <li>Date:{date}</li>
            <li>starts at:{startTime}</li>
            <li>ends at:{endTime}</li>
          </div>
          <li>Description:{description}</li>
        </ul>
      </div>
      <div className="flex justify-between">
        <button
          onClick={registerForExam}
          className="bg-blue-800 text-white px-5 py-1 roundeds-sm"
        >
          Register
        </button>
      </div>
    </div>
  );
};

const RegisterExam = () => {
  const token = localStorage.getItem("auth_token");

  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);

  const fetchExam = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        "http://localhost:1337/api/exams",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (status == 200) {
        setData(data);
      } else {
        setErr(data.message);
      }
    } catch (error) {
      console.log(error);
      return alert(error.message);
    }
  };

  useEffect(() => {
    fetchExam();
  }, []);

  return (
    <div className="bg-slate-200 flex min-h-screen">
      <div className="bg-white lg:w-[70vw] w-full lg:mx-auto mx-2 my-5 rounded-md shadow-md p-10">
        <div className="flex justify-between flex-wrap md:space-x-5 ">
          <h1 className="text-4xl my-5 lg:my-0">Available exmas</h1>
        </div>
        <div className="space-y-5">
          {loading || data.length == 0 ? (
            <>Loading.....</>
          ) : (
            data.map((exam) => (
              <ExamCard
                key={exam._id}
                category={exam.category}
                title={exam.title}
                city={exam.city}
                startTime={exam.startTime}
                endTime={exam.endTime}
                description={exam.description}
                date={exam.date.substring(0, 10).split("-").reverse().join("-")}
                id={exam._id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterExam;
