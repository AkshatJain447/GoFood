import { IoIosArrowDown } from "react-icons/io";
import { IoBagHandleOutline } from "react-icons/io5";
import { CiSearch, CiUser, CiHeart } from "react-icons/ci";
import { FaArrowRight } from "react-icons/fa6";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect, useState } from "react";

const WindowNavbar = () => {
  return (
    <>
      <ul className="flex gap-4 items-center cursor-pointer">
        <li className="flex gap-1 items-center">
          Home <IoIosArrowDown />
        </li>
        <li className="flex gap-1 items-center">
          Groceries <IoIosArrowDown />
        </li>
        <li className="flex gap-1 items-center">
          Pages <IoIosArrowDown />
        </li>
      </ul>
      <ul className="flex gap-2 items-center text-white">
        <li className=" mr-2 lg:mr-16 flex gap-1 items-center">
          Connect with us <FaArrowRight />
        </li>
        <li className="p-3 blurBg backdrop-blur-sm rounded-full cursor-pointer">
          <CiSearch />
        </li>
        <li className="p-3 blurBg backdrop-blur-sm rounded-full cursor-pointer">
          <CiUser />
        </li>
        <li className="p-3 blurBg backdrop-blur-sm rounded-full cursor-pointer">
          <CiHeart />
          <p className="text-[10px] absolute z-[15] bg-orange-400 px-[5px] rounded-full right-0 -top-[5px]">
            2
          </p>
        </li>
        <li className="p-3 blurBg backdrop-blur-sm rounded-full cursor-pointer">
          <IoBagHandleOutline />
          <p className="text-[10px] absolute z-[15] bg-orange-400 px-[5px] rounded-full right-0 -top-[5px]">
            0
          </p>
        </li>
      </ul>
    </>
  );
};

const Navbar = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="font-sans flex mt-4 justify-between items-center mx-4 lg:mx-16">
      <h1 className="text-xl tracking-wide">
        GO <span className="font-bold">FOOD</span>
      </h1>
      {windowWidth > 700 ? (
        <WindowNavbar />
      ) : (
        <RxHamburgerMenu className="text-2xl" />
      )}
    </div>
  );
};

export default Navbar;
