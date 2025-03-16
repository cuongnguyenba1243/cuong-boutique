import ProductGrid from "../components/Products/ProductGrid";
import icons from "../utilities/icon";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortProduct from "../components/Products/SortProduct";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../store/slice/productsSlice";

const { FaFilter } = icons;

const Collections = () => {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(fetchProductsByFilter({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center border p-2 lg:hidden"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white transition-transform duration-300 lg:static lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <FilterSidebar />
      </div>

      {/* All collection */}
      <div className="flex-grow p-4">
        <h2 className="mb-4 text-2xl font-medium uppercase">All Collection</h2>
        <SortProduct />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};
export default Collections;
