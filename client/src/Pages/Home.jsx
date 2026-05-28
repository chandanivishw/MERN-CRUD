import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function Home() {
  const [students, setStudents] = useState([]);
  const [render, setRender] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState({
    name: " ",
    class: " ",
    age: " ",
  });

  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await axios.get(`${API}/students`);
        setStudents(res.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load students. Please check that MONGO_URI is set in Netlify environment variables.");
      }
    };

    getAllData();
  }, [render]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/students`, input);
      setRender(!render);
      setInput({ name: " ", class: " ", age: " " });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add student. Please check your database connection.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/students/${id}`);
      const newStudents = students.filter((item) => item._id !== id);
      setStudents(newStudents);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete student.");
    }
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

        {error && (
          <div className="col-md-12">
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Error:</strong> {error}
            </div>
          </div>
        )}

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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {Link} from 'react-router-dom'

// export default function Home() {
//   const [students, setStudents] = useState([]);
//   const [render, setRender] = useState(false);
//   const [input, setInput] = useState({
//     name: " ",
//     class: " ",
//     age: " ",
//   });

//   useEffect(() => {
//     const getAllData = async () => {
      
//         const res = await axios.get("http://localhost:3002/students");
//         setStudents(res.data);
     
//       };
     
//     getAllData();
  
//   }, [render]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:3002/students", input);
 
//     setRender(true);
//     setInput({
//       name:" ",
//       class:" ",
//       age: " ",
//   });
//   };


//   const handleDelete = async (id)=>{

//     await axios.delete(`http://localhost:3002/students/${id}`);

//     const newStudents = students.filter((item)=>{
//         return item._id !== id ;
//     });
//     setStudents(newStudents);

//   };




//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-12">
//           <div style={{ backgroundColor: "blue" }}>
//             <h1 className="text-white text-center mt-3">
//               STUDENT CRUD OPERATION
//             </h1>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <form onSubmit={handleSubmit}>
//           {/* {input.name} */}
//             <div className="mb-3">
//               <label htmlFor="name" className="form-label">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 name="name"
//                 value={input.name}
//                 onChange={(e) =>
//                   setInput({ ...input, [e.target.name]: e.target.value })
//                 }
             
//              required />

//             </div>
//       <div className="mb-3">
//               <label htmlFor="class" className="form-label">
//                 Class
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="class"
//                 name="class"
//                 value={input.class}
//                 onChange={(e) =>
//                   setInput({ ...input, [e.target.name]: e.target.value })
//                 }
//            required   />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="age" className="form-label">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 className="form-control"
//                 id="age"
//                 name="age"
//                 value={input.age}
//                 onChange={(e) =>
//                   setInput({ ...input, [e.target.name]: e.target.value })
//                 }
//              required />
//             </div>
//             <div className="mb-3">
//               <button type="submtit" className="btn btn-primary">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="col-md-6">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">Name</th>
//                 <th scope="col">Class</th>
//                 <th scope="col">Age</th>
//                 <th scope="col"> Edit</th>
//                 <th scope="col">Delete</th>
//               </tr>
//             </thead>

// <tbody>
//                 {students &&
//                   students.map((student) => {
//                     return (
//                       <tr key={student._id}>
//                         <td>{student.name}</td>
//                         <td>{student.class}</td>
//                         <td>{student.age}</td>
//                         <td>
                      
//                         <Link to={`/edit/${student._id}`}>
//                             <button className="btn btn-primary">Edit</button>
//                           </Link>
//                         </td>
//                         <td>
//                           <button onClick={()=>handleDelete(student._id)} className="btn btn-danger">Delete</button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                   }
//               </tbody>



//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }  