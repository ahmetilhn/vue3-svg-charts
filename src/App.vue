<template>
  <div class="container">
    <column-chart
      :chartData="exampleChartData['column-chart-data']"
      chartHeight="120"
      chartWidth="240"
    />
    <dotted-line-chart
      :chartData="exampleChartData['line-chart-data']"
      chartHeight="120"
      chartWidth="240"
    />
    <stepped-line-chart
      :chartData="exampleChartData['line-chart-data']"
      chartHeight="120"
      chartWidth="240"
    />
    <bubble-chart
      :chartData="exampleChartData['bubble-chart-data']"
      chartHeight="120"
      chartWidth="240"
    />
    <radial-chart
      :chartData="exampleChartData['radial-chart-data']"
      chartHeight="120"
      chartWidth="240"
    />
  </div>
</template>

<script lang="ts">
import ColumnChart from "@/components/charts/ColumnChart.vue";
import DottedLineChart from "@/components/charts/DottedLineChart.vue";
import SteppedLineChart from "@/components/charts/SteppedLineChart.vue";
import BubbleChart from "@/components/charts/BubbleChart.vue";
import RadialChart from "@/components/charts/RadialChart.vue";
import exampleChartData from "@/data/chart-example-data.json";
import "@/assets/sass/theme.scss";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    ColumnChart,
    SteppedLineChart,
    DottedLineChart,
    BubbleChart,
    RadialChart,
  },
  data() {
    return {
      exampleChartData,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  ::v-deep(.chart-layout) {
    margin: 30px;
  }
}
</style>
