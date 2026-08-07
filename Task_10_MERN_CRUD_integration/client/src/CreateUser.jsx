import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const navigate = useNavigate();

  const Submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createUser", { name, email, age })
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
        <form action="" onSubmit={Submit}>
          <h2 className="panel-title">Add User</h2>
          <p className="panel-subtitle">Create a new user entry in the system database</p>
          
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              className="custom-input"
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
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <Link to="/" className="btn-premium btn-premium-secondary">
              Cancel
            </Link>
            <button type="submit" className="btn-premium btn-premium-primary">
              Submit User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
