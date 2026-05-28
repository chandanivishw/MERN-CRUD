import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [students, setStudents] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: " ",
    class: " ",
    age: " ",
  });

  // ✅ API URL from env
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getAllData = async () => {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    };

    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`${API}/students`, input);

    setRender(!render);
    setInput({
      name: " ",
      class: " ",
      age: " ",
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/students/${id}`);

    const newStudents = students.filter((item) => {
      return item._id !== id;
    });

    setStudents(newStudents);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div style={{ backgroundColor: "blue" }}>
            <h1 className="text-white text-center mt-3">
              STUDENT CRUD OPERATION
            </h1>
          </div>
        </div>

        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={input.name}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Class</label>
              <input
                type="number"
                className="form-control"
                name="class"
                value={input.class}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                className="form-control"
                name="age"
                value={input.age}
                onChange={(e) =>
                  setInput({ ...input, [e.target.name]: e.target.value })
                }
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>

        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Age</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.class}</td>
                  <td>{student.age}</td>

                  <td>
                    <Link to={`/edit/${student._id}`}>
                      <button className="btn btn-primary">Edit</button>
                    </Link>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

