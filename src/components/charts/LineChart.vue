<template>
  <div
    class="line-chart bordered"
    :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"
  >
    <svg v-if="chartIsReady" :width="chartWidth" :height="chartHeight">
      <path :d="svg.d" />
      <g>
        <circle
          v-for="item in svg.circles"
          :key="item.cx"
          :cx="item.cx"
          :cy="item.cy"
          r="2"
        />
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { LineChartType } from "@/types/ChartTypes";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "LineChart",
  props: {
    chartData: {
      type: Array as PropType<LineChartType[]>,
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
        d: "",
        circles: [] as { cx: number; cy: number }[],
      },
      chartIsReady: false, //bind to res,
    };
  },
  computed: {
    getParsedChartData(): Array<LineChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
  },
  methods: {
    setPath() {
      let d = "";
      let lastDMY = 0; // d > m > x
      const distance = Number(this.chartWidth) / this.per;
      this.getParsedChartData.forEach((item: LineChartType, index: number) => {
        let DMY: number;
        let DMX = index * distance;
        if (index === 0) {
          return;
        }
        if (Number(this.chartHeight) > item.value) {
          DMY = Number(this.chartHeight) - item.value;
        } else {
          DMY = 0;
        }
        // margin for UI
        if (index === 1) {
          DMX = 5;
          lastDMY = Number(this.chartHeight) - 5;
        }
        if (DMY === Number(this.chartHeight)) {
          DMY = DMY - 5;
        }
        if (DMY === 0) {
          DMY = DMY + 5;
        }
        d = d.concat(`M${DMX} ${lastDMY} L${(index + 1) * distance} ${DMY} `);
        this.setCircles(DMX, lastDMY);
        this.svg.d = d;
        lastDMY = DMY;
      });
    },
    setCircles(cx: number, cy: number) {
      this.svg.circles.push({
        cx: cx,
        cy: cy,
      });
    },
    initSVG() {
      this.per = this.getParsedChartData.length;
      this.setPath();
      this.chartIsReady = true;
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.line-chart {
  position: relative;
  svg {
    path {
      stroke-width: 2;
      stroke: $primary-color;
    }
    circle {
      fill: $dark-two;
      stroke: $dark-two;
      stroke-width: 1px;
      transition: stroke-width 0.1s linear;
      cursor: pointer;
      &:hover {
        stroke-width: 6px;
      }
    }
  }
}
</style>
