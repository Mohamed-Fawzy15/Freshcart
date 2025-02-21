import { useContext, useEffect } from "react";
import { ApiContext } from "../../Context/APi/ApiContext";

export default function Orders() {
  const { getOrder } = useContext(ApiContext);

  const getData = async () => {
    const data = await getOrder();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Orders</div>;
}
