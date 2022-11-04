<template>
  <div class="line-chart bordered">
    <svg v-if="chartIsReady" :width="chartWidth" :height="chartHeight">
      <path d="M5 195 L200 100 M200 100 L300 200 M300 200 L400 100" />
      <circle cx="5" cy="195" r="3" />
      <circle cx="200" cy="100" r="3" />
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
      svg: {},
      chartIsReady: true, //bind to res,
    };
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
      fill: $dark-one;
    }
  }
}
</style>
