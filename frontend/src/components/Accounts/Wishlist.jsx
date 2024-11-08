import { useEffect, useState } from "react";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import "./Accounts.css";

const Wishlist = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFour = d.slice(0, 4);
    setData(firstFour);
  }, []);

  const pName = data[0]?.name || "";
  const product_name = pName.toLowerCase().replace(/\s+/g, "-");

  const truncateText = (text, maxWords = 30, maxChars = 100) => {
    if (!text) return "";
    const wordsArray = text.split(" ");
    const truncatedByWords =
      wordsArray.length > maxWords
        ? wordsArray.slice(0, maxWords).join(" ") + "... "
        : text;

    const truncatedByChars =
      truncatedByWords.length > maxChars
        ? truncatedByWords.slice(0, maxChars) + "... "
        : truncatedByWords;

    return truncatedByChars;
  };

  const handleDelete = (addressId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this item to your wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4a51e1",
      cancelButtonColor: "#e5042f",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAddress(addressId);
      }
    });
  };

  return (
    <>
      <div className="wishlist-wrapper">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="flex justify-start items-center mb-5">
              <h1 className="text-lg font-medium">My Wishlist (14)</h1>
            </div>
            <div className="wishlist-card-wrap rounded-lg border border-dashed border-primary-200">
              {data.map((item, index) => (
                <div
                  key={index}
                  className="wishlist-card border-b border-dashed last:border-b-0 border-primary-200 relative"
                >
                  <div className="wishlist-card-item p-4 grid grid-cols-12 gap-3">
                    <div className="col-span-2">
                      <Link to={`/product/${product_name}`}>
                        <img
                          src={item.image_Url[0]?.url}
                          alt={item.name}
                          className="wishlist-image"
                        />
                      </Link>
                    </div>
                    <div className="col-span-10">
                      <Link to={`/product/${product_name}`}>
                        <h1 className="text-[16px] font-semibold mb-2">
                          {truncateText(item.name)}
                        </h1>
                      </Link>
                      <div className="flex items-center justify-start gap-2 mb-3">
                        <div className="wishlist-rating flex items-center justify-start gap-1">
                          <FaStar />
                          <p className="font-medium">{item.rating}</p>
                        </div>
                        <p className="text-[#878787] text-xs font-normal">
                          105098 Ratings, 21052 Reviews
                        </p>
                      </div>
                      <div className="flex items-baseline justify-start gap-3">
                        <div className="wishlist-price-wrap">
                          <h5 className="wishlist-discount_price">
                            <span className="mr-1">₹</span>
                            {item.price === 0
                              ? item.price
                              : item.discount_price}
                          </h5>
                          {item.price && item.price !== item.discount_price && (
                            <h5 className="wishlist-price">
                              (<span className="mr-0">₹</span>
                              {item.price})
                            </h5>
                          )}
                        </div>
                        <div className="wishlist-discount">
                          <p>
                            <span className="mr-1">70%</span>
                            off
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="wishlist-delete">
                    <AiOutlineDelete className="text-gray-500 hover:text-error-700" onClick={() => handleDelete(item.id)}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
