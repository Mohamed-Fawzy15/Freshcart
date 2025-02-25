import { useEffect } from "react";
import styles from "./Address.module.css";
import toast from "react-hot-toast";
import { MdAddLocationAlt, MdLocationOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, removeAddress } from "../../Redux/Address/AddressSlice";
import Loader from "../Loader/Loader";

export default function Address() {
  const dispatch = useDispatch();
  const { allAddress, isLoading } = useSelector((state) => state.address);
  const navigate = useNavigate();
  console.log(allAddress.data);

  useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const handleRemoveAddress = async (id) => {
    await dispatch(removeAddress(id));
    toast.success("Address deleted successfully", {
      style: { fontWeight: 600 },
    });
  };

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="capitalize text-3xl font-bold my-5 flex gap-5 items-center justify-center">
          <p>User Address</p>
        </h2>

        {isLoading ? (
          <Loader />
        ) : allAddress.data?.length > 0 ? (
          allAddress.data.map((add) => (
            <div key={add._id} className="p-4 border-b-2">
              <ul>
                <li>
                  <span className="text-xl font-medium">Name: </span>
                  {add.name}
                </li>
                <li>
                  <span className="text-xl font-medium">Details: </span>
                  {add.details}
                </li>
                <li>
                  <span className="text-xl font-medium">Phone: </span>
                  {add.phone}
                </li>
                <li>
                  <span className="text-xl font-medium">City: </span>
                  {add.city}
                </li>
              </ul>
              <button
                className={styles.noSelect}
                onClick={() => handleRemoveAddress(add._id)}
              >
                <span className={styles.text}>Delete</span>
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
