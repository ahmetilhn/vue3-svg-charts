<template>
  <column-chart
    :chartData="
      JSON.parse(JSON.stringify(exampleChartData))['column-chart-data']
    "
    height="200"
    width="350"
  />
</template>

<script>
import ColumnChart from "./components/charts/ColumnChart.vue";
import exampleChartData from "./data/chart-example-data.json";
export default {
  name: "App",
  components: {
    ColumnChart,
  },
  data() {
    return {
      exampleChartData,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
