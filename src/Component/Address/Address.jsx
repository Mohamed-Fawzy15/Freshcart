import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Context/APi/ApiContext";
import styles from "./Address.module.css";
import { div } from "motion/react-client";
import toast from "react-hot-toast";
import { MdAddLocationAlt, MdLocationOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const [address, setAddress] = useState([]);
  const { getUserAddress, removeAddress } = useContext(ApiContext);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await getUserAddress();
    if (data.status === "success") {
      setAddress(data.data);
    }
  };

  const handleRemoveAddress = async (id) => {
    const data = await removeAddress(id);
    if (data.status === "success") {
      setAddress(data.data);
      toast.success(data.message, {
        style: {
          fontWeight: 600,
        },
      });
    } else {
      toast.error("Something went wrong", {
        style: {
          fontWeight: 600,
        },
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="capitalize text-3xl font-bold my-5 flex gap-5 items-center justify-center ">
          <div className="header"></div>
          <p> user address</p>
        </h2>
        {address.length > 0 ? (
          address.map((add) => (
            <div key={add._id} className="p-4 border-b-2">
              <ul>
                <li>
                  <span className="text-xl font-medium">Name: </span>
                  <p className="font-semibold inline">{add.name}</p>
                </li>
                <li>
                  <span className="text-xl font-medium">Details: </span>
                  <p className="font-semibold inline">{add.details}</p>
                </li>
                <li>
                  <span className="text-xl font-medium">phone: </span>
                  <p className="font-semibold inline">{add.phone}</p>
                </li>
                <li>
                  <span className="text-xl font-medium">city: </span>
                  <p className="font-semibold inline">{add.city}</p>
                </li>
              </ul>
              <button
                className={styles.noSelect}
                onClick={() => handleRemoveAddress(add._id)}
              >
                <span className={styles.text}>Delete</span>
                <span className={styles.icon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                  </svg>
                </span>
              </button>
            </div>
          ))
        ) : (
          <div className="container flex flex-col items-center justify-center gap-4">
            <h3 className="font-semibold">
              You have not saved any address yet.
            </h3>
            <MdLocationOff className="text-green-600 text-9xl" />
            <button className="CartBtn" onClick={() => navigate("/settings")}>
              <span className="IconContainer">
                <MdAddLocationAlt className="text-white text-lg me-2" />
              </span>
              <p className="text">Add Address</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
