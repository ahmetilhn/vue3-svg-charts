<template>
  <div
    class="chart-tooltip flex--row row--middle--center"
    :style="{
      left: tooltip.position.left,
      top: tooltip.position.top,
      display: tooltip.display,
    }"
  >
    {{ tooltip.content }}
  </div>
</template>

<script lang="ts">
import TooltipType from "@/types/TooltipType";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "ChartTooltip",
  props: {
    tooltip: {
      type: Object as PropType<TooltipType>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.chart-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  display: none;
  background-color: $gray-one;
  border-radius: 6px;
  padding: 16px;
  color: $dark-one;
  transition: left 0.1s linear;
  font-size: 14px;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
