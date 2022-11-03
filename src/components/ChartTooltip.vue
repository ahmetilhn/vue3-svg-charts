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
import chartMixin from "@/mixins/chart.mixin";
export default {
  name: "ChartTooltip",
  mixins: [chartMixin],
};
</script>
