import { useEffect, useState } from "react";
import Suggestions from "./suggestions";
import "./styles.css";

export default function SearchAutoComplete() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  function handleChange(event) {
    const query = event.target.value.toLowerCase();
    setSearchParam(query);

    if (query.length > 1) {
      const filteredData =
        users && users.length
          ? users.filter((item) => item.toLowerCase().indexOf(query) > -1)
          : [];

      setFilteredUsers(filteredData);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }

  function handleClick(name) {
    setShowDropdown(false);
    setSearchParam(name);
    setFilteredUsers([]);
  }

  async function fetchListOfUsers() {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();

      if (data && data.users && data.users.length) {
        setUsers(data.users.map((userItem) => userItem.firstName));
        setError(null);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchListOfUsers();
  }, []);

  return (
    <div className="search-autocomplete-container">
      {error && <div className="error-state">Error loading users</div>}
      {loading ? (
        <div className="loading-state">Loading Data... Please wait</div>
      ) : (
        <div className="input-wrapper">
          <input
            type="text"
            name="search-users"
            placeholder="Search Users here"
            value={searchParam}
            onChange={handleChange}
          />
          {showDropdown && (
            <Suggestions handleClick={handleClick} data={filteredUsers} />
          )}
        </div>
      )}
    </div>
  );
}
