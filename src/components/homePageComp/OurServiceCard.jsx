const OurServiceCard = ({ serviceData }) => {
  const { icon, title, description } = serviceData;
  return (
    <div className="pr-4 pl-8 py-6 bg-black text-white rounded-2xl flex flex-col gap-3 hover:bg-primary-orange hover:text-white hover:duration-700 hover:transition-colors service-card">
      <p className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        {icon}
      </p>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-base font-medium text-dull-text">{description}</p>
    </div>
  );
};

export default OurServiceCard;
