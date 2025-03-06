import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://balenciaga.dam.kering.com/m/26ba75c7836c064c/Small-828163T41498065_X.jpg?v=2",
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
          url: "https://balenciaga.dam.kering.com/m/320cdd8c44a867b7/Small-830855TSS021000_X.jpg?v=2",
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
          url: "https://balenciaga.dam.kering.com/m/79a8025ba2023f2b/Small-831697TSW651963_X.jpg?v=1",
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
          url: "https://balenciaga.dam.kering.com/m/365c9f0a72d9dec5/Small-831713TSW671441_X.jpg?v=1",
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
          url: "https://balenciaga.dam.kering.com/m/67e3426bd12ab0cf/Small-831697TSW671441_X.jpg?v=1",
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
          url: "https://balenciaga.dam.kering.com/m/4bc39cb03854c31f/Small-831298TMT031000_X.jpg?v=1",
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
          url: "https://balenciaga.dam.kering.com/m/7dbad903b2d0b374/Small-831516TQP079966_X.jpg?v=1",
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
          url: "https://balenciaga.dam.kering.com/m/17f305c18e6b34f0/Small-831550TMT321000_X.jpg?v=1",
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
        <h2 className="mb-4 text-3xl font-bold">Explore New Arrivals</h2>
        <p className="mb-12 text-lg text-gray-600">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll buttons */}
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

      {/* Scrollable content */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        ref={scrollRef}
        className={`container relative mx-auto flex space-x-6 overflow-x-scroll scroll-smooth ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
      >
        {newArrivals.map((product) => (
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
export default NewArrivals;
