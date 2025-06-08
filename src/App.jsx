import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEnvelope, FaLinkedin, FaTrash, FaPhone, FaEdit, FaInstagram } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Home Component
function Home({ addUser, clearEdit, editUser }) {
  const [form, setForm] = useState({
    name: "",
    position: "",
    email: "",
    linkedin: "",
    instagram: "",
    phone: "",
    image: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
    }
  }, [editUser]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { ...form, id: form.id || uuidv4() };
    addUser(newUser);
    setForm({ name: "", position: "", email: "", linkedin: "", instagram: "", phone: "", image: null });
    toast.success(editUser ? "Details updated successfully" : "Details submitted successfully");
    clearEdit();
    navigate("/team");
  };

  return (
    <div className="min-h-screen bg-black text-[#E8E8E8] p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <img src="./logo.webp" alt="logo" className="w-15 h-15 md:w-20 md:h-20" />
        <h1 className="text-xl md:text-3xl font-bold ">{editUser ? "Edit Team Member" : "Add Team Member"}</h1>
        <Link to="/team" className="bg-yellow-600 hover:bg-yellow-700 px-2 py-2 text-sm md:px-4 md:py-2 md:text-base rounded">View Team</Link>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-black/50 backdrop-blur-md p-6 rounded-xl shadow-lg">
      {["name", "position", "email", "linkedin URL", "instagram handle", "phone"].map(field => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="block w-full focus:outline-none bg-black bg-opacity-10 backdrop-blur-lg text-[#E8E8E8] border border-t-0 border-l-0 border-r-0 border-[#F5BC72] px-4 py-2 mb-2 text-sm md:text-base"
            required
          />
        ))}

        <div className="p-2">
          <label htmlFor="image-upload" className="cursor-pointer bg-black text-white py-2 rounded-lg shadow transition">
            Upload Image
          </label>
          <input id="image-upload" type="file" name="image" onChange={handleChange} className="w-full block text-grey-200 cursor-pointer mt-2" />
        </div>

        <button className="mt-4 w-full bg-[#D99343] hover:bg-yellow-700 text-[#E8E8E8] rounded py-2 font-bold" type="submit">
          {editUser ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

// Card Page Component
function CardPage({ users, deleteUser, setEditUser }) {
  if (users.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-tr from-black to-[#F5BC72] text-[#E8E8E8] p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 ">
        <img src="./logo.webp" alt="logo" className="w-15 h-15 md:w-20 md:h-20" />
        <h1 className="text-lg font-bold md:text-3xl ">Team Members</h1>
        <Link to="/" className="bg-yellow-600 hover:bg-yellow-700 px-2 py-2 text-sm md:px-4 md:py-2 md:text-base rounded">Back to Home</Link>
      </div>
      <div className="flex justify-center items-center h-[45vh] p-4 md:p-8">
        <h1 className="text-lg font-bold md:text-3xl ">No team members found</h1>
      </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-tr from-black to-[#F5BC72] text-[#E8E8E8] p-4 md:p-8">
      <div className="flex justify-between items-center mb-6 ">
        <img src="./logo.webp" alt="logo" className="w-15 h-15 md:w-20 md:h-20" />
        <h1 className="text-lg font-bold md:text-3xl ">Team Members</h1>
        <Link to="/" className="bg-yellow-600 hover:bg-yellow-700 px-2 py-2 text-sm md:px-4 md:py-2 md:text-base rounded">Back to Home</Link>
      </div>

      <div className="grid md:grid-cols-3 h-[45vh] mt-20 sm:grid-cols-2 gap-6 w-[80%] md:w-[75%] mx-auto">
        {users.map((user) => (
          <div key={user.id} className="bg-[#F5BC72]/10 glass-effect rounded-xl shadow-lg p-4 text-center">
            <img src={user.image} alt="Profile" className="w-35 h-35 mt-6 mx-auto rounded-full border-2 border-yellow-100 mb-4 object-cover" />
            <h3 className="text-2xl mt-8 font-bold">{user.name}</h3>
            <p className="text-md bg-gradient-to-r from-grey-800 to-[#F5BC72] text-transparent bg-clip-text">{user.position}</p>
            <div className="flex justify-center gap-4 mt-3 text-lg">
              <a href={`mailto:${user.email}`} className="hover:text-[#F5BC72] hover:scale-110 transition-all duration-300"><FaEnvelope /></a>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5BC72] hover:scale-110 transition-all duration-300"><FaLinkedin /></a>
              <a href={`https://www.instagram.com/${user.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#F5BC72] hover:scale-110 transition-all duration-300"><FaInstagram /></a>
              <a href={`tel:${user.phone}`} className="hover:text-[#F5BC72] transform hover:scale-110 transition-all duration-300 sacle-x-[-1]"><FaPhone /></a>
            </div>
            <div className="flex justify-between gap-2 mt-8">
              <Link to="/">
                <button onClick={() => setEditUser(user)} className="bg-gradient-to-r from-black to-[#F5BC72] hover:bg-gradient-to-r hover:from-grey-800 hover:to-yellow-600 cursor-pointer text-[#E8E8E8] rounded py-2  px-3 flex items-center gap-2"><FaEdit />Edit</button>
              </Link>
              <button onClick={() => deleteUser(user.id)} className="bg-transparent hover:text-[#E8E8E8] cursor-pointer hover:scale-110 transition-all duration-300 px-3 py-1 rounded flex items-center gap-2"><FaTrash /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
