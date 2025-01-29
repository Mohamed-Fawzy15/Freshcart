import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProductDetails() {
  const { productId } = useParams();
  const getProductDetails = async () => {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return <div>ProductDetails</div>;
}
