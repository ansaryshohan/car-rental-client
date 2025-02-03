import carBgImg from "../../assets/carBg.jpg" 

const HomeBanner = () => {
  return (
    <div
      className="pt-[17vh] min-h-[105vh] relative pb-40"
      style={{
        backgroundImage: `url(${carBgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute w-full top-[27vh] left-0 flex items-center justify-center">
        <h1 className="font-bebas text-5xl sm:text-7xl font-semibold text-center tracking-widest px-4">
          Rent Your Dream Car
        </h1>
      </div>

      <div className="absolute w-full bottom-12 lg:bottom-9 left-0 flex items-center justify-center">
        <button className="px-12 py-3 rounded-4xl border border-primary-orange bg-transparent text-primary-orange text-lg font-bold hover:bg-primary-orange hover:text-white hover:transition-all hover:duration-500 hover:scale-x-[85%]">
          {" "}
          Discover Cars
        </button>
      </div>
    </div>
  );
};

export default HomeBanner;
