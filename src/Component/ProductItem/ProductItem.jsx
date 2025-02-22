import { useContext, useEffect, useState } from "react";
// import { CiHeart } from "react-icons/ci";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import SpringModel from "../SpringModel/SpringModel";
import styles from "./ProductItem.module.css";
import { motion } from "framer-motion";

import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/APi/WishlistContext";

export default function ProductItem({ product, handleAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToWishlist, removeWishList, setWishlistItem, getWishList } =
    useContext(WishlistContext);

  const fetchWishlist = async () => {
    try {
      const response = await getWishList();
      if (response?.data) {
        setIsWishlisted(response.data.some((item) => item.id === product.id));
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [product.id]);

  const toggleWishlist = async () => {
    setLoading(true); // Start loading
    try {
      if (isWishlisted) {
        await removeWishList(product.id);
        toast.error("Failed to add product to wishlist", {
          style: {
            fontWeight: 600,
          },
        });
      } else {
        await addToWishlist(product.id);
        toast.success("Product add successfully to wishlist", {
          style: {
            fontWeight: 600,
          },
        });
      }

      // Refresh wishlist from API
      const response = await getWishList();
      if (response?.data) {
        setWishlistItem(response.data.length); // Update global wishlist count
        setIsWishlisted(response.data.some((item) => item.id === product.id));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="group/product p-5 border border-transparent rounded-md relative "
    >
      <div>
        <div className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <div className="cursor-pointer " onClick={() => setIsOpen(true)}>
            <div className="relative mx-4 -mt-6 overflow-hidden rounded-xl bg-clip-border text-white shadow-lg shadow-green-gray-500/40 ">
              <motion.img
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 1 }}
                src={product.imageCover}
                className="w-full bg-center"
                alt={product.title}
              />
            </div>
            <div className="p-6">
              <small className="text-green-600">{product.category?.name}</small>

              <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {product.title.split(" ").slice(0, 3).join(" ")}
              </h5>
              <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased ">
                <div className="flex justify-between">
                  <div className="font-semibold">{product.price}EGP</div>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-300 mx-1" />{" "}
                    <span>{product.ratingsAverage}</span>
                  </div>
                </div>
              </p>
            </div>
          </div>

          <div className="p-6 pt-0 flex justify-between">
            <button
              className="CartBtn"
              onClick={() => handleAddToCart(product.id)}
            >
              <span className="IconContainer">
                <FaShoppingCart className="text-white text-lg me-2" />
              </span>
              <p className="text">Add to Cart</p>
            </button>

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
        </div>
      </div>

      <SpringModel
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        productId={product.id}
      />
    </motion.div>
  );
}
