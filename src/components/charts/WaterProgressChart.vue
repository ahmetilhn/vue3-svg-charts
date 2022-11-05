<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="water-progress-chart chart bordered">
        <svg :width="Number(chartWidth) + 5" :height="Number(chartHeight) + 10">
          <defs>
            <clipPath id="waterMask">
              <rect
                :x="Number(chartWidth) / 4"
                :y="svg.rect.y"
                :width="Number(chartWidth) / 2"
                :height="Number(chartHeight)"
                style="fill: red"
              />
            </clipPath>
          </defs>
          <circle
            :cx="Number(chartWidth) / 2"
            :cy="Number(chartHeight) / 2"
            :r="Number(chartHeight) / 2"
            clip-path="url('#waterMask')"
            class="water"
          />
          <text
            :x="Number(chartWidth) / 2 - 16"
            :y="Number(chartHeight) - (chartData.value * 120) / 100 / 2"
            style="fill: white;font-weight: bold"
          >
            %{{ chartData.value }}
          </text>
          <circle
            :cx="Number(chartWidth) / 2"
            :cy="Number(chartHeight) / 2"
            :r="Number(chartHeight) / 2"
            class="water-cup"
          />
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ratioToRadialDash } from "@/utils/chart-algorithm";
import ChartLayout from "@/layouts/ChartLayout.vue";
import chartMixin from "@/mixins/chart.mixin";
import { CircleType, PathType, RectType } from "@/types/SvgTypes";
import { WaterProgressChartType } from "@/types/ChartTypes";
export default defineComponent({
  components: { ChartLayout },
  name: "WaterProgressChart",
  props: {
    chartData: {
      type: Object as PropType<WaterProgressChartType>,
      required: true,
    },
    chartHeight: {
      type: String || Number,
      required: false,
      default: 200,
    },
    chartWidth: {
      type: String || Number,
      required: false,
      default: 350,
    },
  },
  data() {
    return {
      per: 0,
      svg: {
        rect: {
          y: Number(this.chartHeight) / 2,
        } as RectType,
        circle: {} as CircleType,
      },
      chartIsReady: false, //bind to res,
    };
  },
  mixins: [chartMixin],
  computed: {
    getParsedChartData(): WaterProgressChartType {
      return JSON.parse(JSON.stringify(this.chartData));
    },
  },
  methods: {
    setRect() {
      const height = Number(this.chartHeight);
      this.svg.rect.y = height - (this.chartData.value * 120) / 100;
    },
    initSVG() {
      this.chartIsReady = true;
      this.setRect();
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.water-progress-chart {
  border: 2px dashed $gray-one;
  border-radius: 5px;
  svg {
    .water {
      fill: $primary-color-light;
    }

    .water-cup {
      stroke-width: 3;
      fill: transparent;
      stroke: $primary-color;
    }
  }
}
</style>
