import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Import hook useState từ React để quản lý trạng thái của form

export default function ProfileEdit() {
  const navigate = useNavigate()
  const {id} = useParams()
  const [avatarUp, setAvatarUp] = useState(null);

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

  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const result = await fetch(`/image/avatar`, {
        method: "POST",
        body: formData
      });

      const data = await result.json();
      if (data.data.secure_url) {
        message.success('Avatar uploaded successfully');
        profile.avatar = data.data.secure_url
      } else {
        message.error('Failed to upload avatar');
        return null;
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      message.error('Error uploading avatar');
      return null;
    }
  }

  const updateProfile = async () => {
    await uploadAvatar(avatarUp)

    const formData = {
      user_id: id,
      email: profile.email,
      pass_word: profile.pass_word,
      full_name: profile.full_name,
      avatar: profile.avatar,
    }
    console.log(formData)
    try {
      const result = await fetch(`/user/create-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.tokens.accessToken}`
        },
        body: JSON.stringify(formData),
      })
      message.success('Update success')
    } catch (error) {
      message.error('Update failed')
    }
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

        <div className="flex flex-col items-center space-y-4 mb-4">
          <div className="relative">
            <img 
              src={profile.avatar || "https://via.placeholder.com/150"} 
              alt="avatar" 
              className="w-24 h-24 object-cover rounded-full border-2 border-gray-200"
            />
            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-stone-500 text-white p-2 rounded-full cursor-pointer hover:bg-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
            </label>
          </div>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                // Show preview immediately
                const reader = new FileReader();
                reader.onloadend = () => {
                  setProfile(prevProfile => ({ ...prevProfile, avatar: reader.result }));
                };
                reader.readAsDataURL(file);
              }
              setAvatarUp(file);
            }}
            className="hidden"
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
