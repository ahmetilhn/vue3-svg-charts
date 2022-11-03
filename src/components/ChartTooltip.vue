<template>
  <text
    class="chart-tooltip flex--row row--middle--center"
    :style="{
      left: tooltip.position.left,
      top: tooltip.position.top,
      display: tooltip.display,
    }"
  >
    Tooltip
  </text>
</template>

<script>
export default {
  name: "ChartTooltip",
  props: {
    tooltip: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.chart-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  display: none;
  background-color: $dark-one;
  border-radius: 6px;
  padding: 20px;
  color: $white;
  transition: left 0.1s linear;
}
</style>
