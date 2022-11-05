type BaseChartType = {
  color?: string;
  label: string | number;
};
export type ColumnChartType = BaseChartType & {
  value: number;
};
export type LineChartType = BaseChartType & {
  value: number;
};

export type BubbleChartType = BaseChartType & {
  value: number;
};

export type RadialChartType = BaseChartType & {
  value: number;
};
