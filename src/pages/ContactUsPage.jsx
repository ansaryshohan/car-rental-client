import Title from "../components/shared/Title";

const ContactUsPage = () => {
  return (
    <div className="">
      <Title title={"Contact-US | Caravan"} />

      <div
        className="relative w-full min-h-screen pb-10 pt-[17vh]"
        style={{
          background:
            "linear-gradient(to right, #ab9d90 0%,#d6c9c0 22%,#d6c9c0 80%,#d6c9c0 80%,#ab9d90 100%)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative w-full h-full md:w-11/12 top-0 left-[50%] translate-x-[-50%] z-10 text-white ">
        </div>
      </div>
    </div>
  )
}

export default ContactUsPage