import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../utilities/icon";

const { FiChevronLeft, FiChevronRight } = icons;

const BestSeller = () => {
  const bestSeller = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/510e5d833d6cf7e4/Small-817666TRS311000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/788c185542179f16/Small-805544TRS131000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/61ebb5cb0aef2dab/Small-817649TRP151000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/76b43ef162bc8692/Small-814379TQO101000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "5",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/72dc950ebfa02588/Small-823408TRWB49000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "6",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/b748af5c1f7ba84/Small-814227THW254245_Y.jpg?v=3",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/1c0fb166a3163fc3/Small-814394TPQ384140_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "8",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/46f09956b82f1250/Small-808928TKP031000_Y.jpg?v=1",
          altText: "Stylish Jacket",
        },
      ],
    },
  ];

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;

    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container relative mx-auto mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold">Explore Best Sellers</h2>
        <p className="mb-12 text-lg text-gray-600">
          Discover the best-selling styles straight off the runway, freshly
          added to keep your wardrobe on the cutting edge of fashion.
        </p>

        <div className="absolute bottom-[-30px] right-0 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`rounded border p-2 ${canScrollLeft ? "bg-white text-black" : "cursor-not-allowed bg-gray-200 text-gray-400"}`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`rounded border p-2 ${canScrollRight ? "bg-white text-black" : "cursor-not-allowed bg-gray-200 text-gray-400"}`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        ref={scrollRef}
        className={`container relative mx-auto flex space-x-6 overflow-x-scroll scroll-smooth ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {bestSeller.map((product) => (
          <div
            key={product._id}
            className="relative min-w-[100%] rounded-md border border-gray-200 shadow-md sm:min-w-[50%] lg:min-w-[30%]"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="h-[500px] w-full rounded-lg object-cover"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-zinc-600 bg-opacity-50 p-4 text-white backdrop-blur-md">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default BestSeller;
