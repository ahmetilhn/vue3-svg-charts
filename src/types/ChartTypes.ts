type BaseChartType = {
  color?: string;
  label: string | number;
  value: number;
};
export type ColumnChartType = BaseChartType;

export type LineChartType = BaseChartType;

export type BubbleChartType = BaseChartType;

export type RadialChartType = BaseChartType;

export type WaterProgressChartType = {
  color?: string;
  value: number;
};
