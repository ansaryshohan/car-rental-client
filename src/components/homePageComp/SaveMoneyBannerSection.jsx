import { TfiHeadphoneAlt } from "react-icons/tfi";
import bannerImg from "../../assets/secondbackground-img-01.jpg";

const SaveMoneyBannerSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bannerImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
      className="min-h-[80vh] relative"
    >
      <div className="absolute bottom-[30%] left-0 pl-20 w-full px-8 flex flex-col items-start justify-end">
        <h3 className="text-3xl md:text-5xl font-medium tracking-wider leading-14 text-white mb-3">
          Save Money With <br />
          Our Rental
        </h3>
        <div className="flex justify-start items-center gap-2 text-xl font-medium text-white">
          <TfiHeadphoneAlt color="#ffffff" size={25} />
          <p>Phone: (012) 345 6789 0123</p>
        </div>
      </div>
    </div>
  );
};

export default SaveMoneyBannerSection;
