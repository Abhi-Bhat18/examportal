import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const ExamCard = ({
  id,
  title,
  category,
  startTime,
  endTime,
  date,
  description,
  city,
  setFetchDetail
}) => {
  const token = localStorage.getItem("auth_token") || null;

  const withDrawRegistration = async () => {
    try {
      if (token == null) return alert("Please login for exam");

      const { data, status } = await axios.delete(
        `http://localhost:1337/api/user/exam/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      if (status == 200) {
        alert("Withdrawn succesfully");
        setFetchDetail(prev => !prev);
    }
      else return alert(data.message);
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
          onClick={withDrawRegistration}
          className="bg-blue-800 text-white px-5 py-1 roundeds-sm"
        >
          Withdraw
        </button>
      </div>
    </div>
  );
};

const About = () => {
const navigate = useNavigate();
  const token = localStorage.getItem("auth_token");
  const [fetchDetail, setFetchDetail] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState();

  const fetchUserDeatils = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        "http://localhost:1337/api/user",
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );
      setLoading(false);
      if (status == 200) {
        setData(data);
        console.log(data);
      } else return alert(data.message);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  useEffect(() => {
    if(!token) {
        alert('Please login or Sign-Up')
        navigate('/login')
        return;
    }
    fetchUserDeatils();
  }, [fetchDetail]);
  return (
    <div className="bg-slate-200 w-screen min-h-screen flex">
      <div className="bg-white w-full mx-5 lg:w-[70vw] lg:mx-auto my-5 flex p-5">
        {loading || data.length == 0 ? (
          <>Loading</>
        ) : (
          <div className="w-full space-y-5">
            <div className="w space-y-5 border-b-2 w-full">
              <h1 className="text-4xl">Profile</h1>
              <p>Name:{`${data.firstName} ${data.lastName}`}</p>
              <p>Email:{data.email}</p>
              <p>Contact:{data.contact}</p>
            </div>
            <div>
              <h2 className="text-2xl">Registered Exmas</h2>
              {data.exams.map((exam) => (
                <ExamCard
                  key={exam._id}
                  category={exam.category}
                  title={exam.title}
                  city={exam.city}
                  startTime={exam.startTime}
                  endTime={exam.endTime}
                  description={exam.description}
                  date={exam.date
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                  id={exam._id}
                  setFetchDetail={setFetchDetail}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;
