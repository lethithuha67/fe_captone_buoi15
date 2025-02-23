import { useState } from "react";
import {
  Upload,
  Link,
  Bell,
  MessageSquare,
  ChevronDown,
  Search,
} from "lucide-react";

function AddImages() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSave = () => {
    if (selectedFile) {
      alert("Ảnh đã được lưu!");
    } else {
      alert("Vui lòng chọn một ảnh trước khi lưu.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "auto",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      {/* Thanh trên đầu */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "10px 0",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "bold" }}>Trang chủ</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Tạo (chỉ là văn bản) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Tạo <ChevronDown size={16} />
          </div>

          {/* Ô tìm kiếm */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              padding: "8px",
              borderRadius: "20px",
              width: "200px",
            }}
          >
            <Search size={16} color="#555" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                marginLeft: "5px",
                flex: 1,
              }}
            />
          </div>

          {/* Thông báo & Tin nhắn */}
          <Bell size={22} color="#555" style={{ cursor: "pointer" }} />
          <MessageSquare size={22} color="#555" style={{ cursor: "pointer" }} />
        </div>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Cột trái: Ảnh tải lên + nút lưu */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "2px dashed gray",
              padding: "20px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "400px",
              width: "100%",
              borderRadius: "10px",
              backgroundColor: "#fafafa",
            }}
          >
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <label
              htmlFor="fileInput"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Upload size={40} color="gray" />
              <p style={{ color: "#777", fontSize: "14px" }}>
                Kéo và thả hoặc nhấp vào để tải lên
              </p>
            </label>
            <p style={{ fontSize: "12px", color: "#999" }}>
              Bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước dưới
              20MB
            </p>
            {selectedFile && (
              <p style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
                Ảnh đã chọn: {selectedFile.name}
              </p>
            )}
          </div>

          {/* Nút lưu từ trang (Nằm dưới ảnh) */}
          <button
            onClick={handleSave}
            style={{
              backgroundColor: "#E60023",
              color: "white",
              padding: "12px 20px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "5px",
              fontWeight: "bold",
              width: "100%",
              marginTop: "15px",
            }}
          >
            Lưu từ trang
          </button>
        </div>

        {/* Cột phải: Nội dung, avatar, mô tả, liên kết */}
        <div style={{ flex: 1 }}>
          {/* Tiêu đề */}
          <h2 style={{ color: "#333", marginBottom: "10px" }}>Tạo tiêu đề</h2>
          <hr style={{ border: "0.5px solid #ddd", marginBottom: "15px" }} />

          {/* Avatar + Tên */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              S
            </div>
            <span
              style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}
            >
              Sang Nguyễn
            </span>
          </div>

          {/* Ô nhập mô tả */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Cho mọi người biết Ghim của bạn giới thiệu điều gì"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Ô nhập văn bản thay thế */}
          <div style={{ marginBottom: "15px" }}>
            <input
              type="text"
              placeholder="Thêm văn bản thay thế"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />
          </div>

          {/* Ô nhập liên kết */}
          <div style={{ marginBottom: "15px" }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#555",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Link size={18} color="#555" /> Thêm một số liên kết đến
            </p>
            <input
              type="text"
              placeholder="Nhập URL liên kết"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
                marginTop: "5px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddImages;
