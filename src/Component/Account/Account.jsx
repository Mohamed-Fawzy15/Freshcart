import { useContext, useState } from "react";
// import { tokenContext } from "../../Context/Token/TokenContext";

import { ApiContext } from "../../Context/APi/ApiContext";
import { FaRegEdit } from "react-icons/fa";
import EditModal from "../EditModal/Editmodal";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);
  const { userEmail, userName } = useContext(ApiContext);

  return (
    <div className="container py-5">
      <h2 className="capitalize text-3xl font-bold my-5 flex gap-5 items-center justify-center ">
        <div className="header"></div>
        <p> user Info</p>
      </h2>
      <div>
        <h3 className="text-xl font-semibold">Name:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3">{userName}</h4>
      </div>
      <hr />
      <div className="py-5">
        <h3 className="text-xl font-semibold">Phone:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3">01*********</h4>
      </div>
      <hr />
      <div>
        <h3 className="text-xl font-semibold">Email:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3">{userEmail}</h4>
      </div>

      <button className="CartBtn" onClick={() => setIsOpen(true)}>
        <span className="IconContainer">
          <FaRegEdit className="text-white text-lg me-2" />
        </span>
        <p className="text">Edit</p>
      </button>

      <EditModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
