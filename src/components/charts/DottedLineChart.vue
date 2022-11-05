<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="dotted-line-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <path :d="svg.d" />
          <g class="circles">
            <circle
              v-for="item in svg.circles"
              :key="item.cx"
              :cx="item.cx"
              :cy="item.cy"
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
import { CircleType } from "@/types/SvgTypes";
export default defineComponent({
  components: { ChartLayout },
  name: "DottedLineChart",
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
        circles: [] as CircleType[],
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
      let lastDMY = 0; // d > m > x
      const distance = Number(this.chartWidth) / this.per;
      this.getParsedChartData.forEach((item: LineChartType, index: number) => {
        let DMY: number;
        let DMX = index * distance;
        if (index === 0) {
          return;
        }
        DMY =
          Number(this.chartHeight) -
          heightToValCalc(
            [...this.getParsedChartData.map((item) => item.value)],
            item.value,
            Number(this.chartHeight)
          );
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
        this.setCircle({ cx: DMX, cy: lastDMY });
        this.svg.d = d;
        lastDMY = DMY;
      });
    },
    setCircle(circle: CircleType) {
      this.svg.circles.push({
        cx: circle.cx,
        cy: circle.cy,
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
.dotted-line-chart {
  width: 100%;
  height: 100%;
  svg {
    path {
      stroke-width: 2;
      stroke: $primary-color;
      stroke-dasharray: 1000;
      animation: dashEffect 2s ease-in;
    }
    .circles {
      circle {
        fill: $dark-two;
        stroke: $dark-two;
        stroke-width: 2px;
        transition: stroke-width 0.1s linear;
        cursor: pointer;
        r: 3;
        &:hover {
          stroke-width: 6px;
        }
      }
    }
  }
}
</style>
