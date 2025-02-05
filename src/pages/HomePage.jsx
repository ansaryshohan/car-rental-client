import HomeBanner from "../components/homePageComp/HomeBanner";
import OurServicesSection from "../components/homePageComp/OurServicesSection";
import RecentCarSection from "../components/homePageComp/RecentCarSection";
import SaveMoneyBannerSection from "../components/homePageComp/SaveMoneyBannerSection";
const HomePage = () => {
  return (
    <div className="">
      <HomeBanner />
      <OurServicesSection />
      <RecentCarSection />
      <SaveMoneyBannerSection/>
    </div>
  );
};

export default HomePage;
