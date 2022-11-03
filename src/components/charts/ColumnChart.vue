<template>
  <div :style="{ width: chartWidth + 'px' }" class="column-chart bordered">
    <template v-if="chartIsReady">
      <svg
        :width="chartWidth"
        :height="chartHeight"
        id="svg_elem"
        v-if="chartIsReady"
      >
        <g
          @mouseover="hoverTooltip($event, item.tooltip_content)"
          class="column"
          v-for="(item, index) in getParsedChartData"
          :key="item.value"
        >
          <rect
            :height="getRectHeight(item)"
            :width="svg.rectWidth"
            :x="svg.rectX * index"
          ></rect>
        </g>
      </svg>
      <chart-tooltip :tooltip="tooltip" />
    </template>
    <template v-else>
      <error-result />
    </template>
  </div>
</template>
<script lang="ts">
import chartMixin from "@/mixins/chart.mixin";
import ChartTooltip from "../ChartTooltip.vue";
import ErrorResult from "@/components/ErrorResult.vue";
import { defineComponent, PropType } from "vue";
import { ColumnChartType } from "@/types/ChartTypes";
export default defineComponent({
  name: "ColumnChart",
  components: {
    ChartTooltip,
    ErrorResult,
  },
  props: {
    chartData: {
      type: Array as PropType<ColumnChartType[]>,
      required: true,
      default: () => [],
    },
    chartHeight: {
      type: String || Number,
      required: false,
    },
    chartWidth: {
      type: String || Number,
      required: false,
    },
  },
  data() {
    return {
      per: 0,
      svg: {
        rectWidth: 0,
        rectX: 0,
      },
      chartIsReady: false, //bind to res,
      average: 0,
    };
  },
  computed: {
    getParsedChartData(): Array<ColumnChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
    getOnlyValues(): Array<number> {
      return this.getParsedChartData.map((item) => item.value);
    },
  },
  mixins: [chartMixin],
  methods: {
    setRectWidth() {
      const svgWidth: number = Number(this.chartWidth);
      if (svgWidth) {
        this.svg.rectWidth = svgWidth / this.per - 4;
        this.svg.rectX = svgWidth / this.per;
      }
    },
    getRectHeight(_data: ColumnChartType) {
      const sum: number = this.getOnlyValues?.reduce((a: number, b: number) => {
        return Number(a) + Number(b);
      });
      const avg = sum / this.getParsedChartData.length || 0;
      this.average = avg;
      if (_data.value > Number(this.chartHeight)) {
        return this.chartHeight;
      }
      return ((avg / _data.value) * 10).toFixed(2);
    },
    initSVG() {
      if (this.getParsedChartData.length) {
        this.per = this.getParsedChartData.length;
        this.chartIsReady = true;
        this.setRectWidth();
      }
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.column-chart {
  position: relative;
  svg {
    transform: scaleY(-1);
    .column {
      &:hover {
        rect {
          fill: $primary-color-light;
        }
      }
      rect {
        fill: $primary-color;
        transition: height 0.2s;
      }
    }
  }
  &:hover {
    .chart-tooltip {
      visibility: visible;
    }
  }
}
</style>
