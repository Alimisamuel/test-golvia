import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";

const pxToRem = (px: number, oneRemPx = 17) => `${px / oneRemPx}rem`;

export const SwitchGv = styled(Switch)(({ theme }) => {
  const spacing = 8;
  const size = pxToRem(20);
  const width = pxToRem(40 + 2 * spacing);
  const borderWidth = 2;
  const height = `calc(${size} + ${borderWidth * 2}px + ${pxToRem(2 * spacing)})`;
  return {
    width,
    height,
    padding: pxToRem(spacing),
    margin: 0,
    [`& .${switchClasses.switchBase}`]: {
      padding: borderWidth,
      top: pxToRem(spacing),
      left: pxToRem(spacing),
      [`&.${switchClasses.checked}`]: {
        color: theme.palette.common.white,
        transform: `translateX(calc(${width} - ${size} - ${
          borderWidth * 2
        }px - ${pxToRem(2 * spacing)}))`,
        [`& + .${switchClasses.track}`]: {
          opacity: 1,
          border: "none",
        },
      },
    },
    [`& .${switchClasses.thumb}`]: {
      background: theme.palette.common.white,
      width: size,
      height: size,
      boxShadow:
        "0 3px 8px 0 rgba(0,0,0,0.15), 0 1px 1px 0 rgba(0,0,0,0.16), 0 3px 1px 0 rgba(0,0,0,0.1)",
    },
    [`& .${switchClasses.track}`]: {
      borderRadius: 40,
      border: `solid ${theme.palette.grey[300]}`,
      borderWidth,
      backgroundColor: theme.palette.grey[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
  };
});
