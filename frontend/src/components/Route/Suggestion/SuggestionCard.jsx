import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productData } from "../../../static/data";
import "./suggestionCard.css";

const SuggestionCard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFour = d.slice(0, 4);
    setData(firstFour);
  }, []);

  return (
    <div className="grid grid-cols-12 gap-3">
      {data &&
        data.map((item, index) => {
          const product_name = item.name.toLowerCase().replace(/\s+/g, "-");
          return (
            <div className="col-span-6" key={index}>
              <div className="w-full h-full p-2 border border-gray-200 rounded-lg cursor-pointer">
                <div className="suggested-img-wrap mb-2 mx-auto">
                  <Link to={`/product/${product_name}`}>
                    <img
                      src={item.image_Url[0]?.url}
                      alt={item.name}
                      className="suggested-img"
                    />
                  </Link>
                </div>
                <div className="suggested-title-wrap mb-2">
                  <p className="suggested-title truncate-text font-medium">
                    <Link to={`/product/${product_name}`}>{item.name}</Link>
                  </p>
                  <div className="suggested-discount-wrap">
                    <h3 className="suggested-discount-text">21% off</h3>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SuggestionCard;
