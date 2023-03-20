import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
const ExamCard = ({
  id,
  title,
  category,
  startTime,
  endTime,
  date,
  description,
  city,
  details = true,
  setFetchDetails
}) => {
  const deleteExam = async () => {
    try {
        const { data, status } = await axios.delete(
            `http://localhost:1337/api/admin/exam/${id}`,{
                headers:{
                    'Content-Type':'application/json',
                    'x-auth-token':localStorage.getItem('auth_token')
                }
            }
          );
          console.log(data, status);
          if (status == 200) {
            alert("Exam deleted successfully");
            setFetchDetails(prev => !prev)
          } else {
            alert(data.message);
          }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="space-y-5 my-5 border-b-2 py-5">
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
      <div className="flex justify-between ">
        {details && (
          <Link to={`../admin/exam/${id}`} className="underline text-blue-800">
            View Details
          </Link>
        )}
        <button onClick={deleteExam} className="bg-blue-800 text-white px-5 py-1 roundeds-sm">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExamCard;
