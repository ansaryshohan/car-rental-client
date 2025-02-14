import gearIcon from "../../assets/gear-stick-icon.png";
import bgImage from "../../assets/page-header-bg.jpg";

const PageHeader = ({ titleText }) => {
  return (
    <div
      className="text-center w-full rounded-t-2xl h-[40vh]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full h-full bg-black/50 py-8 rounded-t-2xl flex flex-col justify-center items-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 uppercase bg-gradient-to-r from-black/60 to-transparent px-10">
          {titleText}
        </h2>
        {/* Line with Icon */}
        <div className="relative flex items-center justify-center py-4">
          <div className="w-3/12 sm:w-32 h-[2px] bg-dull-text"></div>
          <div className="absolute w-12 h-12 rounded-full flex justify-center items-center">
            <img
              src={gearIcon}
              alt="icon"
              className="w-10 h-10 rounded-full object-cover bg-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
