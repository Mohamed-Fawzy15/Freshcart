import { useContext, useEffect } from "react";
import { ApiContext } from "../../Context/APi/ApiContext";

export default function Address() {
  const { getUserAddress } = useContext(ApiContext);

  const getData = async () => {
    const data = await getUserAddress();
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>Address</div>;
}
