import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const product = productData.find((i) => i.name.toLowerCase() === productName.toLowerCase());
    setData(product);
  }, [productName]);


  return (
    <>
    <Header />
    <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
      {data ? (
        <ProductDetails data={data} />
      ) : (
        <p className="text-center text-lg">Product not found</p>
      )}
    </div>
    <Footer />
  </>
  );
};

export default ProductDetailsPage;
