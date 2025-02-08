import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FaUserCheck } from "react-icons/fa";
import { GiCrossedBones } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logoImg from "../../assets/logo.png";
import userDemoImg from "../../assets/user_demo.jpg";
import { useAuthContext } from "../../hooks/useAuthContext";

const Header = () => {
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [hamBurgerMenu, setHamBurgerMenu] = useState(false);
  const [bgColorChange, setBgColorChange] = useState(false);
  const { user, logOut, setUser } = useAuthContext();
  const navigate = useNavigate();

  // background color change on scrolling
  const handleStickyNav = () => {
    if (window.scrollY >= 150) {
      setBgColorChange(true);
    } else {
      setBgColorChange(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNav);
    return () => window.removeEventListener("scroll", handleStickyNav);
  }, [bgColorChange]);

  const handleLogOutOnClick = () => {
    setLoginDropdown(false);
    logOut()
      .then(() => {
        toast.success("logged Out Successful");
        setUser(null);
        navigate("/login");
        return;
      })
      .catch(() => toast.error("error in logged out"));
  };

  return (
    <div
      className={`${
        bgColorChange ? "bg-black" : "bg-transparent"
      } fixed top-0 w-full z-[99]`}
    >
      <div className="w-full md:w-11/12 mx-auto flex justify-between items-center gap-6 h-[13vh]  md:h-[17vh]">
        {/* logo image */}
        <div className="w-6/12 md:w-4/12 lg:w-3/12 h-[13vh]">
          <img
            src={logoImg}
            alt=""
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>
        {/* menu items div */}
        <div
          className={`${
            hamBurgerMenu ? "absolute z-50 top-0 right-0" : "hidden"
          } lg:static lg:block lg:flex-1 w-[70vw] lg:w-auto h-[100vh] lg:h-[8vh] lg:px-5`}
        >
          <div
            className={`${
              hamBurgerMenu ? "absolute z-[60]  top-4 right-4" : "hidden"
            } `}
          >
            <GiCrossedBones
              size={25}
              color="#FF3600"
              onClick={() => setHamBurgerMenu((prev) => !prev)}
            />
          </div>
          <ul className=" flex flex-col justify-start items-start pt-20 lg:pt-0 lg:flex-row lg:justify-around lg:items-center gap-4 h-full bg-slate-100 text-black lg:rounded-4xl">
            <li
              className="w-full lg:h-full text-center capitalize hover:text-primary-orange duration-200"
              onClick={() => setHamBurgerMenu(false)}
            >
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `w-full h-full flex items-center justify-center rounded-4xl text-lg hover:bg-black/10 ${
                    isActive ? "active" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li
              className="w-full lg:h-full text-center capitalize hover:text-primary-orange duration-200"
              onClick={() => setHamBurgerMenu(false)}
            >
              <NavLink
                to="/all-cars"
                className={({ isActive }) =>
                  `w-full h-full flex items-center justify-center rounded-4xl text-lg hover:bg-black/10 ${
                    isActive ? "active" : ""
                  }`
                }
              >
                All Cars
              </NavLink>
            </li>
            <li
              className="w-full lg:h-full text-center capitalize hover:text-primary-orange duration-200"
              onClick={() => setHamBurgerMenu(false)}
            >
              <NavLink
                to="/about-us"
                className={({ isActive }) =>
                  `w-full h-full flex items-center justify-center rounded-4xl text-lg hover:bg-black/10 ${
                    isActive ? "active" : ""
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
            <li
              className="w-full lg:h-full text-center capitalize hover:text-primary-orange duration-200"
              onClick={() => setHamBurgerMenu(false)}
            >
              <NavLink
                to="/contact-us"
                className={({ isActive }) =>
                  `w-full h-full flex items-center justify-center rounded-4xl hover:bg-black/10 text-lg ${
                    isActive ? "active" : ""
                  }`
                }
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>
        <div className=" h-[13vh] flex items-center justify-between gap-4">
          {user?.email ? (
            <>
              {/* profile dropdown */}
              <div className="relative ml-4 flex-shrink-0">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setLoginDropdown((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    {user?.photoURL ? (
                      <img
                        className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 rounded-full object-center object-cover"
                        src={user?.photoURL}
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 rounded-full"
                        src={userDemoImg}
                        alt=""
                      />
                    )}
                  </button>
                </div>
                {/* dropdown menu */}
                <div
                  className={`absolute right-0 top-[100%] z-10 mt-2 w-48 origin-top-right rounded-md text-white bg-primary-orange py-1 shadow-lg ring-focus:outline-none ${
                    loginDropdown ? "" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  {/*  Active: "bg-gray-100", Not Active: ""  */}
                  <Link
                    to={"/profile"}
                    className="block w-full px-4 py-4 text-base text-white hover:bg-black/20"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                    onClick={() => setLoginDropdown(false)}
                  >
                    <span className="flex items-center gap-2">
                      <span className="block ">
                        <FaUserCheck size={18} />
                      </span>
                      <span className="block text-center"> Your Profile</span>
                    </span>
                  </Link>
                  <button
                    className="block w-full px-4 pt-1 pb-4 text-base text-white hover:bg-black/20"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={handleLogOutOnClick}
                  >
                    <span className="flex items-center gap-2">
                      <span className="block">
                        <BiLogOut size={18} />
                      </span>
                      <span className="block text-center"> Sign out</span>
                    </span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* signIn signUp buttons div */}
              <div className="flex items-center justify-between gap-1 ">
                {/* signUp button */}
                <div
                  className={`${
                    bgColorChange ? "text-white" : "text-slate-100"
                  } hidden lg:block h-[8vh] rounded-xl border border-white bg-transparent  hover:text-white duration-200`}
                >
                  <button className="w-full h-full text-center capitalize">
                    <Link
                      to="/register"
                      className={`w-full h-full px-3 flex items-center justify-center font-semibold text-sm`}
                    >
                      Sign Up
                    </Link>
                  </button>
                </div>
                {/* signIn button */}
                <div className=" h-[8vh] rounded-xl bg-slate-100 text-black hover:bg-white/60 hover:text-primary-orange duration-200">
                  <button className="w-full h-full text-center capitalize">
                    <Link
                      to="/login"
                      className={`w-full h-full px-3 flex items-center justify-center font-semibold text-sm`}
                    >
                      Sign In
                    </Link>
                  </button>
                </div>
              </div>
            </>
          )}
          {/* hamburger three line icon */}
          <div className="lg:hidden">
            <IoMenu
              size={30}
              color="#FF3600"
              onClick={() => setHamBurgerMenu((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
