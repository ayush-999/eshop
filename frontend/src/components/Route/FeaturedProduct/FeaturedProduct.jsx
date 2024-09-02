import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./featuredProduct.css";
import { productData } from "../../../static/data";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";

const FeaturedProduct = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstSix = d.slice(0, 6);
    setData(firstSix);
  }, []);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6" id="featuredProduct">
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-bold text-base">Featured Product</h1>
        </div>
        <div className="grid grid-cols-12 gap-3">
          {data &&
            data.map((item) => (
              <div className="col-span-2 featuredProduct-wrapper" key={item.id}>
                <div className="w-full h-[280px]">
                  <ProductCard data={item} onOpenDetails={handleOpenDetails} />
                </div>
              </div>
            ))}
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailsCard
          data={selectedProduct}
          setOpen={handleCloseDetails}
        />
      )}
    </>
  );
};

export default FeaturedProduct;
