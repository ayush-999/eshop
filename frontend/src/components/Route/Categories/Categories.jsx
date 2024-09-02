import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-lg my-6 shadow-sm" id="categories">
      <div className="grid grid-cols-1 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 gap-[2px]">
        {categoriesData &&
          categoriesData.map((data) => {
            const handleSubmit = (data) => {
              navigate(`/products?category=${data.title}`);
            };
            return (
                <div
                  className="w-full text-center flex items-center justify-start flex-col gap-2 cursor-pointer overflow-hidden"
                  key={data.id}
                  onClick={() => handleSubmit(data)}
                >
                  <img
                    src={data.image_Url}
                    className="w-16 h-16 object-cover rounded-full"
                    alt=""
                  />
                  <h5 className={`text-[13px] font-bold`}>{data.title}</h5>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default Categories;
