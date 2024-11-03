import { useEffect, useState } from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import PageSideBar from "../components/Layout/SideBar/PageSideBar";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import ProductDetailsCard from "../models/ProductDetailsCard/ProductDetailsCard";
const BestDealsPage = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setData(productData);
  }, []);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const handleApplyFilter = (selectedCategories) => {
    if (selectedCategories.length > 0) {
      const filteredData = productData.filter((product) =>
        selectedCategories.includes(product.category)
      );
      setData(filteredData);
    } else {
      setData(productData); // Reset to all products if no category is selected
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-3 sideBar-wrapper">
            <PageSideBar onApplyFilter={handleApplyFilter} />
          </div>
          <div className="col-span-9 dealsPage-wrapper">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h1 className="font-bold text-base">Best Deals</h1>
              </div>
              <div className="grid grid-cols-12 gap-3">
                {data.map((item) => (
                  <div className="col-span-3 bestDeals-wrapper" key={item.id}>
                    <div className="w-full h-[280px]">
                      <ProductCard
                        data={item}
                        onOpenDetails={handleOpenDetails}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedProduct && (
        <ProductDetailsCard
          data={selectedProduct}
          setOpen={handleCloseDetails}
        />
      )}
      <Footer />
    </>
  );
};

export default BestDealsPage;
