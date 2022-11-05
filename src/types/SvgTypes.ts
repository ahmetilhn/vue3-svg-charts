type BaseSvgElemType = {
  stroke?: string;
  strokeDasharray?: number | string;
  strokeDashoffset?: number | string;
  width?: number | string;
  height?: number | string;
};
export type CircleType = BaseSvgElemType & {
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
};

export type PathType = BaseSvgElemType & {
  d?: string;
};

export type LineType = BaseSvgElemType & {
  x1?: number | string;
  y1?: number | string;
  x2?: number | string;
  y2?: number | string;
};

export type RectType = BaseSvgElemType & {
  x?: number | string;
  y?: number | string;
  rx?: number | string;
  ry?: number | string;
};
