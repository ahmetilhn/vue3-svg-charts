<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="bubble-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <g class="circles">
            <circle
              v-for="item in svg.circles"
              :key="item.cx"
              :cx="item.cx"
              :cy="item.cy"
              :r="item.r"
              @mousemove="hoverTooltip($event, item.label)"
            />
          </g>
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import { BubbleChartType } from "@/types/ChartTypes";
import { defineComponent, PropType } from "vue";
import { heightToValCalc } from "@/utils/chart-algorithm";
import { CircleType } from "@/types/SvgTypes";
import ChartLayout from "@/layouts/ChartLayout.vue";
import chartMixin from "@/mixins/chart.mixin";
export default defineComponent({
  components: { ChartLayout },
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
      default: 200,
    },
    chartWidth: {
      type: String || Number,
      required: false,
      default: 350,
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
          label: item.value,
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
  svg {
    .circles {
      circle {
        fill: $primary-color;
        animation: svgCircleEffect 1s ease;
        transition: r 0.2s ease;
        &:hover {
          r: 10;
          fill: $primary-color-light;
        }
      }
    }
  }
}
</style>
