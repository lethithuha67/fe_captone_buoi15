import axios from 'axios';
import { message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function MyImages() {
    const [listImg, setListImg] = useState([])
    const user = JSON.parse(localStorage.getItem('DATA_USER'));
    const navigate = useNavigate()

    const payload = async() => {
        const formData = {
            user_id: user.user.user_id
        }
        try {
            const result = await axios.post(`/image/listImgUser`, {
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = result.data;
            setListImg(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error('Fetch error:', error);
            message.error('Failed to fetch images.');
        }
    };

    const deleteImage = async (image_id,public_id) => {
        const formData = {
            image_id: image_id,
            public_id: public_id
        };
        try {
            const result = await fetch(`/image/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            message.success('Image deleted successfully.');
            payload();
        } catch (error) {
            console.error('Error deleting image:', error);
            message.error('Error deleting image.');
        }
    };

    useEffect(() => {
        if (!user) {
            message.warning("Please login first!");
            navigate("/authform");
            return;
        }
        payload();
    }, []);

  return (
    <div className='min-h-screen'>
        <div className="flex flex-wrap h-fit container mx-auto max-w-6xl gap-2 p-4">
            {listImg && listImg.map((item) => (
                <div key={item.public_id} className="flex flex-col w-60 rounded shadow-md overflow-hidden">
                    <img src={item.url} alt={item.alt} className="object-cover h-72" />
                    <div className='flex flex-col gap-1 p-2 w-full h-auto relative'>
                        <h3 className='text-lg font-semibold'>{item.title}</h3>
                        <p className='text-base'>{item.description}</p>
                        <button className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded' 
                        onClick={() => deleteImage(item.image_id, item.public_id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
