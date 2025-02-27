import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Loader from "../../Component/Loader/Loader";
import ProductItem from "../../Component/ProductItem/ProductItem";
import { useDispatch } from "react-redux";
import { getProducts } from "../../Redux/Products/ProductsSlice";
import { getCategories } from "../../Redux/Categories/CategoriesSlice";
import { addToCart } from "../../Redux/Cart/CartSlice";
import { getBrands } from "../../Redux/Brands/BrandsSlice";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBrand, setSelectedBrand] = useState("all");

  const dispatch = useDispatch();

  const productData = async () => {
    setLoading(true);
    await dispatch(getProducts())
      .then((res) => {
        setProducts(res.payload.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const categoriesData = async () => {
    await dispatch(getCategories())
      .then((res) => {
        setCategories(res.payload.data);
      })
      .catch((err) => console.log(err));
  };

  const brandsData = async () => {
    await dispatch(getBrands())
      .then((res) => {
        setBrands(res.payload.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = async (id) => {
    dispatch(addToCart(id))
      .then((res) => {
        if (res.payload.status === "success") {
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
    <div className="dark:bg-[#111827]">
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container ">
        <div className="flex flex-col md:flex-row justify-between items-end gap-4 py-4">
          <div className="w-full md:w-1/4">
            <p className="font-semibold dark:text-white">Sort by Category</p>
            <select
              name="categorySort"
              id="categorySort"
              className="rounded-lg mt-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
          <div className="relative flex items-center rounded-3xl w-full md:2/4">
            <FaSearch className="inline absolute left-2 text-green-500" />
            <input
              type="text"
              placeholder="Search By Product Name or Brand"
              className="input-style bg-white w-full pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-1/4">
            <p className="font-semibold dark:text-white">Sort by Brand</p>
            <select
              name="brandSort"
              id="brandSort"
              className="rounded-lg mt-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
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
        <div className="container mt-10">
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
