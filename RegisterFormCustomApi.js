import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterFormCustomApi() {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({ id: "", userName: "", userImage: "" });
  const [isEdit, setIsEdit] = useState("Submit");
  const { id, userName, userImage } = user;
  useEffect(() => {
    fetchHandler();
  }, []);

  const fetchHandler = (event) => {
    axios
      .get("https://625cfa6495cd5855d618ad2d.mockapi.io/registerUser")
      .then((resp) => {
        setData(resp.data);
        console.log(resp.data);
      });
  };

  const changeHandler = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  const changeFileHandler = (event) => {
    let path = event.target.value.replace(/C:\\fakepath\\/g, "images/");
    console.log(path, "path");
    setUser({ ...user, [event.target.name]: path });
  };
  const validateForm = (event) => {
    event.preventDefault();

    alert("Form Submit");
    axios
      .post("https://625cfa6495cd5855d618ad2d.mockapi.io/registerUser", user)
      .then((response) => {
        console.log(response);
        fetchHandler();
        setUser({ userName: "", userImage: "" });
      });
  }
  const onDelete = async(id) => {
    alert(id);
    axios
      .delete(`https://625cfa6495cd5855d618ad2d.mockapi.io/registerUser/${id}`)
      .then((resp) => {
        alert("Successfull Delete"); fetchHandler();
      });
      
  }
  const onEdit = async(id) => {
    alert(id);
    setIsEdit("Update")
    axios
      .get(`https://625cfa6495cd5855d618ad2d.mockapi.io/registerUser/${id}`)
      .then((resp) => {
        setUser({ id:resp.data.id, userName: resp.data.userName, userImage: resp.data.userImage });
        console.log(resp.data);
      });
      
  }
  const updateForm = (event) => {
    event.preventDefault();

    alert("Form Updated",id);
    alert(id);
    axios
      .put(`https://625cfa6495cd5855d618ad2d.mockapi.io/registerUser/${id}`,user)
      .then((response) => {
        console.log(response);
        fetchHandler();
        setUser({ id:"" , userName: "", userImage: "" });
      });
  }
  return (
    
    <div className="card">
      <div className="card-body">
        <h1>Register </h1>

        <div className="row">
          <div className="col-4">
            <form name="regForm" onSubmit={isEdit=="Submit"? validateForm : updateForm}>
              <input type="text" defaultValue={user.id} />
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="userName"
                  placeholder="Enter userName"
                  name="userName"
                  value={user.userName}
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="img">Image:</label>
                <input
                  type="file"
                  className="form-control"
                  id="userImage"
                  name="userImage"
                  onChange={changeFileHandler}
                />
              </div>
              <button type="submit" value={isEdit} className="btn btn-primary">
                {isEdit}
              </button>
            </form>
          </div>
          <div className="col-md-8">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody id="tbody">
                {data.map((data, index) => (
                  <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.userName}</td>
                    <td>
                      
                      <img
                        src={data.userImage}
                        alt={data.userImage}
                        style={{ width: "44px" }}
                      />
                    </td>
                    <td>
                      <i className="fa fa-edit" 
                      onClick={() => onEdit(data.id)}></i>
                    </td>
                    <td>
                      <i
                        className="fa fa-trash"
                        onClick={() => onDelete(data.id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
