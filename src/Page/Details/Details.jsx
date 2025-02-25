import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";

export default function Details() {
  const [detailImg, setDetailImg] = useState({});
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("DATA_USER"));
  const navigate = useNavigate();

  const payload = async () => {
    const formData = {
      user_id: user.user.user_id,
    };
    try {
        const result = await axios.post(`/image/listImgUser`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const data = result.data;
        const findImg = data.data.find((img) => img.image_id === id);
        setDetailImg(findImg);
    } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to fetch images.');
    }
};

  const commentsPayload = async() => {
    const formData = {
      image_id: id,
    };
    try {
        const result = await axios.post(`/image/list-comment`, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const data = result.data;
        setComments(data.data.reverse());
    } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to fetch comments.');
    }
  }

  const handleComment = async() => {
    const formData = {
        image_id: id,
        user_id: user.user.user_id,
        content: content
    };
    try {
        const result = await fetch(`/image/comment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });
        const data = await result.json();
        message.success("Comment success");
        commentsPayload();
        setContent("");
    } catch (error) {
        console.error('Fetch error:', error);
        message.error('Failed to comment.');
    }
  }

  useEffect(() => {

  }, [detailImg, comments]);

  useEffect(() => {
    if (!user) {
        message.warning("Please login first!");
        navigate("/authform");
        return;
    } else {
      payload();
      commentsPayload();
    }
}, []);

  return (
    <div className="container mx-auto flex flex-row m-4 rounded-lg shadow overflow-hidden">
      <div className="w-1/2 ">
        <img
          src={detailImg.url}
          alt={detailImg.alt}
          className="w-full h-96 object-cover"
        />
      </div>

      <div className="w-1/2 py-4 px-4">
        <h3 className="underline">Threadless.com</h3>
        <h2 className="py-1 uppercase text-2xl font-bold">{detailImg.title}</h2>
        <p className="px-2">
          {detailImg.description}
        </p>

        <div className="w-full flex flex-row gap-2 py-4 px-4">
          <img
            className="w-14 h-14 rounded-full"
            src={user.user.avatar}
            alt=""
          />
          <div className="flex flex-col">
            <h3 className=" ">{user.user.full_name}</h3>
            <p>172,5k người theo dõi</p>
          </div>
        </div>

        <div>
          <h3 className="px-4 py-4">{comments.length} nhận xét</h3>
          {comments.map((comment, index) => (
            <div key={index} className="w-full flex flex-row items-center px-4 py-4">
              <div className="flex flex-row gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src=""
                  alt=""
                />
                <p>{comment.content}</p>
              </div>
            </div>
          ))}

          <div className="flex flex-row py-4 px-4 w-full gap-2">
            <img
              className="w-14 h-14 rounded-full"
              src={user.user.avatar}
              alt=""
            />
            <input
              className="rounded-xl p-1 border w-fit "
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Thêm bình luận"
            ></input>
            <button onClick={handleComment} className="bg-blue-400 text-white px-4 rounded-lg ">
              Bình luận{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
