export const heightToValCalc = (
  data: number[],
  val: number,
  chartHeight: number | string
): number => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  return val * ((max - min) / Number(chartHeight));
};
