import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import EditModal from "../EditModal/Editmodal";

export default function Account() {
  const [isOpen, setIsOpen] = useState(false);

  // const userEmail = useSelector((state) => state.auth.user.email);
  // const userName = useSelector((state) => state.auth.userName);

  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user ? user.name : "";
  const userEmail = user ? user.email : "";

  return (
    <div className="container py-5">
      <h2 className="capitalize text-3xl font-bold my-5 flex gap-5 items-center justify-center ">
        <div className="header"></div>
        <p className="dark:text-white"> user Info</p>
      </h2>
      <div>
        <h3 className="text-xl font-semibold dark:text-white">Name:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3 dark:text-white">
          {userName}
        </h4>
      </div>
      <hr />
      <div className="py-5">
        <h3 className="text-xl font-semibold dark:text-white">Phone:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3 dark:text-white">
          01*********
        </h4>
      </div>
      <hr />
      <div>
        <h3 className="text-xl font-semibold dark:text-white">Email:</h3>
        <h4 className="text-md font-semibold text-gray-600 p-3 dark:text-white">
          {userEmail}
        </h4>
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
