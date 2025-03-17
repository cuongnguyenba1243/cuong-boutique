import { useState } from "react";
import icons from "../../utilities/icon";
import path from "../../utilities/path";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProductsByFilter,
  setFilters,
} from "../../store/slice/productsSlice";

const { HiMagnifyingGlass, HiMiniXMark } = icons;

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    dispatch(fetchProductsByFilter({ search: searchValue }));
    dispatch(setFilters({ search: searchValue }));

    navigate(`${path.COLLECTIONS}/all?search=${searchValue}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`flex w-full items-center justify-center transition-all duration-300 ${isOpen ? "absolute left-0 top-0 z-50 h-24 w-full bg-white" : "w-auto"}`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex w-full items-center justify-center"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search"
              value={searchValue}
              className="w-full rounded-lg bg-gray-100 px-4 py-2 pr-12 placeholder:text-gray-700 focus:outline-none"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleSearchToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 transform text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;
