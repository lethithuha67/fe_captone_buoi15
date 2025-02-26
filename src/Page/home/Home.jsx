import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

export default function Home() {
  const [dataImg, setListImg] = useState([]);
  const user = JSON.parse(localStorage.getItem('DATA_USER'));
  const navigate = useNavigate();

  const payload = async() => {
    try {
        const result = await axios.get(`/image/data`);
        const data = result.data;
        if (Array.isArray(data.data.data)) {
            setListImg(data.data.data.reverse());
        } else {
            console.error('Expected an array but got:', data.data.data);
            message.error('Failed to fetch images.');
        }
    } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to fetch images.');
    }
};

  useEffect(() => {
    payload();
  }, []);

  return <div className="min-h-screen w-full py-8 bg-stone-100">
    <div className="container mx-auto max-w-6xl flex flex-wrap gap-3">
      {dataImg.map((item) => (
        <div key={item.image_id} className="w-40 rounded-lg shadow flex flex-col overflow-hidden">
          <img src={item.url} alt={item.public_id} className="w-full h-auto object-contain" />
          <p className="p-2 text-blue-400 cursor-pointer" onClick={() => navigate(`/details/${item.image_id}`)}>Xem chi tiết ảnh</p>
        </div>
      ))}
    </div>
  </div>;
}
