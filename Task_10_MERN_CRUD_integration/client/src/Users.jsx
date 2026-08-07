import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "./api";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.getUsers()
      .then((data) => setUsers(data || []))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    api.deleteUser(id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="app-container">
      {/* Decorative glow dots */}
      <div className="glow-dot glow-dot-1"></div>
      <div className="glow-dot glow-dot-2"></div>

      <div className="glass-panel">
        <div className="top-bar">
          <div>
            <h1 className="panel-title">User Workspace</h1>
            <p className="panel-subtitle">Manage, view, and update registered members</p>
          </div>
          <Link to="/create" className="btn-premium btn-premium-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Member
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">👥</div>
            <p className="empty-state-text">No members registered in the workspace yet.</p>
            <Link to="/create" className="btn-premium btn-premium-secondary">
              Add the first user
            </Link>
          </div>
        ) : (
          <div className="custom-table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        <div className="action-buttons-group">
                          <Link
                            to={`/update/${user._id}`}
                            className="btn-premium btn-premium-edit"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn-premium btn-premium-danger"
                            onClick={(e) => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
