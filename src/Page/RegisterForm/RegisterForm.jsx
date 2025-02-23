import React, { useState } from "react";

export default function RegisterForm() {
  // Khai báo state để lưu thông tin đăng ký
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    age: "",
  });

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm xử lý khi nhấn nút đăng ký
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Thông tin đăng ký:", formData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        {/* Tiêu đề chính */}
        <h2 className="text-2xl font-bold text-center">
          Welcome to my picture
        </h2>
        {/* Phụ đề */}
        <p className="text-center text-gray-500 mb-4">
          Tìm những ý tưởng mới để thử
        </p>
        <form onSubmit={handleSubmit}>
          {/* Ô nhập Email */}
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Email"
            required
          />

          {/* Ô nhập Mật khẩu */}
          <label className="block mt-3 mb-2 font-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Tạo mật khẩu"
            required
          />

          {/* Ô nhập Họ tên */}
          <label className="block mt-3 mb-2 font-medium">Họ tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Họ tên"
            required
          />

          {/* Ô nhập Tuổi */}
          <label className="block mt-3 mb-2 font-medium">Tuổi</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 rounded-lg border"
            placeholder="Tuổi"
            required
          />

          {/* Nút Đăng ký */}
          <button
            type="submit"
            className="w-full mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
