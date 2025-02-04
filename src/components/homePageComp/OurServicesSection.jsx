import SectionHeader from "../shared/SectionHeader";
import OurServiceCard from "./OurServiceCard";
import { GiCarillon, GiCartwheel, GiKeyCard, GiPoliceCar } from "react-icons/gi";

const OurServicesSection = () => {
  const servicesData = [
    {
      id: 1,
      icon: <GiCartwheel size={20} color="#ffffff"/>,
      title: "Car Rental with Driver",
      description:
        "Enjoy a hassle-free ride with our professional drivers, ensuring a comfortable and safe journey.",
    },
    {
      id: 2,
      icon: <GiKeyCard size={20} color="#ffffff"/>,
      title: "Business Car Rental",
      description:
        "Upgrade your business travel with our premium car rental service, tailored for professionals.",
    },
    {
      id: 3,
      icon: <GiPoliceCar size={20} color="#ffffff"/>,
      title: "Luxury Car Rental",
      description:
        "Experience high-end comfort and style with our exclusive luxury car rental options.",
    },
    {
      id: 4,
      icon: <GiCarillon size={20} color="#ffffff"/>,
      title: "Easy Transportation Service",
      description:
        "Quick and convenient transportation solutions to get you where you need to be, stress-free.",
    },
  ];

  return (
    <div className="bg-black py-10">
      <div className="w-11/12 mx-auto rounded-3xl bg-gray-background p-8">
        <SectionHeader
          colorTitle={"Services"}
          title={"Our"}
          subHeading={"Explore our wide range of rental services"}
        />
        {/* our services cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5  py-6">
        {
          servicesData.map(singleService=><OurServiceCard key={singleService.id} serviceData={singleService}/>)
        }
        </div>
      </div>
    </div>
  );
};

export default OurServicesSection;
