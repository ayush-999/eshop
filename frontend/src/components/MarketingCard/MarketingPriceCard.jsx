import "./Marketing.css";
const MarketingPriceCard = () => {
  return (
    <div className="bg-primary-100 p-3 rounded-lg shadow-sm flex justify-between items-center">
      <div className="marketing-img-wrap flex flex-col justify-center items-center w-40">
        <img
          src="/assets/img/marketing/cod_new.png"
          className="marketing-img-d"
        />
        <div className="marketing-img-t">
          <span className="text-xs font-semibold">Cash on Delivery</span>
        </div>
      </div>
      <div className="marketing-img-wrap flex flex-col justify-center items-center w-60 border-l border-r border-primary-200">
        <img
          src="/assets/img/marketing/lowest_price_new.png"
          className="marketing-img-d"
        />
        <div className="marketing-img-t">
          <span className="text-xs font-semibold">Lowest Price</span>
        </div>
      </div>
      <div className="marketing-img-wrap flex flex-col justify-center items-center w-40">
        <img
          src="/assets/img/marketing/return_new.png"
          className="marketing-img-d"
        />
        <div className="marketing-img-t">
          <span className="text-xs font-semibold">7-day Returns</span>
        </div>
      </div>
    </div>
  );
};

export default MarketingPriceCard;
