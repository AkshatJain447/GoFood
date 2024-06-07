import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

const list = [
  ["STARTER", "Starter"],
  ["MEAT AND SEAFOOD", "Seafood"],
  ["VEGETARIAN", "Vegetarian"],
  ["DESSERT", "Dessert"],
  ["SIDE", "Side"],
  ["MISCELLANEOUS", "Miscellaneous"],
];

const Card = ({ foodItem }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      className="flex items-center w-[95%] md:w-[45%]"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <img
        src={foodItem.strMealThumb}
        alt="thumbnail"
        className="h-32 rounded-full"
      />
      <div className="ml-4 w-full">
        <h3 className="flex justify-between text-xl border-b-2 border-dashed border-gray-400 pb-4">
          {foodItem.strMeal} <span className="text-primary">$8.45</span>
        </h3>
        <p className="text-xs flex justify-between mt-4">
          Lorem ipsum dolor sit, amet consectetur adipisicing.
          <button className="flex justify-center items-center gap-1 text-primary hover:scale-110 duration-100">
            SHOP NOW <FaArrowRight />
          </button>
        </p>
      </div>
    </motion.div>
  );
};

const Items = () => {
  const [active, setActive] = useState(["VEGETARIAN", "Vegetarian"]);
  const [foodItems, setFoodItems] = useState([]);
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

  useEffect(() => {
    // Fetch food items related to the active category
    try {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${active[1]}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok " + res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setFoodItems(data.meals || []);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }, [active]);

  const handleSelectChange = (event) => {
    setActive([event.target.value.toUpperCase(), event.target.value]);
  };

  return (
    <div>
      <h4 className="mt-3 font-sans text-lg font-semibold text-center">
        Shop by Category
      </h4>
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Top Category Of Organic Food
      </h1>
      {windowWidth > 700 && (
        <div className="font-sans flex justify-center gap-2 items-center mt-5">
          {list.map((listItem) => (
            <p
              key={listItem[1]}
              className={`p-1 px-4 lg:p-3 lg:px-8 rounded-full ${
                active[1] === listItem[1]
                  ? "bg-primary text-secondary"
                  : "bg-secondary"
              } cursor-pointer`}
              onClick={() => setActive(listItem)}
            >
              {listItem[0]}
            </p>
          ))}
        </div>
      )}
      {windowWidth < 700 && (
        <select
          className="font-sans relative left-10 top-2 w-[80%] m-auto border border-primary rounded-md p-2 px-4 text-primary"
          value={active[1]}
          onChange={handleSelectChange}
        >
          {list.map((listItem) => (
            <option key={listItem[1]} value={listItem[1]}>
              {listItem[0]}
            </option>
          ))}
        </select>
      )}

      <div className="flex flex-wrap w-[95%] lg:w-[85%] gap-10 mx-auto my-6 md:my-8">
        {foodItems.map((item) => (
          <Card foodItem={item} key={item.idMeal} />
        ))}
      </div>
    </div>
  );
};

export default Items;
