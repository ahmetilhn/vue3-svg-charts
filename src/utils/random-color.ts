export const getRandomColor = (): string => {
  const baseColor = "#FF6247";
  let color;
  for (let i = 0; i <= 100; i++) {
    color = baseColor + Math.floor(Math.random() * 100);
  }
  console.log(color);
  return color;
};
