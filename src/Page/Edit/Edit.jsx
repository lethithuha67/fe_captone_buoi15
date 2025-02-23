import { useState } from "react";
// Import hook useState từ React để quản lý trạng thái của form

export default function ProfileEdit() {
  // Khai báo component ProfileEdit

  const [profile, setProfile] = useState({
    firstName: "đó", // Giá trị mặc định cho trường "Tên"
    lastName: "ai", // Giá trị mặc định cho trường "Họ"
    bio: "Kể câu chuyện của bạn", // Giá trị mặc định cho trường "Giới thiệu"
    website: "", // Giá trị mặc định cho trường "Trang web"
    username: "ai đó", // Giá trị mặc định cho trường "Tên người dùng"
  });

  // Hàm xử lý thay đổi giá trị của các input
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ input được thay đổi
    setProfile((prev) => ({ ...prev, [name]: value })); // Cập nhật trạng thái của profile
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-10">
      {/* Container chính, căn giữa nội dung, có background màu xám nhạt, padding 10 */}

      {/* Thanh tìm kiếm, thông báo, tin nhắn */}
      <div className="w-full max-w-4xl flex justify-between items-center bg-white p-4 shadow-md rounded mb-6">
        {/* Thanh chứa ô tìm kiếm và biểu tượng thông báo/tin nhắn */}

        <input
          type="text"
          placeholder="Tìm kiếm"
          className="border p-2 rounded w-1/2"
        />
        {/* Ô input để tìm kiếm, chiếm 50% chiều rộng */}

        <div className="flex space-x-4">
          {/* Nhóm chứa biểu tượng thông báo và tin nhắn */}

          <span className="relative cursor-pointer">
            🔔
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              83
            </span>
          </span>
          {/* Biểu tượng chuông có thông báo số 83, với dấu đỏ góc trên phải */}

          <span className="cursor-pointer">💬</span>
          {/* Biểu tượng tin nhắn */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        {/* Container chứa phần chỉnh sửa hồ sơ, nền trắng, bo góc, bóng đổ */}

        <h2 className="text-xl font-semibold mb-2">Hồ sơ công khai</h2>
        {/* Tiêu đề chính của trang */}

        <p className="text-gray-500 mb-4">
          Người truy cập hồ sơ của bạn sẽ thấy thông tin sau
        </p>
        {/* Mô tả ngắn về hồ sơ công khai */}

        <div className="flex items-center mb-4">
          {/* Phần chứa ảnh đại diện và nút thay đổi */}

          <div className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full text-xl font-bold">
            Đ
          </div>
          {/* Vòng tròn đại diện cho ảnh đại diện, có chữ "Đ" bên trong */}

          <button className="ml-4 px-3 py-1 bg-gray-200 rounded">
            Thay đổi
          </button>
          {/* Nút thay đổi ảnh đại diện */}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Chia bố cục thành 2 cột để nhập "Tên" và "Họ" */}

          <div>
            <label className="text-gray-600">Tên</label>
            {/* Nhãn cho ô nhập tên */}
            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {/* Ô input cho "Tên", cập nhật giá trị khi nhập */}
          </div>

          <div>
            <label className="text-gray-600">Họ</label>
            {/* Nhãn cho ô nhập họ */}
            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            {/* Ô input cho "Họ", cập nhật giá trị khi nhập */}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Giới thiệu</label>
          {/* Nhãn cho ô giới thiệu */}
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {/* Ô textarea cho phần giới thiệu */}
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Trang web</label>
          {/* Nhãn cho ô nhập trang web */}
          <input
            type="text"
            name="website"
            value={profile.website}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            placeholder="Thêm liên kết để hướng lưu lượng vào website"
          />
          {/* Ô input cho trang web, có placeholder hướng dẫn */}
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Tên người dùng</label>
          {/* Nhãn cho ô nhập tên người dùng */}
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {/* Ô input cho tên người dùng */}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {/* Nhóm nút "Thiết lập lại" và "Lưu", căn giữa */}

          <button className="px-4 py-2 bg-gray-200 rounded">
            Thiết lập lại
          </button>
          {/* Nút "Thiết lập lại", nền xám */}

          <button className="px-4 py-2 bg-red-500 text-white rounded">
            Lưu
          </button>
          {/* Nút "Lưu", nền đỏ, chữ trắng */}
        </div>
      </div>
    </div>
  );
}
