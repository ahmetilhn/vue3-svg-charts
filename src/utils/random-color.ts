export const getRandomColor = (): string => {
  const baseColor = "#FF6247";
  const randomAlpha = Math.floor(Math.random() * (100 - 50 + 1) + 50);
  return baseColor + randomAlpha;
};
