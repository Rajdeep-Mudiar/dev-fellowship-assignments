import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { api } from "./api";

function UpdateUser() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    api.getUser(id)
      .then((result) => {
        console.log(result);
        if (result) {
          setName(result.name);
          setEmail(result.email);
          setAge(result.age);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    api.updateUser(id, { name, email, age })
      .then((result) => {
        console.log(result);

        // Used to move back to the home page after click on submit in add user page
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app-container">
      {/* Decorative glow dots */}
      <div className="glow-dot glow-dot-1"></div>
      <div className="glow-dot glow-dot-2"></div>

      <div className="glass-panel" style={{ maxWidth: '550px' }}>
        <form action="" onSubmit={Update}>
          <h2 className="panel-title">Update User</h2>
          <p className="panel-subtitle">Edit the details of the selected workspace member</p>
          
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="custom-input"
              value={name || ""}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="custom-input"
              value={email || ""}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              className="custom-input"
              value={age || ""}
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <Link to="/" className="btn-premium btn-premium-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-premium btn-premium-primary">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
