export const heightToValCalc = (
  data: number[],
  val: number,
  chartHeight: number | string
): number => {
  const max = Math.max(...data);
  if (val === max) {
    return Number(chartHeight);
  }
  return val / (max / Number(chartHeight));
};
