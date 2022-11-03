<template>
  <column-chart />
</template>

<script>
import ColumnChart from "./components/charts/ColumnChart.vue";
export default {
  name: "App",
  components: {
    ColumnChart,
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
