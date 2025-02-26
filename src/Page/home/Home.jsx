import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

export default function Home() {
  const [dataImg, setListImg] = useState([]);
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

useEffect(() => {},[dataImg])

  useEffect(() => {
    payload();
  }, []);

  return <div className="min-h-screen w-full overflow-y-scroll py-8 bg-stone-100">
    <div className="container mx-auto max-w-6xl flex flex-wrap gap-3 px-3">
      {dataImg.map((item) => (
        <div key={item.image_id} className="w-auto max-w-xs h-fit bg-stone-50 rounded-lg shadow flex flex-col gap-3 pb-3 overflow-hidden hover:scale-110 transition duration-300 ease-in-out">
          <img src={item.url} alt={item.public_id} className="w-full h-auto object-contain" />
          <div className="w-full flex justify-center">
          <button className="p-2 text-white hover:text-stone-100 hover:bg-blue-400 rounded-full bg-blue-600 cursor-pointer" 
          onClick={() => navigate(`/details/${item.image_id}`)}>Xem chi tiết ảnh</button>
          </div>
        </div>
      ))}
    </div>
  </div>;
}
