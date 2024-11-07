import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import ProductDetails from "../components/Products/ProductDetails";
import { productData } from "../static/data";

const ProductDetailsPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  const productName  = name.replace(/-/g," ");

  useEffect(()=>{
    const data = productData.find((i) => i.name === productName);
    setData(data);
  },[])

  return (
    <>
      <Header />
      <div className="max-w-screen-xl mx-auto mt-10 md:mt-16 mb-6 sm:px-6 lg:px-0">
        <ProductDetails />
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
