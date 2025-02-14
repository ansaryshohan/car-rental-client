import { Link } from "react-router-dom";
import loginImgBg1 from "../assets/login-img1.jpg";
import loginImg from "../assets/loginImg.webp";
import RegisterForm from "../components/Login&Register/RegisterForm";
import SocialLogin from "../components/Login&Register/SocialLogin";

const RegisterPage = () => {
  return (
    <div
      style={{
        background:
          "linear-gradient(to right, #ab9d90 0%,#d6c9c0 22%,#d6c9c0 80%,#d6c9c0 80%,#ab9d90 100%)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
      className="pt-[17vh] min-h-[80vh] pb-10 bg-black text-white"
    >
      <div className="w-full lg:w-11/12 mx-auto flex justify-center items-center gap-8 min-h-screen bg-gray-800 text-white rounded-2xl">
        <div className="hidden md:block w-1/2 relative">
          <div className="w-full flex justify-center items-center px-8">
            <img src={loginImgBg1} alt="" className="h-[60vh] border clipImg" />
            <img src={loginImgBg1} alt="" className="h-[60vh] border clipImg" />
          </div>
          <div className="absolute w-full left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <img
              src={loginImg}
              alt=""
              className="rounded-xl w-full lg:w-10/12"
            />
          </div>
        </div>
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl">
          <h1 className="text-4xl font-bold text-center mb-4">Register</h1>
          <RegisterForm />
          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            <p className="px-3 text-sm ">Sign Up with social accounts</p>
            <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          </div>
          <SocialLogin />
          <p className="text-xs text-center sm:px-6 ">
            Already have an account?
            <Link
              rel="noopener noreferrer"
              to={"/login"}
              className="underline text-gray-50 ml-2"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
