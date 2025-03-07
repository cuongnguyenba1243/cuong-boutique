import ProductGrid from "../components/Products/ProductGrid";

const products = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-damier-classic-denim-jacket--HSA41WGRT650_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-damier-denim-skate-pants--HSD48WGRT650_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-damier-denim-trucker-jacket--HSA72WJ16MU1_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-denim-shorts--HTD52WPCP65L_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-denim-trucker-jacket--HSA45WPCP65L_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-short-sleeved-denim-shirt--HSS50WPCL65L_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-monogram-jacquard-denim-jacket--HRA79WUZD609_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 100,
    images: [
      {
        url: "https://hk.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-damoflage-classic-denim-jacket--HQA76WGCO900_PM2_Front%20view.png?wid=490&hei=490",
      },
    ],
  },
];

const Collections = () => {
  return (
    <div className="flex flex-col px-8 py-12 lg:flex-row">
      {/* All collections */}
      <ProductGrid products={products} />
    </div>
  );
};
export default Collections;
