import Navbar from "../Navbar/Navbar";
import heroBg from "../../assets/heroImage.png";
import leaf from "../../assets/Leaf.png";
import kiwi from "../../assets/kiwi.jpg";
import { FaArrowRight, FaPlus } from "react-icons/fa6";
import "./Hero.css";
import { useParallax } from "react-scroll-parallax";
import { useEffect, useState } from "react";

const CountUpAnimation = ({ initialValue, targetValue, text }) => {
  const [count, setCount] = useState(initialValue);
  const duration = 1500;

  useEffect(() => {
    let startValue = initialValue;
    const interval = Math.floor(duration / (targetValue - initialValue));

    const counter = setInterval(() => {
      startValue += 1;
      setCount(startValue);
      if (startValue >= targetValue) {
        clearInterval(counter);
      }
    }, interval);

    return () => {
      clearInterval(counter);
    };
  }, [targetValue, initialValue]);

  return (
    <p>
      <span className="lg:text-2xl flex gap-1 items-center">
        {count}k <FaPlus className=" font-light lg:text-xl" />
      </span>
      {text}
    </p>
  );
};

const Hero = () => {
  const heroRef = useParallax({ speed: -8 });
  const leafRef1 = useParallax({ rotate: [180, 0] });
  const leafRef2 = useParallax({ rotate: [95, 360] });

  return (
    <div>
      <div className="bg-secondary absolute h-[90vh] md:h-[65vh] lg:h-[90vh] w-full md:w-[65%] top-0 left-0 -z-10"></div>
      <div className="md:bg-primary absolute h-[90vh] md:h-[65vh] lg:h-[90vh] w-full md:w-[45%] top-0 right-0 -z-10"></div>
      <Navbar />
      <div
        ref={heroRef.ref}
        className=" flex flex-col md:flex-row justify-evenly items-center mx-2 md:mx-4 lg:mx-10 mt-16"
      >
        <div className="md:w-[35vw]">
          <h3 className="font-sans font-semibold md:text-lg lg:text-xl">
            Discount up to 20%
          </h3>
          <h1 className=" font-extrabold text-3xl lg:text-5xl">
            Buy Fresh And Organic Grocery Food
            <img
              src={kiwi}
              alt="kiwi"
              className="h-10 ml-2 w-36 rounded-full inline"
            />
          </h1>
          <p className="my-10 text-sm lg:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa,
            repellendus eaque harum magni perspiciatis possimus ad vero sint
            aut!
          </p>
          <div className="flex justify-between items-center">
            <button className="flex justify-center items-center gap-2 bg-primary p-2 px-4 lg:p-3 lg:px-6 text-white rounded-full">
              SHOP NOW <FaArrowRight />
            </button>
            <CountUpAnimation initialValue={0} targetValue={35} text="Users" />
            <CountUpAnimation
              initialValue={0}
              targetValue={18}
              text="Products"
            />
          </div>
        </div>
        <div className="flex items-end mt-6 md:mt-auto md:-mr-20">
          <img
            src={heroBg}
            alt="Hero Image"
            className=" h-[300px] lg:h-[450px]"
          />
          <img
            ref={leafRef1.ref}
            src={leaf}
            alt="leaf"
            className="h-0 lg:h-[100px] relative -left-16 "
          />
          <img
            ref={leafRef2.ref}
            src={leaf}
            alt="leaf"
            className="h-0 lg:h-[100px] relative top-2 -left-[150px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
