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
          @mouseover="hoverTooltip($event, { content: item.tooltip_content })"
          class="column"
          v-for="(item, index) in getParsedChartData"
          :key="item"
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
<script>
import chartMixin from "@/mixins/chart.mixin";
import ChartTooltip from "../ChartTooltip.vue";
import ErrorResult from "@/components/ErrorResult.vue";
export default {
  name: "ColumnChart",
  components: {
    ChartTooltip,
    ErrorResult,
  },
  props: {
    chartData: {
      type: Array,
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
    getParsedChartData() {
      return JSON.parse(JSON.stringify(this.chartData));
    },
  },
  mixins: [chartMixin],
  methods: {
    setRectWidth() {
      const svgWidth = this.chartWidth;
      if (svgWidth) {
        this.svg.rectWidth = svgWidth / this.per - 4;
        this.svg.rectX = svgWidth / this.per;
      }
    },
    getRectHeight(_data) {
      const sum = this.getParsedChartData?.reduce((a, b) => {
        if (typeof a === "object") {
          return Number(a.value) + Number(b.value);
        }
        return Number(a) + Number(b.value);
      });
      const avg = sum / this.getParsedChartData.length || 0;
      this.average = avg;
      return (_data.value / avg) * 100;
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
};
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
