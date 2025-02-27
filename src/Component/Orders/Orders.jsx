import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../Redux/Orders/OrderSlice";
import Loader from "../Loader/Loader";

export default function Orders() {
  const orders = useSelector((state) => state.orders.allOrders);
  const isLoading = useSelector((state) => state.orders.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Count
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Paid
                </th>
                <th scope="col" className="px-6 py-3">
                  Delivered
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.cartItems[0]?.product?.title}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {order.cartItems[0]?.count}
                  </td>
                  <td className="px-6 py-4">
                    {order.cartItems[0]?.product?.category?.name}
                  </td>
                  <td className="px-6 py-4">{order.cartItems[0]?.price}LE</td>
                  <td className="px-6 py-4 text-center">
                    <p
                      className={`p-2 font-bold text-white rounded-lg ${
                        order.isPaid ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {order.isPaid ? "True" : "False"}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p
                      className={`p-2 font-bold text-white rounded-lg ${
                        order.isDelivered ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {order.isDelivered ? "True" : "False"}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
