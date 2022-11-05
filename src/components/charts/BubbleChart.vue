<template>
  <div
    class="bubble-chart bordered"
    :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"
  >
    <svg v-if="chartIsReady" :width="chartWidth" :height="chartHeight">
      <g>
        <circle
          v-for="item in svg.circles"
          :key="item.cx"
          :cx="item.cx"
          :cy="item.cy"
          :r="item.r"
        />
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { BubbleChartType } from "@/types/ChartTypes";
import { defineComponent, PropType } from "vue";
import { heightToValCalc } from "@/utils/chart-algorithm";
export default defineComponent({
  name: "BubbleChart",
  props: {
    chartData: {
      type: Array as PropType<BubbleChartType[]>,
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
        circles: [] as Array<{ cx: number; cy: number; r: number }>,
      },
      chartIsReady: false, //bind to res,
    };
  },
  computed: {
    getParsedChartData(): Array<BubbleChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
  },
  methods: {
    setCircles() {
      this.getParsedChartData.forEach((item: BubbleChartType, index) => {
        let distance = index * (Number(this.chartWidth) / this.per);
        let scaledVal = heightToValCalc(
          [...this.getParsedChartData.map((item) => item.value)],
          item.value,
          Number(this.chartHeight)
        );
        const min = Math.min(
          ...this.getParsedChartData.map((item) => item.value)
        );
        const max = Math.max(
          ...this.getParsedChartData.map((item) => item.value)
        );
        // margin for ui

        if (index === 0) {
          distance = distance + 10;
        }
        if (max === item.value) {
          scaledVal = scaledVal - 20;
        }
        this.svg.circles.push({
          cx: distance,
          cy: Number(this.chartHeight) - scaledVal,
          r: scaledVal / min / 1.5,
        });
      });
    },
    initSVG() {
      this.per = this.getParsedChartData.length;
      this.setCircles();
      this.chartIsReady = true;
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.bubble-chart {
  position: relative;
  svg {
    g {
      circle {
        fill: $primary-color;
      }
    }
  }
}
</style>
