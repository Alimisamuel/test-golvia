// Weight names are defined: tailwindcss
// Synced with: tailwind's default theme

export const sizes = [
  "h$48",
  "h$36",
  "h$32",
  "h$24",
  "h$20",
  "h$18",
  "p$18",
  "p$16",
  "p$14",
] as const;

export type Sizes = (typeof sizes)[number];

export type Weights = "bold" | "semibold" | "medium" | "normal";
export const weights: Weights[] = ["bold", "semibold", "medium", "normal"];

export const tagMap: Record<Sizes, JSX.Element> = {
  h$48: <h2 />,
  h$36: <h3 />,
  h$32: <h3 />,
  h$24: <h4 />,
  h$20: <h4 />,
  h$18: <h5 />,
  p$18: <p />,
  p$16: <p />,
  p$14: <p />,
};

export const sizeMap: Record<Sizes, string> = {
  h$48: "5xl",
  h$36: "4xl",
  h$32: "3xl",
  h$24: "2xl",
  h$20: "xl",
  h$18: "lg",
  p$18: "lg",
  p$16: "base",
  p$14: "sm",
};
