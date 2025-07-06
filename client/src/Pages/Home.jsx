import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

export default function Home() {
  const [students, setStudents] = useState([]);
  const [render, setRender] = useState(false);
  const [input, setInput] = useState({
    name: " ",
    class: " ",
    age: " ",
  });
  //  useEffect(() => {
  //   const getAllData = async () => {
  //     const res = await axios.get("http://localhost:9000/api/v1/users");
  //     setUsers(res.data);
  //   };
  //   getAllData();
  // }, [render]);

  useEffect(() => {
    const getAllData = async () => {
      // try{
        const res = await axios.get("http://localhost:3002/students");
        setStudents(res.data);
      //   }catch(error){
      //   console.log(error)
      // }
      };
     
    getAllData();
  
  }, [render]);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//  await axios.post("http://localhost:9000/api/v1/users", input);
//     setRender(true);
//     setInput({
//         name: "",
//         email: "",
//         age: "",
//     });
 
// };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3002/students", input);
 
    setRender(true);
    setInput({
      name:" ",
      class:" ",
      age: " ",
  });
  };


  const handleDelete = async (id)=>{

    await axios.delete(`http://localhost:3002/students/${id}`);

    const newStudents = students.filter((item)=>{
        return item._id !== id ;
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
          {/* {input.name} */}
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
             
             required />

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
           required   />
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
             required />
            </div>
            <div className="mb-3">
              <button type="submtit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Class</th>
                <th scope="col">Age</th>
                <th scope="col"> Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            {/* <tbody>
              {students &&
                students.map((student) => {
                  return (
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
                        <button  onClick={()=>handleDelete(student._id)}  className="btn btn-danger">Delete</button>
                      </td>
                    </tr>
                  );
                })}
            </tbody> */}

<tbody>
                {students &&
                  students.map((student) => {
                    return (
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
                          <button onClick={()=>handleDelete(student._id)} className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    );
                  })
                  }
              </tbody>



          </table>
        </div>
      </div>
    </div>
  );
}
