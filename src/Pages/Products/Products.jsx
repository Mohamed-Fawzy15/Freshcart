import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext/CartContext";
import { useEffect } from "react";
import Loader from "../../Component/Loader/Loader";
import ProductItem from "../../Component/ProductItem/ProductItem";
import { ApiContext } from "../../Context/APi/ApiContext";
// import styles from "./Products.module.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const { addToCart, setNumOfCartItems } = useContext(CartContext);
  const { getProducts, getCategories, getBrands } = useContext(ApiContext);

  const productData = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data.data);
    setLoading(false);
  };

  const categoriesData = async () => {
    const data = await getCategories();
    console.log(data.data);

    setCategories(data.data);
  };

  const brandsData = async () => {
    const data = await getBrands();
    setBrands(data.data);
  };

  const handleAddToCart = async (id) => {
    let res = await addToCart(id);
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
    productData();
    categoriesData();
    brandsData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productCategory = product.category?.name.toLowerCase();
    const productBrand = product.brand?.name.toLowerCase();
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      (selectedCategory === "all" ||
        productCategory === selectedCategory.toLowerCase()) &&
      (selectedBrand === "all" || productBrand === selectedBrand.toLowerCase())
    );
  });

  return (
    <div>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container my-4">
        <div className="flex justify-between">
          <p>Sort by Category</p>

          <p>Sort by Brand</p>
        </div>
        <div className="flex justify-between ">
          <div>
            <select
              name="categorySort"
              id="categorySort"
              className="rounded-lg mt-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>

              {categories.length > 0 &&
                categories.map((category) => (
                  <option
                    value={category.name.toLowerCase()}
                    key={category._id}
                  >
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="relative flex items-center rounded-3xl w-1/2">
            <FaSearch className="inline absolute left-2 text-green-500" />
            <input
              type="text"
              placeholder="Search By Product Name or Brand"
              className="input-style bg-white w-full pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <select
              name="brandSort"
              id="brandSort"
              className="rounded-lg mt-2"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="all">All Brands</option>
              {brands.length > 0 &&
                brands.map((brand) => (
                  <option value={brand.name.toLowerCase()} key={brand._id}>
                    {brand.name}
                  </option>
                ))}
              <option value="Jack & Jones">Jack & Jones</option>
              <option value="Puma">Puma</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="container my-10">
          <div className="row mx-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 my-10"
                >
                  <ProductItem
                    product={product}
                    handleAddToCart={handleAddToCart}
                  />
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mx-auto">
                No products found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
