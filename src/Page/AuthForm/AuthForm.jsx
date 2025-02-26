import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: "",
    pass_word: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
try {
  const result = await fetch("/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await result.json();
  if(data.data.user.user_id) {
    message.success("Login success");
    localStorage.setItem('DATA_USER', JSON.stringify(data.data));
    window.location.href = "/";
  } else {
    message.error("Email or password is incorrect");
  }
} catch (error) {
  console.log(error);
  message.error("Email or password is incorrect");
}
  };

  return (
    <div className="flex items-center justify-center h-full bg-stone-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center mb-6">
          {type === "register" ? "Create Account" : "Welcome Back"}
        </h2>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder={type === "register" ? "Create password" : "Enter password"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none focus:border-red-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            {type === "register" ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
