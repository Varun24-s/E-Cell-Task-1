import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home.jsx";
import CardPage from "./components/Cards.jsx";


// Main App Component
export default function App() {
  const [users, setUsers] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("users") || "[]");
    return saved.length > 0 ? saved : [];
  });

  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    if (editUser) {
      setUsers(users.map(u => u.id === editUser.id ? user : u));
      setEditUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const deleteUser = (id) => setUsers(users.filter((u) => u.id !== id));

  const clearEdit = () => setEditUser(null);

  return (
    <Router>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home addUser={addUser} clearEdit={clearEdit} editUser={editUser} />} />
        <Route path="/team" element={<CardPage users={users} deleteUser={deleteUser} setEditUser={setEditUser} />} />
      </Routes>
    </Router>
  );
}
