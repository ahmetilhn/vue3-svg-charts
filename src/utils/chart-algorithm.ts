export const heightToValCalc = (
  data: number[],
  val: number,
  chartHeight: number | string
): number => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  if (max - min > Number(chartHeight)) {
    if (val > Number(chartHeight)) {
      return Number(chartHeight);
    }
    return val / (max / Number(chartHeight));
  }
  return val * ((max - min) / Number(chartHeight));
};
