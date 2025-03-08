import ProductGrid from "../components/Products/ProductGrid";
import icons from "../utilities/icon";
import { useState, useEffect, useRef } from "react";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortProduct from "../components/Products/SortProduct";

const { FaFilter } = icons;

const products = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/3a6498212429c958/Small-772972TOU021000_X.jpg?v=2",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/11effbc30bda20eb/Small-814409TKT281000_X.jpg?v=1",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/674d3a4fb4462692/Small-826344TSVW39012_X.jpg?v=1",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/74b19c49038a5d6d/Small-814149TRLC93001_X.jpg?v=2",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/db6cff7a2f1a5b8/Small-826344TSVV66303_X.jpg?v=1",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/690267f889b3849e/Small-831305TSVJ81083_X.jpg?v=1",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/419d449edc2b7c9/Small-831715TSW714011_X.jpg?v=1",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 100,
    images: [
      {
        url: "https://balenciaga.dam.kering.com/m/584353a0c2cae092/Small-831305TSVV95002_X.jpg?v=2",
      },
    ],
  },
];

const Collections = () => {
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <ProductGrid products={products} />
      </div>
    </div>
  );
};
export default Collections;
