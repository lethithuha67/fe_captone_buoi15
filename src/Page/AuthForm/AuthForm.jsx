import React, { useState } from "react";

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(type === "register" && { name: "", age: "" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center">
          Welcome to my picture
        </h2>
        {type === "register" && (
          <p className="text-gray-500 text-center mb-4">
            Tìm những ý tưởng mới để thử
          </p>
        )}

        <div className="space-y-4">
          {/* email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none"
            />
          </div>

          {/* mật khẩu email */}
          <div>
            <label className="block text-gray-700">Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder={type === "register" ? "Tạo mật khẩu" : "Mật khẩu"}
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg outline-none"
            />
          </div>

          {/* nút đăng nhập  */}
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            {type === "register" ? "Đăng ký" : "Đăng nhập"}
          </button>
        </div>
      </div>
    </div>
  );
}
