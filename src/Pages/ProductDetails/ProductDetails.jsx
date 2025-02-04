import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const [details, setDetails] = useState({});
  const { productId } = useParams();
  const { addToCart, setNumOfCartItems } = useContext(CartContext);

  const getProductDetails = async () => {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setDetails(res.data.data))
      .catch((err) => console.log(err));
  };

  const handleAddToCart = async () => {
    let res = await addToCart(productId);
    setNumOfCartItems(res.numOfCartItems);

    if (res.status === "success") {
      toast.success(res.message, {
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
    getProductDetails();
  }, []);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={details.images[i + 1]}
            className="w-full"
            alt={details.title}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div className="row my-14 items-center">
      <Helmet>
        <title>{details.title}</title>
      </Helmet>
      <div className="w-1/4">
        <Slider {...settings}>
          {details.images?.map((img, i) => (
            <div key={i}>
              <img src={img} className="w-full" alt="product image" />
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-3/4 px-10 py-4">
        <div className="inner">
          <h2 className="font-bold text-2xl">{details.title}</h2>
          <p className="text-gray-700 text-md my-4">{details.description}</p>
          <p className="text-green-500 font-semibold">
            {details.category?.name}
          </p>
          <div className="flex justify-between mt-1">
            <div>{details.price}EGP</div>
            <div className="flex items-center">
              <FaStar className="text-yellow-300 mx-2" />
              <span>{details.ratingsAverage}</span>
            </div>
          </div>
          <button className="btn-main" onClick={() => handleAddToCart()}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
