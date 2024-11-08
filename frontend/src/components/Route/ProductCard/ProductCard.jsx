/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { RiEyeLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { GoHeart, GoHeartFill } from "react-icons/go";
import "./productCard.css";

const ProductCard = ({ data, onOpenDetails }) => {
  const [click, setClick] = useState(false);

  const pName = data.name;
  const product_name = pName.toLowerCase().replace(/\s+/g, "-");
  const sName = data.shop.name;
  const shop_name = sName.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      <div className="w-full h-full p-2 border border-dashed border-primary-200 rounded-lg cursor-pointer">
        <div className="pcard-image-wrapper">
          <div className="pcard-left">
            <div className="pcard-rating-wrap">
              <div className="pcard-rating-icon flex items-center justify-between gap-1">
                <p className="pcard-rating-text font-bold">{data.rating}</p>
                <FaStar className="text-primary-500" />
                <div className="rating-separator ml-1 mr-1"></div>
                <p className="pcard-total-rating font-bold">4.2k</p>
              </div>
            </div>
          </div>
          <div className="pcard-right">
            {click ? (
              <GoHeartFill
                className="pcard-icon"
                onClick={() => setClick(!click)}
                color={click ? "#dc2626" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <GoHeart
                className="pcard-icon"
                onClick={() => setClick(!click)}
                color={click ? "#dc2626" : "#333"}
                title="Add to wishlist"
              />
            )}
            <RiEyeLine
              className="pcard-icon"
              onClick={() => onOpenDetails(data)}
              color="#333"
              title="Quick view"
            />
            <FiShoppingCart
              className="pcard-icon"
              color="#333"
              title="Add to cart"
            />
          </div>
          <div className="pcard-img-wrap">
            <Link to={`/product/${product_name}`}>
              <img
                src={data.image_Url[0]?.url}
                alt={data.name}
                className="pcard-image"
                />
            </Link>
          </div>
        </div>
        <Link to={`/product/${shop_name}`}>
          <span className="truncate-text block w-full pcard-shopName">
            {data.shop.name}
          </span>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h3 className="truncate-text block w-full pcard-name">{data.name}</h3>
          <div className="flex items-baseline justify-between">
            <div className="pcard-price-wrap">
              <h5 className="pcard-discount_price">
                <span className="mr-1">₹</span>
                {data.price === 0 ? data.price : data.discount_price}
              </h5>
              {data.price && data.price !== data.discount_price && (
                <h5 className="pcard-price">
                  (<span className="mr-0">
                    ₹
                  </span>
                  {data.price})
                </h5>
              )}
            </div>
            <div className="pcard-discount">
              <p>
                <span className="mr-1">
                  70%
                </span>
                off
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
