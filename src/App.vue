<template>
  <column-chart
    :chartData="exampleChartData['column-chart-data']"
    chartHeight="100"
    chartWidth="350"
  />
  <line-chart
    :chartData="exampleChartData['line-chart-data']"
    chartHeight="100"
    chartWidth="350"
  />
</template>

<script lang="ts">
import ColumnChart from "@/components/charts/ColumnChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import exampleChartData from "@/data/chart-example-data.json";
import "@/assets/sass/theme.scss";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    ColumnChart,
    LineChart,
  },
  data() {
    return {
      exampleChartData,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    margin: 20px;
  }
}
</style>
