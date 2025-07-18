import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
  });
  const categories = ["Top Wear", "Bottom Wear", "Accessory", "Sneaker"];
  const genders = ["Men", "Women"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["Red", "Blue", "Black", "Green", "Yellow", "White"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
    });
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.append(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.append(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="w-[180px] p-4">
      <h3 className="mb-4 text-xl font-medium text-gray-800">Filter</h3>

      {/* Category filter */}
      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-600">Category</label>
        {categories.map((category) => (
          <div key={category} className="mb-1 flex items-center">
            <input
              type="radio"
              value={category}
              onChange={handleFilterChange}
              name="category"
              checked={filters.category === category}
              className="mr-2 h-4 w-4 cursor-pointer border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender filter */}
      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-600">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="mb-1 flex items-center">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-2 h-4 w-4 cursor-pointer border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color filter */}
      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-600">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className={`h-8 w-8 cursor-pointer rounded-full border border-gray-300 transition hover:scale-105 ${filters.color === color ? "ring-2" : "ring-blue-500"}`}
              style={{ backgroundColor: color.toLocaleLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size filter */}
      <div className="mb-6">
        <label className="mb-2 block font-medium text-gray-600">Size</label>
        {sizes.map((size) => (
          <div key={size} className="mb-1 flex items-center">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-2 h-4 w-4 cursor-pointer border-gray-300 text-blue-500 focus:ring-blue-400"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FilterSidebar;
