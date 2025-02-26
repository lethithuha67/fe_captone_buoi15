import { useEffect, useState } from "react";
import {
  Upload,
  Bell,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function AddImages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataImg, setDataImg] = useState({
    url: "",
    title: "",
    description: "",
    public_id: ""
  })
  const user = JSON.parse(localStorage.getItem('DATA_USER'));

  if (!user || !user.user) {
    window.location.href = "/authform";
    message.warning("Please login first!");
    return;
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Hàm xử lý thay đổi dữ liệu trong form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataImg((prev) => ({ ...prev, [name]: value }));
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
        dataImg.url = data.data.secure_url
        dataImg.public_id = data.data.public_id
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Error uploading image');
      return null;
    }
  }

  const handleSave = async() => {
    if (!selectedFile) {
      message.warning("Please select an image first!");
      return;
    }

    await uploadAvatar(selectedFile)

    const formImg = {
      url: dataImg.url,
      title: dataImg.title,
      description: dataImg.description,
      public_id: dataImg.public_id,
      user_id: user.user.user_id
    }
    try {
      const result = await fetch(`/image/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formImg)
      });
      const data = await result.json();
      message.success('Image uploaded successfully');
        clearForm();
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Error uploading image');
    }
  };

  const removeImg = () => {
    setSelectedFile(null);
  };
  const clearForm = () => {
    setSelectedFile(null);
    setDataImg({
      url: "",
      public_id: "",
      title: "",
      description: "",
    })
  }

  useEffect(() => {
  }, []);

  return (
    <div className="font-sans max-w-3xl h-full mx-auto bg-white p-5 rounded-lg">
      {/* Thanh trên đầu */}
      <div className="flex justify-between items-center mb-5 pb-2 border-b border-gray-300">
        <h2 className="text-lg font-bold">Trang chủ</h2>
        <div className="flex items-center gap-4">
          {/* Tạo (chỉ là văn bản) */}
          <div className="flex items-center gap-1 font-bold cursor-pointer">
            Tạo <ChevronDown size={16} />
          </div>

          {/* Ô tìm kiếm */}
          <div className="flex items-center bg-gray-200 p-2 rounded-full w-52">
            <Search size={16} color="#555" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="border-none outline-none bg-transparent ml-1 flex-1"
            />
          </div>

          {/* Thông báo & Tin nhắn */}
          <Bell size={22} color="#555" className="cursor-pointer" />
          <MessageSquare size={22} color="#555" className="cursor-pointer" />
        </div>
      </div>

      <div className="flex gap-5">
        {/* Cột trái: Ảnh tải lên + nút lưu */}
        <div className="flex-1 flex flex-col items-center">
          <div className={`border-2 border-dashed border-gray-600 cursor-pointer flex flex-col items-center justify-center h-96 max-w-2xl rounded-lg bg-gray-100 ${selectedFile ? "hidden" : ""}`}>
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className={`hidden ${selectedFile ? "hidden" : ""}`}
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              className={`flex flex-col items-center ${selectedFile ? "hidden" : ""}`}
            >
              <Upload size={40} color="gray" />
              <p className={`text-gray-600 text-sm p-2 ${selectedFile ? "hidden" : ""}`}>
                Kéo và thả hoặc nhấp vào để tải lên
              </p>
            </label>
            <p className={`text-gray-400 text-xs p-2 ${selectedFile ? "hidden" : ""}`}>
              Bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước dưới
              20MB
            </p>
          </div>
          {selectedFile && (
              <div className="flex flex-col h-96 w-full items-center relative">
                <img src={URL.createObjectURL(selectedFile)} alt="" className="h-full w-full object-cover mt-2" />
                <button
                  onClick={removeImg}
                  className="bg-red-600 text-white py-1 px-3 rounded-md mt-2 absolute top-2 right-2"
                >
                  Xóa ảnh
                </button>
              </div>
            )}

          {/* Nút lưu từ trang (Nằm dưới ảnh) */}
          <button
            onClick={handleSave}
            className="bg-red-600 text-white py-3 px-5 border-none cursor-pointer text-lg rounded-md font-bold w-full mt-4"
          >
            Lưu
          </button>
        </div>

        {/* Cột phải: Nội dung, avatar, mô tả, liên kết */}
        <div className="flex-1">
          {/* Tiêu đề */}
          <h2 className="text-gray-800 mb-2">Tạo tiêu đề</h2>
          <hr className="border-0.5 border-gray-300 mb-4" />

          {/* Avatar + Tên */}
          <div className="flex justify-stretch items-center gap-2 mb-4 w-full">
            <img src={user.user.avatar} alt="User Avatar" className="w-12 h-12 object-cover rounded-full" />
            <span className="text-lg text-wrap font-bold text-gray-800">
              {user.user.full_name}
            </span>
          </div>

          {/* Ô nhập mô tả */}
          <div className="mb-4">
            <input
              type="text"
              name="title"
              value={dataImg.title}
              onChange={handleChange}
              placeholder="Tiêu Đề Hình ảnh"
              className="w-full p-2 rounded-md border border-gray-300 outline-none"
            />
          </div>

          {/* Ô nhập văn bản thay thế */}
          <div className="mb-4">
            <input
              type="text"
              name="description"
              value={dataImg.description}
              onChange={handleChange}
              placeholder="Thêm văn bản thay thế"
              className="w-full p-2 rounded-md border border-gray-300 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImages;
