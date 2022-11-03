<template>
  <div
    class="chart-tooltip flex--row row--middle--center"
    :style="{
      left: tooltip.position.left,
      top: tooltip.position.top,
      display: tooltip.display,
    }"
  >
    Tooltip
  </div>
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
