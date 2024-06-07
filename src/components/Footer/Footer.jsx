import { useState, useEffect } from "react";
import { FaClock, FaHome } from "react-icons/fa";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const updateTime = () => {
      const time = new Date();
      setCurrentTime(time.toLocaleTimeString());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // fetching weather
  useEffect(() => {
    try {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=28.6139&lon=77.209&appid=e1954291b049441b0e6499dc9bd4042a`
      )
        .then((responseWeather) => {
          return responseWeather.json();
        })
        .then((dataWeather) => {
          const weatherDescription = dataWeather.weather[0].description;
          const temp = dataWeather.main.temp;
          const icon = dataWeather.weather[0].icon;
          const iconUrl = `http://openweathermap.org/img/wn/${icon}.png`;
          const weatherObj = { weatherDescription, temp, iconUrl };
          setWeather(weatherObj);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  return (
    <footer className="flex flex-col md:flex-row p-3 justify-between items-center bg-secondary text-primary text-center">
      <p className="flex gap-2 items-center text-lg w-36">
        <FaClock />
        {currentTime}
      </p>
      <p className="dark:text-red-400">
        &copy; {new Date().getFullYear()} GoFood. All Rights Reserved.
      </p>
      <p className="flex items-center">
        {weather.weatherDescription} , {Math.floor(weather.temp - 273.15)}&deg;
        <img src={weather.iconUrl} alt="Weather Icon" />
      </p>
      <button
        className="p-2 rounded-full bg-secondary text-primary text-xl right-4 -translate-y-8 md:-translate-y-10 absolute shadow-lg"
        onClick={() => {
          const homeRef = document.getElementById("home");
          homeRef.scrollIntoView({
            behavior: "smooth",
          });
        }}
      >
        <FaHome />
      </button>
    </footer>
  );
};

export default Footer;
