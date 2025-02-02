import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductItem({ product, handleAddToCart }) {
  return (
    <div className="group/product inner product p-1 border border-transparent rounded-md relative ">
      <Link to={`/productdetails/${product._id}`}>
        <img src={product.imageCover} className="w-full " alt="" />
        <small className="text-green-600">{product.category?.name}</small>
        <h5 className="font-semibold mb-2 line-clamp-1">
          {product.title.split(" ").slice(0, 3).join(" ")}
        </h5>
        <div className="flex justify-between">
          <div>{product.price}EGP</div>
          <div className="flex items-center">
            <FaStar className="text-yellow-300 mx-1" />{" "}
            <span>{product.ratingsAverage}</span>
          </div>
        </div>
      </Link>
      <div>
        <CiHeart className="favorite " />
      </div>
      <button
        className="btn-main capitalize"
        onClick={() => handleAddToCart(product.id)}
      >
        add to cart
      </button>
    </div>
  );
}
