// import zen1 from "../../assets/ads/zen.png";
// import zen2 from "../../assets/ads/zenn2.png";
import chow from "../../assets/ads/chow.jpeg";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

const Ads = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [slideClass, setSlideClass] = useState("slide-in-from-right");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideClass("slide-out-to-left");
      setTimeout(() => {
        setCurrentAdIndex((prevIndex) => (prevIndex + 1) % AdsConfig.length);
        setSlideClass("slide-in-from-right");
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [AdsConfig.length]);

  return (
    <div className="relative h-[320px] overflow-hidden">
      <a href={AdsConfig[currentAdIndex].url} target="_block">
        <Box
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${slideClass}`}
          sx={{
            backgroundImage: `url(${AdsConfig[currentAdIndex].image})`,
            width: "100%",
            height: "100%",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px",
          }}
        />
      </a>
    </div>
  );
};

export default Ads;

const AdsConfig = [
  {
    id: 1,
    image: chow,
    url: "https://500chow.com/bvtE/63ablanr",
  },
  {
    id: 2,
    image: chow,
    url: "https://500chow.com/bvtE/63ablanr",
  },
];
