import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    name: "",
    class: "",
    age: "",
  });

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get(`${API}/students/${id}`);
        setInput(res.data);
        setError(null);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to load student. Please check your database connection."
        );
      }
    };
    getAllData();
  }, [id]);

  const handleEditData = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/students/${id}`, input);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to update student. Please check your database connection."
      );
    }
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

          {error && (
            <div className="col-md-12">
              <div className="alert alert-danger mt-3" role="alert">
                <strong>Error:</strong> {error}
              </div>
            </div>
          )}

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
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        <button
          onClick={() => navigate("/")}
          className="col-md-12 btn btn-info mt-2"
        >
          Go To Home
        </button>
      </div>
    </div>
  );
}
