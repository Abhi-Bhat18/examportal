import React, { useState, useEffect } from "react";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import axios from "axios";
import ExamCard from "../components/ExamCard";
import { decodeToken } from "react-jwt";

const Exams = () => {
  const token = localStorage.getItem("auth_token");
  const [createExm, setCreateExam] = useState(false);
  const [fetchDetails,setFetchDetails] = useState(false)
  const [data, setData] = useState([]);
  const [err, setErr] = useState();
  const [loading, setLoading] = useState(false);

  //Form inputs
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState("");

  //display exam form
  const displayForm = () => {
    setCreateExam(true);
  };

  //Creating an exam
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data, status } = await axios.post(
        "http://localhost:1337/api/admin/create",
        {
          title,
          city,
          category,
          startTime,
          endTime,
          date,
          description,
          createdBy: decodeToken(token).id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (status == 201) {
        alert("exam created successfully");
        setCreateExam(false);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  //fetching exams
  const fetchExam = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        "http://localhost:1337/api/admin/exams",
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
      } else {
        setErr(data.message);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      return alert(error.message);
    }
  };
  useEffect(() => {
    fetchExam();
  }, [fetchDetails]);

  return (
    <div className="bg-slate-200 py-5 min-w-screen min-h-screen">
      <div className="bg-white lg:w-[70vw] p-5 lg:px-10 lg:py-5 mx-auto rounded-md ">
        <div className="flex justify-between flex-wrap p-5 items-center">
          <p className="text-4xl">Hello Admin!</p>
          <button
            onClick={displayForm}
            className="flex justify-center items-center sapce-x-5"
          >
            <AiOutlineAppstoreAdd size={20} /> Add Exams
          </button>
        </div>

        {createExm && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between flex-wrap">
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Exam Title</label>
                <input
                  type="text"
                  className="outline-none border-b-blue-300 border-b-2 focus:rounded-sm focus:border-b-blue-400 px-5"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Choose Date</label>
                <input
                  type="date"
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Start Time</label>
                <input
                  type="time"
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">End Time</label>
                <input
                  type="time"
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Description</label>
                <input
                  type="text"
                  className="outline-none border-b-blue-300 border-b-2 focus:rounded-sm focus:border-b-blue-400 px-5"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Exam City</label>
                <input
                  type="text"
                  className="outline-none border-b-blue-300 border-b-2 focus:rounded-sm focus:border-b-blue-400 px-5"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </div>
              <div className="flex space-x-2 my-5">
                <label htmlFor="">Category</label>
                <input
                  type="text"
                  className="outline-none border-b-blue-300 border-b-2 focus:rounded-sm focus:border-b-blue-400 px-5"
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-800 px-2 py-1 rounded-sm text-white"
            >
              Add Exam
            </button>
          </form>
        )}

        <div className="w-full">
          <h1 className="text-4xl text-center my-10 border-b-[2px]">
            Exam Details
          </h1>
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
                setFetchDetails={setFetchDetails}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Exams;
