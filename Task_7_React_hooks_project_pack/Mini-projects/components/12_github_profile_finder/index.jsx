import { useEffect, useState } from "react";
import User from "./user";
import "./styles.css";

export default function GithubProfileFinder() {
  const [userName, setUserName] = useState("Rajdeep-Mudiar");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchGithubUserData() {
    if (!userName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.github.com/users/${userName}`);
      if (!res.ok) throw new Error("User not found");
      const data = await res.json();
      setUserData(data);
    } catch (e) {
      setError(e.message);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetchGithubUserData();
  }

  useEffect(() => {
    fetchGithubUserData();
  }, []);

  return (
    <div className="github-profile-container">
      <form className="input-wrapper" onSubmit={handleSubmit}>
        <input
          name="search-by-username"
          type="text"
          placeholder="Search Github Username..."
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <div className="loading-state">Loading data...Please wait</div>}
      {error && <div className="error-state">Error: {error}</div>}
      {!loading && !error && userData && <User user={userData} />}
    </div>
  );
}
