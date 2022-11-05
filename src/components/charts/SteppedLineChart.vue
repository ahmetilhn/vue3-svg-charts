<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="stepped-line-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <path :d="svg.d" />
          <g class="lines">
            <line
              v-for="item in svg.lines"
              :key="item.y2"
              :x1="item.x1"
              :y1="item.y1"
              :x2="item.x2"
              :y2="item.y2"
              @mousemove="hoverTooltip($event, item.label)"
            />
          </g>
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import { LineChartType } from "@/types/ChartTypes";
import { defineComponent, PropType } from "vue";
import { heightToValCalc } from "@/utils/chart-algorithm";
import ChartLayout from "@/layouts/ChartLayout.vue";
import chartMixin from "@/mixins/chart.mixin";
import { LineType } from "@/types/SvgTypes";
export default defineComponent({
  components: { ChartLayout },
  name: "SteppedLineChart",
  props: {
    chartData: {
      type: Array as PropType<LineChartType[]>,
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
        d: "",
        lines: [] as Array<LineType & { label: string | number }>,
      },
      chartIsReady: false, //bind to res,
    };
  },
  mixins: [chartMixin],
  computed: {
    getParsedChartData(): Array<LineChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
  },
  methods: {
    setPath() {
      let d = "";
      let lastDMY: number;
      const distance = Number(this.chartWidth) / this.per;
      this.getParsedChartData.forEach((item: LineChartType, index: number) => {
        const DMY =
          Number(this.chartHeight) -
          heightToValCalc(
            [...this.getParsedChartData.map((item) => item.value)],
            item.value,
            Number(this.chartHeight)
          );
        const DMX = index * distance;

        d = d.concat(`M${DMX} ${DMY} L${DMX + distance} ${DMY} `);
        if (index !== 0) {
          this.svg.lines.push({
            x1: DMX,
            y1: lastDMY,
            x2: DMX,
            y2: DMY,
            label: item.value,
          });
        }
        lastDMY = DMY;
        this.svg.d = d;
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
.stepped-line-chart {
  svg {
    path,
    .lines > line {
      stroke-width: 2;
      stroke: $primary-color;
      stroke-dasharray: 1000;
      animation: dashEffect 2s ease-in;
    }
  }
}
</style>
