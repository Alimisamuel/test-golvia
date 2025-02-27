export const colors = [
  "blueMinus4_F3F6FC",
  "blueMinus3_EBF4FF",
  "blueMinus2_DDEBFD",
  "blueMinus1_3373E0",
  "blue_1D69D8",
  "bluePlus1_061B5C",
  "greyMinus3_F4F4F6",
  "greyMinus2_DCE1EC",
  "greyMinus1_99A4BA",
  "grey_626262",
  "greyPlus1_333F4F",
  "black_1A1C1F",
  "yellowMinus2_FFF0D0",
  "yellowMinus1_FFC67F",
  "yellow_DA9500",
  "green_3EC28B",
  "red_FF5F3E",
] as const;

export type Colors = (typeof colors)[number];

export const colorMap: Record<Colors, string> = Object.freeze({
  blueMinus4_F3F6FC: "#F3F6FC",
  blueMinus3_EBF4FF: "#EBF4FF",
  blueMinus2_DDEBFD: "#DDEBFD",
  blueMinus1_3373E0: "#3373E0",
  blue_1D69D8: "#1D69D8",
  bluePlus1_061B5C: "#061B5C",
  greyMinus3_F4F4F6: "#F4F4F6",
  greyMinus2_DCE1EC: "#D4DCEC",
  greyMinus1_99A4BA: "#99A4BA",
  grey_626262: "#626262",
  greyPlus1_333F4F: "#333F4F",
  black_1A1C1F: "#1A1C1F",
  yellowMinus2_FFF0D0: "#FFF0D0",
  yellowMinus1_FFC67F: "#FFC67F",
  yellow_DA9500: "#DA9500",
  green_3EC28B: "#3EC28B",
  red_FF5F3E: "#FF5F3E",
});

// const getHsf = (color: string) => {
//   return color.split("_")[1];
// };
