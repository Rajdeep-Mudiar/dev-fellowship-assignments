import axios from "axios";

const API_URL = "http://localhost:3001";

// Use fallback if we are running on production Vercel deployment (Mixed Content block)
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

// Mock Database helper using localStorage
const getMockUsers = () => {
  const users = localStorage.getItem("mern_users");
  if (!users) {
    const initialUsers = [
      { _id: "mock_1", name: "Rajdeep Mudiar", email: "rajdeep@example.com", age: 22 },
      { _id: "mock_2", name: "Jane Doe", email: "jane@example.com", age: 25 }
    ];
    localStorage.setItem("mern_users", JSON.stringify(initialUsers));
    return initialUsers;
  }
  return JSON.parse(users);
};

const saveMockUsers = (users) => {
  localStorage.setItem("mern_users", JSON.stringify(users));
};

export const api = {
  getUsers: async () => {
    if (!isLocalhost) {
      return getMockUsers();
    }
    try {
      const res = await axios.get(API_URL);
      return res.data;
    } catch (err) {
      console.warn("Backend not running, using localStorage fallback.", err);
      return getMockUsers();
    }
  },

  getUser: async (id) => {
    if (!isLocalhost) {
      return getMockUsers().find((u) => u._id === id);
    }
    try {
      const res = await axios.get(`${API_URL}/getUser/${id}`);
      return res.data;
    } catch (err) {
      console.warn("Backend not running, using localStorage fallback.", err);
      return getMockUsers().find((u) => u._id === id);
    }
  },

  createUser: async (user) => {
    if (!isLocalhost) {
      const users = getMockUsers();
      const newUser = { _id: "mock_" + Date.now(), ...user };
      users.push(newUser);
      saveMockUsers(users);
      return newUser;
    }
    try {
      const res = await axios.post(`${API_URL}/createUser`, user);
      return res.data;
    } catch (err) {
      console.warn("Backend not running, using localStorage fallback.", err);
      const users = getMockUsers();
      const newUser = { _id: "mock_" + Date.now(), ...user };
      users.push(newUser);
      saveMockUsers(users);
      return newUser;
    }
  },

  updateUser: async (id, user) => {
    if (!isLocalhost) {
      const users = getMockUsers();
      const index = users.findIndex((u) => u._id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...user };
        saveMockUsers(users);
        return users[index];
      }
      return null;
    }
    try {
      const res = await axios.put(`${API_URL}/updateUser/${id}`, user);
      return res.data;
    } catch (err) {
      console.warn("Backend not running, using localStorage fallback.", err);
      const users = getMockUsers();
      const index = users.findIndex((u) => u._id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...user };
        saveMockUsers(users);
        return users[index];
      }
      return null;
    }
  },

  deleteUser: async (id) => {
    if (!isLocalhost) {
      const users = getMockUsers();
      const filtered = users.filter((u) => u._id !== id);
      saveMockUsers(filtered);
      return { success: true };
    }
    try {
      const res = await axios.delete(`${API_URL}/deleteUser/${id}`);
      return res.data;
    } catch (err) {
      console.warn("Backend not running, using localStorage fallback.", err);
      const users = getMockUsers();
      const filtered = users.filter((u) => u._id !== id);
      saveMockUsers(filtered);
      return { success: true };
    }
  }
};
