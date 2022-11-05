<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="radial-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <g class="circles">
            <circle
              v-for="item in reversedCircles"
              :key="item.strokeDashoffset"
              :r="Number(chartWidth) / 4.5"
              :cx="Number(chartWidth) / 2"
              :cy="Number(chartHeight) / 2"
              :stroke="item.stroke"
              :stroke-dashoffset="item.strokeDashoffset"
              @mousemove="hoverTooltip($event, item.label)"
            />
          </g>
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import { RadialChartType } from "@/types/ChartTypes";
import { defineComponent, PropType } from "vue";
import { ratioToRadialDash } from "@/utils/chart-algorithm";
import { getRandomColor } from "@/utils/random-color";
import ChartLayout from "@/layouts/ChartLayout.vue";
import chartMixin from "@/mixins/chart.mixin";
import { CircleType } from "@/types/SvgTypes";
export default defineComponent({
  components: { ChartLayout },
  name: "RadialChart",
  props: {
    chartData: {
      type: Array as PropType<RadialChartType[]>,
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
        circles: [] as Array<CircleType & { label: string | number }>,
      },
      chartIsReady: false, //bind to res,
    };
  },
  mixins: [chartMixin],
  computed: {
    getParsedChartData(): Array<RadialChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
    reversedCircles() {
      const circles = JSON.parse(JSON.stringify(this.svg.circles));
      return circles.sort((a, b) => a.strokeDashoffset - b.strokeDashoffset);
    },
  },
  methods: {
    setCircless() {
      let total = 0;
      const sortedData = JSON.parse(
        JSON.stringify(this.getParsedChartData)
      ).sort((a: RadialChartType, b: RadialChartType) => a.value - b.value);
      sortedData.forEach((item: RadialChartType) => {
        const dashVal = ratioToRadialDash(
          [...sortedData.map((item) => item.value)],
          item.value
        );
        this.svg.circles.push({
          strokeDashoffset: 550 - (550 * (dashVal + total)) / 100,
          stroke: getRandomColor(),
          r: 0,
          label: item.label,
        });
        total = total + dashVal;
      });
    },
    initSVG() {
      this.per = this.getParsedChartData.length;
      this.setCircless();
      this.chartIsReady = true;
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.radial-chart {
  border: 2px dashed $gray-one;
  border-radius: 5px;
  svg {
    .circles {
      circle {
        fill: transparent;
        stroke-width: 30px;
        animation: dashEffect 0.8s ease-in-out;
        stroke-dasharray: 550;
      }
    }
  }
}
</style>
