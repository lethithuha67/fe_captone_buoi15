import React from "react";

export default function Details() {
  return (
    <div className="container mx-auto flex flex-row">
      <div className="w-1/2 ">
        <img
          src="https://res.cloudinary.com/dmd3qqgum/image/upload/v1733669263/web-design_vbrroq.png"
          alt=""
        />
      </div>

      <div className="w-1/2 py-4 px-4">
        <h3>Threadless.com</h3>
        <h2 className="px-4 py-4">digsy</h2>
        <p className="px-4 py-4">
          Shop graphic tees, artwork,iphone cases,and more designed by the
          worldwide
        </p>

        <div className="w-full flex flex-row py-4 px-4">
          <img
            className="w-14 h-14 rounded-full"
            src="https://res.cloudinary.com/dmd3qqgum/image/upload/v1733669263/web-design_vbrroq.png"
            alt=""
          />
          <div className="flex flex-col">
            <h3 className=" ">Threadless</h3>
            <p>172,5k người theo dõi</p>
          </div>
        </div>

        <div>
          <h3 className="px-4 py-4">3 nhận xét</h3>
          <div className="w-full flex flex-row px-4 py-4">
            <div className="flex flex-row ">
              <img
                className="w-14 h-14 rounded-full"
                src="https://res.cloudinary.com/dmd3qqgum/image/upload/v1733669263/web-design_vbrroq.png"
                alt=""
              />
              <p>
                bypts7 amazing, where can I contact you If I want to buy a
                design?
              </p>
              <p>y</p>
            </div>
          </div>

          <div className="flex flex-row py-4 px-4">
            <img
              className="w-14 h-14 rounded-full"
              src="https://res.cloudinary.com/dmd3qqgum/image/upload/v1733669263/web-design_vbrroq.png"
              alt=""
            />
            <input
              className="rounded-xl p-1 border w-full "
              type="text"
              placeholder="Thêm bình luận"
            ></input>
            <button className="bg-blue-400 text-white px-4 rounded-lg ">
              Bình luận{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
