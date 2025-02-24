import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Import hook useState từ React để quản lý trạng thái của form

export default function ProfileEdit() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [userEdit, setUserEdit] = useState({});

  const [profile, setProfile] = useState({
    email: "",
    pass_word: "",
    full_name: "",
    avatar: "",
  });

  const user = JSON.parse(localStorage.getItem('DATA_USER'));

  // Hàm xử lý thay đổi giá trị của các input
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ input được thay đổi
    setProfile((prev) => ({ ...prev, [name]: value })); // Cập nhật trạng thái của profile
  };

  const resetForm = () => {
    setProfile({
      pass_word: "",
      full_name: "",
      avatar: "",
    })
  }

  const getUser = async () => {
    const result = await fetch("/user/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    const find = data.data?.find((item) => item.user_id === id);
    
    if (find) {
      setUserEdit(find);
      setProfile({
        email: find.email || "",
        pass_word: "", // Keep password empty for security
        full_name: find.full_name || "",
        avatar: find.avatar || "",
      });
    }
  };

  const updateProfile = async () => {
    const formData = {
      user_id: id,
      email: profile.email,
      pass_word: profile.pass_word,
      full_name: profile.full_name,
      avatar: profile.avatar,
    }
    console.log(formData)
    // try {
    //   const result = await fetch(`/user/create-info`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })
    // } catch (error) {
      
    // }
  }
  
  useEffect(() => {
    if (!user) {
      message.warning("Please login first!");
      navigate("/authform");
    } else {
      getUser();
    }
  }, [id]); // Add id as a dependency to re-run when it changes

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
          <img src={profile.avatar} alt="avatar" className="w-16 h-16 flex items-center justify-center bg-gray-300 rounded-full" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfile(prevProfile => ({ ...prevProfile, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="ml-4"
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-600">email</label>
          <input
            readOnly
            type="text"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Password</label>
          <input
            type="password"
            name="pass_word"
            value={profile.pass_word}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mt-4">
          <label className="text-gray-600">Tên người dùng</label>
          {/* Nhãn cho ô nhập tên người dùng */}
          <input
            type="text"
            name="full_name"
            value={profile.full_name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          {/* Ô input cho tên người dùng */}
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {/* Nhóm nút "Thiết lập lại" và "Lưu", căn giữa */}

          <button onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded">
            Thiết lập lại
          </button>
          {/* Nút "Thiết lập lại", nền xám */}

          <button onClick={updateProfile} className="px-4 py-2 bg-red-500 text-white rounded">
            Lưu
          </button>
          {/* Nút "Lưu", nền đỏ, chữ trắng */}
        </div>
      </div>
    </div>
  );
}
