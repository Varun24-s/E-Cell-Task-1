import { Link } from "react-router-dom";
import { FaEnvelope, FaLinkedin, FaTrash, FaPhone, FaEdit, FaInstagram } from "react-icons/fa";

export default function CardPage({ users, deleteUser, setEditUser }) {
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
          <a href="/">
            <img src="./logo.webp" alt="logo" className="w-15 h-15 md:w-20 md:h-20" />
          </a>
          <h1 className="text-lg font-bold md:text-3xl ">Team Members</h1>
          <Link to="/" className="bg-yellow-600 hover:bg-yellow-700 px-2 py-2 text-sm md:px-4 md:py-2 md:text-base rounded">Back to Home</Link>
        </div>
  
        <div className="grid md:grid-cols-3 min-h-screen mt-20 sm:grid-cols-2 gap-6 w-[80%] md:w-[75%] mx-auto">
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
                  <button onClick={() => setEditUser(user)} className="bg-gradient-to-r from-[#ed8a08] to-[#F5BC72] hover:bg-gradient-to-r hover:from-grey-800 hover:to-yellow-600 cursor-pointer text-[#E8E8E8] rounded py-2  px-3 flex items-center gap-2"><FaEdit />Edit</button>
                </Link>
                <button onClick={() => deleteUser(user.id)} className="bg-transparent hover:text-[#E8E8E8] cursor-pointer hover:scale-110 transition-all duration-300 px-3 py-1 rounded flex items-center gap-2"><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }