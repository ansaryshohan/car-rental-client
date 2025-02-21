import HomeBanner from "../components/homePageComp/HomeBanner";
import OurServicesSection from "../components/homePageComp/OurServicesSection";
import RecentCarSection from "../components/homePageComp/RecentCarSection";
import SaveMoneyBannerSection from "../components/homePageComp/SaveMoneyBannerSection";
import Title from "../components/shared/Title";
const HomePage = () => {
  return (
    <div className="">
      <Title title={"HomePage | Caravan"}/>
      <HomeBanner />
      <OurServicesSection />
      <RecentCarSection />
      <SaveMoneyBannerSection />
    </div>
  );
};

export default HomePage;
