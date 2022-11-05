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

export const ratioToRadialDash = (data: number[], val: number) => {
  const sum = data.reduce((a, b) => a + b);
  const radialLimit = 100;
  return (val / sum) * 100;
};
