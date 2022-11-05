<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="column-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <g class="rects">
            <rect
              v-for="(item, index) in getParsedChartData"
              :key="item.value"
              :height="getRectHeight(item)"
              :width="svg.rectWidth"
              :x="svg.rectX * index"
              @mousemove="hoverTooltip($event, item.label)"
            ></rect>
          </g>
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import chartMixin from "@/mixins/chart.mixin";
import ChartLayout from "@/layouts/ChartLayout.vue";
import { defineComponent, PropType } from "vue";
import { ColumnChartType } from "@/types/ChartTypes";
import { heightToValCalc } from "@/utils/chart-algorithm";
export default defineComponent({
  name: "ColumnChart",
  components: {
    ChartLayout,
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
      const svgWidth = Number(this.chartWidth);
      if (svgWidth) {
        this.svg.rectWidth = svgWidth / this.per - 4;
        this.svg.rectX = svgWidth / this.per;
      }
    },
    getRectHeight(_data: ColumnChartType): number {
      const sum: number = this.getOnlyValues?.reduce((a: number, b: number) => {
        return Number(a) + Number(b);
      });
      const avg: number = sum / this.getParsedChartData.length || 0;
      this.average = avg;
      return heightToValCalc(
        [...this.getParsedChartData.map((item) => item.value)],
        _data.value,
        Number(this.chartHeight)
      );
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
  width: 100%;
  height: 100%;
  svg {
    transform: scaleY(-1);
    .rects {
      rect {
        fill: $primary-color;
        transition: height 0.2s;
        animation: heightEffect 0.5s forwards;

        &:hover {
          fill: $primary-color-light;
        }
      }
    }
  }
}
</style>
