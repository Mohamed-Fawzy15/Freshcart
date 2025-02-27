import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaShoppingCart, FaStar } from "react-icons/fa";
// import { useParams } from "react-router-dom";
import Slider from "react-slick";
import toast from "react-hot-toast";
import Loader from "../../Component/Loader/Loader";
import styles from "./ProductDetails.module.css";
import { useDispatch } from "react-redux";
import { getSpecificProduct } from "../../Redux/Products/ProductsSlice";
import { addToCart } from "../../Redux/Cart/CartSlice";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../Redux/Wishlist/WishlistSlice";
import MainBtn from "../../Component/MainBtn/MainBtn";

export default function ProductDetails({ productId }) {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false); // for heart icon

  // const { productId } = useParams();

  const dispatch = useDispatch();

  const getProductDetails = async () => {
    setIsLoading(true);
    await dispatch(getSpecificProduct(productId))
      .then((res) => {
        setDetails(res.payload.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleAddToCart = async () => {
    await dispatch(addToCart(productId))
      .then((res) => {
        console.log(res);

        if (res.payload.status === "success") {
          console.log(res);

          toast.success(res.payload.message, {
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
      })
      .catch((err) => console.log(err));
  };

  const fetchWishlist = async () => {
    await dispatch(getWishlist())
      .then((res) => {
        setIsWishlisted(res.payload.some((item) => item.id === productId));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchWishlist();
  }, [productId]);

  // Toggle wishlist
  const toggleWishlist = async () => {
    setLoading(true);
    try {
      if (isWishlisted) {
        // Remove from wishlist
        await dispatch(removeFromWishlist(productId))
          .unwrap()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        toast.success("Product removed from wishlist", {
          style: {
            fontWeight: 600,
          },
        });
        setIsWishlisted(false);
      } else {
        // Add to wishlist
        await dispatch(addToWishlist(productId))
          .unwrap()
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
        toast.success("Product added to wishlist", {
          style: {
            fontWeight: 600,
          },
        });
        setIsWishlisted(true);
      }
      await dispatch(getWishlist()).then((res) =>
        setIsWishlisted(res.data.some((item) => item.id == productId))
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      {!isLoading ? (
        <div className="row my-14 items-center">
          <Helmet>
            <title>{details.title}</title>
          </Helmet>

          <div className="w-1/3">
            <Slider {...settings}>
              {details.images?.map((img, i) => (
                <div key={i}>
                  <img src={img} className="w-full" alt="product image" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-2/3 px-10 py-4">
            <div className="inner">
              <p className="text-green-500 font-semibold mb-2">
                {details.category?.name}
              </p>
              <h2 className="font-bold text-2xl dark:text-white">
                {details.title}
              </h2>

              <div className="flex items-center my-2">
                <FaStar className="text-yellow-300 mx-2" />
                <span className="dark:text-white">
                  {details.ratingsAverage}
                </span>
              </div>
              <div className="font-semibold dark:text-white">
                {details.price}EGP
              </div>

              <p className="text-gray-700 text-md my-4 dark:text-white">
                {details.description}
              </p>

              <div className="p-2 pt-0 flex justify-between">
                <MainBtn
                  text={"Add to Cart"}
                  onClick={() => handleAddToCart(productId)}
                  icon={FaShoppingCart}
                />
                <div
                  onClick={toggleWishlist}
                  className={styles.heartContainer}
                  title="Like"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isWishlisted}
                        readOnly
                      />
                      <div className={styles.svgContainer}>
                        <svg
                          viewBox="0 0 24 24"
                          className={`${styles.svgOutline} ${
                            isWishlisted ? "hidden" : ""
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg
                          viewBox="0 0 24 24"
                          className={`${styles.svgFilled} ${
                            isWishlisted ? "" : "hidden"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg
                          className={styles.svgCelebrate}
                          width={100}
                          height={100}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polygon points="10,10 20,20" />
                          <polygon points="10,50 20,50" />
                          <polygon points="20,80 30,70" />
                          <polygon points="90,10 80,20" />
                          <polygon points="90,50 80,50" />
                          <polygon points="80,80 70,70" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <hr />

              <div className="grid grid-cols-2">
                <ul>
                  <li className="my-5">
                    <p className="text-md font-semibold text-slate-600 dark:text-white">
                      Availability:
                    </p>
                  </li>
                  <li className="my-5">
                    <p className="text-md font-semibold text-slate-600 dark:text-white">
                      Brand:
                    </p>
                  </li>
                </ul>
                <ul>
                  <li className="my-5">
                    <p className="text-md font-semibold text-slate-600">
                      {details.quantity ? (
                        <p className="text-green-500">In Stock</p>
                      ) : (
                        <p className="text-red-600">Out Of Stock</p>
                      )}
                    </p>
                  </li>
                  <li className="my-5">
                    <p className="text-md font-semibold text-slate-600 dark:text-white">
                      {details.brand?.name}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
