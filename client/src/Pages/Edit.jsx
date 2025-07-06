import React, { useState,  useEffect } from "react";
import {useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
export default function Edit() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    name: "",
    class: "",
    age: "",
  });
  // useEffect(() => {
  //   const getAllData = async () => {
  //     const res = await axios.get(
  //       `http://localhost:9000/api/v1/users/single/${id}`
  //     );
  //     setInput(res.data);
  //   };
  //   getAllData();
  // }, [id]);

  // const handleEditData = async (e) => {
  //   e.preventDefault();

  //   await axios.put(`http://localhost:9000/api/v1/users/${id}`, input);
  //   navigate("/");
  // };

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(
        `http://localhost:3002/students/${id}`
      );
      setInput(res.data);
    };
    getAllData();
  }, [id]);



  const handleEditData = async (e) => {
    e.preventDefault();
  await axios.put(`http://localhost:3002/students/${id}`, input);
    navigate("/");
  };


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div style={{ backgroundColor: "blue" }}>
              <h1 className="text-white text-center mt-3">UPDATE</h1>
            </div>
          </div>
          <div className="col-md-12">
            <form onSubmit={handleEditData}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }

                />
              </div>
              <div className="mb-3">
                <label htmlFor="class" className="form-label">
                  Class
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="class"
                  name="class"
                  value={input.class}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  name="age"
                  value={input.age}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  } 

                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary ">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <button onClick={() => navigate("/")} className="col-md-12 btn btn-info mt-2">Go To Home</button>
      </div>
    </div>
  );
}
