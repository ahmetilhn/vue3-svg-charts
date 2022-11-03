<template>
  <div :style="{ width: width + 'px' }" class="column-chart bordered">
    <svg :width="width" :height="height" id="svg_elem" v-if="chartIsReady">
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
  </div>
</template>
<script>
import chartMixin from "@/mixins/chart.mixin";
import ChartTooltip from "../ChartTooltip.vue";
export default {
  name: "ColumnChart",
  components: {
    ChartTooltip,
  },
  props: {
    chartData: {
      type: Array,
      required: true,
      default: () => [],
    },
    height: {
      type: String || Number,
      required: false,
    },
    width: {
      type: String || Number,
      required: false,
    },
  },
  data() {
    return {
      per: 10,
      svg: {
        rectWidth: 0,
        rectX: 0,
      },
      chartIsReady: true, //bind to res,
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
      const svgElem = document.getElementById("svg_elem");
      const svgWidth = this.width || svgElem?.clientWidth;
      if (svgWidth) {
        this.svg.rectWidth = svgWidth / this.per - 5;
        this.svg.rectX = svgElem?.clientWidth / this.per;
      }
    },
    getRectHeight(_data) {
      // const svgElem = document.getElementById("svg_elem");
      const sum = this.chartData?.reduce((a, b) => {
        if (typeof a === "object") {
          return Number(a.value) + Number(b.value);
        }
        return Number(a) + Number(b.value);
      });
      const avg = sum / this.chartData.length || 0;
      this.average = avg;
      return (_data.value / avg) * 100;
    },
    initSVG() {
      if (this.chartData.length) {
        this.per = this.chartData.length;
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
