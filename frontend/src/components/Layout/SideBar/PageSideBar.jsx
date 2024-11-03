/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { productData } from "../../../static/data";

const PageSideBar = ({ onApplyFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // Load productData and extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(productData.map((item) => item.category))];
    setCategories(uniqueCategories);
  }, []);

  // Price range slider values
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(1000);

  const handleMinChange = (e) => setMinValue(Number(e.target.value));
  const handleMaxChange = (e) => setMaxValue(Number(e.target.value));

  const handleSliderChange = (e) => setMaxValue(Number(e.target.value));

  const handleApply = () => {
    onApplyFilter(selectedCategories, { minValue, maxValue });
  };

  const [activeId, setActiveId] = useState(0);

  const togglerFunction = (index) => {
    if (activeId === index) {
      setActiveId(null);
    } else {
      setActiveId(index);
    }
  };

  // Accordion data including the dynamic price range slider
  let accordionData = [
    {
      title: "Category",
      item: "", // Placeholder for dynamic categories
    },
    {
      title: "Price", // Fixed title for Price slider
      item: "", // Placeholder for the price slider content
    },
    {
      title: "Rating",
      item: "Some other content for Item-3",
    },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="PageSideBar-title-wrapper">
        <h1 className="font-bold text-base mb-1 PageSideBar-title">Filters</h1>
        <p className="font-semibold text-xs mb-3 text-[#8b8ba3] PageSideBar-subtitle">
          1000+ Products
        </p>
      </div>
      <div className="PageSideBar-item-wrapper">
        {accordionData.map((item, i) => (
          <div key={i} className="border-b last:border-b-0 mb-2">
            <div
              className={`px-2 py-3 flex items-center justify-between transition-all ${
                activeId === i ? "bg-primary-600 text-white rounded-lg" : ""
              }`}
              onClick={() => togglerFunction(i)}
            >
              <h1 className="flex-1 font-semibold text-sm">{item.title}</h1>
              {activeId === i ? <GoChevronUp /> : <GoChevronDown />}
            </div>
            {activeId === i && (
              <div className="px-2 py-3">
                {item.title === "Category" ? (
                  categories.map((category, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <input
                        id={`category-checkbox-${index}`}
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={() => setSelectedCategories(prev => 
                          prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
                        )}
                        className="w-3 h-3 border border-gray-300 rounded accent-primary-600"
                      />
                      <label
                        htmlFor={`category-checkbox-${index}`}
                        className="ms-2 font-normal text-sm"
                      >
                        {category}
                      </label>
                    </div>
                  ))
                ) : item.title === "Price" ? (
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="font-normal text-sm"><span className="font-semibold">Min: ₹ {minValue}</span></label>
                      <label className="font-normal text-sm"><span className="font-semibold">Max: ₹ {maxValue}</span></label>
                    </div>
                    <div className="flex items-center mb-2">
                      <input
                        type="text"
                        value={minValue}
                        onChange={handleMinChange}
                        className="w-20 p-1 border rounded text-sm"
                        min=""
                        max=""
                      />
                      <span className="mx-2">to</span>
                      <input
                        type="text"
                        value={maxValue}
                        onChange={handleMaxChange}
                        className="w-20 p-1 border rounded text-sm"
                        min=""
                        max=""
                      />
                    </div>
                    <input
                      type="range"
                      name="max"
                      min="0"
                      max="1000"
                      step="100"
                      value={maxValue}
                      onChange={handleSliderChange}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <div className="px-2 py-3 flex items-center justify-start">
                    <p
                      className="ms-2 font-normal text-sm"
                    >
                      {item.item}
                    </p>
                  </div>
                )}
                {selectedCategories.length > 0 && (
                  <div className="w-full flex items-center justify-end">
                    <button
                      className="text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:bg-primary-600 font-normal rounded-lg text-xs px-3 py-1.5"
                      onClick={handleApply}
                    >
                      Apply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageSideBar;
