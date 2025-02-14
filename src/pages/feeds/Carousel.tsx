import { useEffect, useState } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ReactComponent as ArrowLeftIcon } from "assets/icons/arrow-circle-left.svg";
import { ReactComponent as ArrowRightIcon } from "assets/icons/arrow-circle-right.svg";
import ReactPlayer from "react-player";
import { Media } from "./api";

interface Props {
  media: Media[];
  perPage?: number;
  fit?: "contain" | "cover";
  isCurved?: boolean;
  currentIndex?: number;
  maxHeight?: number;
  onMediaClick?: (index: number) => void;
  setSlideindex?: (index: number) => void;
  hashTag?: string | undefined;
}

export default function Carousel(props: Props) {
  const {
    media,
    perPage = 2,
    fit = "cover",
    isCurved = true,
    currentIndex: index = 0,
    onMediaClick,
    setSlideindex,
    maxHeight,
    hashTag,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(index);
  const itemsPerPage = perPage;
  const totalPages = Math.ceil(media.length / itemsPerPage);

  // useEffect(() => {
  //   if (media.length <= 2) {
  //     return
  //   }
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % media.length);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [media.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    setSlideindex?.(currentIndex);
  }, [currentIndex]);

  const showPrev = !!currentIndex && media.length > 1;
  const showNext = (currentIndex + 1) * perPage < media.length && media.length > 1;

  const offset = currentIndex * itemsPerPage * (100 / itemsPerPage); // percentage offset
  const spacing = currentIndex * itemsPerPage * 8; // pixel spacing
  const transformValue = `calc(-${offset}% - ${spacing}px)`;

  return (
    <Stack position="relative" justifyContent="center" height="100%">
      {/* Previous Button */}
      {showPrev && (
        <IconButton
          className="!absolute left-0 z-10 !p-0 shadow-md hover:bg-gray-100 "
          sx={{ ml: 2 }}
          onClick={prevSlide}
        >
          <ArrowLeftIcon color="white" />
        </IconButton>
      )}

      {/* Slides */}
      <Stack
        direction="row"
        height="100%"
        spacing={1}
        style={{
          transform: `translateX(${transformValue})`,
          transitionDuration: "300ms",
          transitionTimingFunction: "ease-in",
        }}
      >
        {media.map((medium, index) => {
          const mediaType = medium.type;
          return (
            <Box
              key={index}
              maxHeight={maxHeight}
              width={media.length > 1 && itemsPerPage > 1 ? "50%" : "100%"}
              borderRadius={isCurved ? "10px" : 0}
              className="flex-shrink-0 rounded-md overflow-hidden"
              onClick={() => onMediaClick?.(index)}
            >
              {hashTag && (
                <Typography
                  fontSize="12px"
                  fontWeight={500}
                  position="absolute"
                  borderRadius="6px"
                  top={12}
                  left={12}
                  className="bg-[#FFC107]"
                  px={1.5}
                  py={1}
                >
                  {hashTag}
                </Typography>
              )}
              {mediaType === "image" && (
                <img
                  src={medium.link}
                  alt="feed content"
                  className={`w-full h-full max-h-[${maxHeight}px] ${fit == "contain" ? "object-contain" : "object-cover"} cursor-pointer`}
                />
              )}
              {mediaType === "video" && (
                <ReactPlayer
                  key={index}
                  url={medium.link}
                  playing={false}
                  controls={true}
                  width="100%"
                  height="100%"
                />
              )}
            </Box>
          );
        })}
      </Stack>

      {/* Next Button */}
      {showNext && (
        <IconButton
          className="!absolute right-0 z-10 !p-0 bg-white shadow-md hover:bg-gray-100"
          onClick={nextSlide}
          sx={{ mr: 2 }}
        >
          <ArrowRightIcon color="white" />
        </IconButton>
      )}
    </Stack>
  );
}
