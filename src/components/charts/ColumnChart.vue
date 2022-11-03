<template>
  <div class="column-chart bordered">
    <svg id="svg_elem" v-if="chartIsReady">
      <g
        @mouseover="hoverTooltip($event)"
        class="column"
        v-for="(item, index) in 80"
        :key="item"
      >
        <rect height="100" :width="svg.rectWidth" :x="svg.rectX * index"></rect>
      </g>
    </svg>
    <chart-tooltip />
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
  data() {
    return {
      per: 80,
      svg: {
        rectWidth: 0,
        rectX: 0,
      },
      chartIsReady: true, //bind to res
    };
  },
  mixins: [chartMixin],
  methods: {
    getRectWidth() {
      const svgElem = document.getElementById("svg_elem");
      if (svgElem?.clientWidth) {
        this.svg.rectWidth =
          svgElem?.clientWidth / this.per - svgElem?.clientWidth / this.per / 2;
        this.svg.rectX = svgElem?.clientWidth / this.per;
      }
    },
  },
  mounted() {
    this.getRectWidth();
  },
};
</script>
<style lang="scss" scoped>
.column-chart {
  width: 100%;
  position: relative;
  svg {
    width: 100%;
    height: 100px;
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
