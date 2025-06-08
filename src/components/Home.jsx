import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Home({ addUser, clearEdit, editUser }) {
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