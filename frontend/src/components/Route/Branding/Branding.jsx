import { brandingData } from "../../../static/data";

const Branding = () => {
  return (
    <>
      <div className="hidden sm:block">
        <div
          className={`branding mb-6 flex justify-between w-full shadow-xs bg-white p-5 rounded-lg`}
        >
          {brandingData &&
            brandingData.map((data, index) => (
              <div className="flex items-center justify-between" key={index}>
                {data.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">
                    {data.title}
                  </h3>
                  <p className="text-[10px] md:text-sm">{data.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Branding;
