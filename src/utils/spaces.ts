// Synced with: tailwind's spacing

export const spaces = [0, 4, 8, 16, 20, 32, 56, 80] as const;

export type Spaces = (typeof spaces)[number];

export const spaceMap: Record<Spaces, number> = Object.freeze({
  0: 0,
  4: 1,
  8: 2,
  16: 4,
  20: 5,
  32: 8,
  56: 14,
  80: 20,
});

export const muiSpaceMap: Record<Spaces, number> = Object.freeze({
  0: 0,
  4: 4,
  8: 8,
  16: 16,
  20: 20,
  32: 32,
  56: 56,
  80: 80,
});

export const getSpacingSafeList = () => {
  const classes: string[] = [];

  Object.values(spaceMap).forEach((value) => {
    for (const direction of ["pl", "pr", "pt", "pb", "ml", "mr", "mt", "mb"]) {
      classes.push(`${direction}-${value}`);
    }
  });

  return classes;
};
