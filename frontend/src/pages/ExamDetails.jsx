import React, { useState, useEffect } from "react";
import ExamCard from "../components/ExamCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const CandidateCard = ({ name, email, id }) => {
  return (
    <ul className="flex lg:m-10 justify-between border-b-2">
      <li>{name}</li>
      <li>{email}</li>
    </ul>
  );
};

const ExamDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("auth_token");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState([]);

  const fetchExamDetails = async (req, res) => {
    try {
      if (!token) return alert("Please login");
      setLoading(true);
      const { data, status } = await axios.get(
        `http://localhost:1337/api/admin/exam/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("auth_token"),
          },
        }
      );
      setLoading(false);
      if (status == 200) {
        setData(data);
        console.log(data)
      } else alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExamDetails();
  }, []);

  return (
    <div className="bg-slate-200 min-h-screen flex">
      <div className="px-5 py-10 lg:w-[70vw] mx-auto space-y-10 bg-white my-10">
        <h1 className="text-4xl text-center">Exam Detail</h1>
        {loading || data.length == 0 ? (
          <>Loading</>
        ) : (
          <ExamCard
            city={data.city}
            title={data.title}
            startTime={data.startTime}
            endTime={data.endTime}
            category={data.category}
            date={data.date.substring(0, 10).split("-").reverse().join("-")}
            description={data.description}
            details={false}
          />
        )}
        <div>
          <h2 className="text-2xl">Registered candidates</h2>
          <ul className="flex my-10 lg:m-10 justify-between border-b-2">
            <li>Candidate Name</li>
            <li>Candidate Email</li>

          </ul>
          {loading || data.length == 0 ? (
            <>Loading....</>
          ) : (
            data.candidates.map((candidate,index) => <CandidateCard key={index} email={candidate.email} id={candidate._id} name={`${candidate.firstName} ${candidate.lastName}`}/>)
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamDetails;
