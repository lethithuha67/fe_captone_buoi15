import React, { useState } from "react";
import { Search } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [search, setSearch] = useState("");

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold">My Website</h1>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-white text-black px-3 py-1 rounded-lg">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ml-2 outline-none bg-transparent w-40"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/details">Details</NavLink>
          <NavLink to="/addimages">Addimages</NavLink>
          <NavLink to="/edit">Edit</NavLink>
          
          
        </nav>

        {/* Login & Register Buttons */}
        <div className="hidden md:flex space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200">
          <NavLink to="/authform">Login</NavLink>
          </button>
          <button className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg hover:bg-yellow-300">
          <NavLink to="/registerform">Sign up</NavLink>
          </button>
        </div>
      </div>
    </header>
  );
}
