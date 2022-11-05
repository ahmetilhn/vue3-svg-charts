<template>
  <div
    class="chart-layout"
    :style="{ width: chartWidth + 'px', height: chartHeight + 'px' }"
  >
    <template v-if="!isError">
      <slot name="chart"></slot>
      <chart-tooltip :tooltip="tooltip" />
    </template>
    <template v-else>
      <error-result />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import ErrorResult from "@/components/ErrorResult.vue";
import ChartTooltip from "@/components/ChartTooltip.vue";
import TooltipType from "@/types/TooltipType";
export default defineComponent({
  name: "ChartLayout",
  components: {
    ErrorResult,
    ChartTooltip,
  },
  props: {
    chartHeight: {
      type: String || Number,
      required: false,
    },
    chartWidth: {
      type: String || Number,
      required: false,
    },
    isError: {
      type: Boolean,
      required: false,
      default: false,
    },
    tooltip: {
      type: Object as PropType<TooltipType>,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.chart-layout {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    .chart-tooltip {
      visibility: visible;
    }
  }
}
</style>
