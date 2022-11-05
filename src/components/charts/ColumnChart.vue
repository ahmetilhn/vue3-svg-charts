<template>
  <chart-layout
    :chart-height="chartHeight"
    :chart-width="chartWidth"
    :tooltip="tooltip"
    :is-error="!chartIsReady"
  >
    <template v-slot:chart>
      <div class="column-chart chart bordered">
        <svg :width="chartWidth" :height="chartHeight">
          <g class="rects">
            <rect
              v-for="(item, index) in getParsedChartData"
              :key="item.value"
              :height="getRectHeight(item)"
              :width="svg.rect.width"
              :x="Number(svg.rect.x) * index"
              @mousemove="hoverTooltip($event, item.label)"
            ></rect>
          </g>
        </svg>
      </div>
    </template>
  </chart-layout>
</template>
<script lang="ts">
import chartMixin from "@/mixins/chart.mixin";
import ChartLayout from "@/layouts/ChartLayout.vue";
import { defineComponent, PropType } from "vue";
import { ColumnChartType } from "@/types/ChartTypes";
import { heightToValCalc } from "@/utils/chart-algorithm";
import { RectType } from "@/types/SvgTypes";
export default defineComponent({
  name: "ColumnChart",
  components: {
    ChartLayout,
  },
  props: {
    chartData: {
      type: Array as PropType<ColumnChartType[]>,
      required: true,
      default: () => [],
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
          width: 0,
          x: 0,
        } as RectType,
      },
      chartIsReady: false, //bind to res,
      average: 0,
    };
  },
  computed: {
    getParsedChartData(): Array<ColumnChartType> {
      return JSON.parse(JSON.stringify(this.chartData));
    },
    getOnlyValues(): Array<number> {
      return this.getParsedChartData.map((item) => item.value);
    },
  },
  mixins: [chartMixin],
  methods: {
    setRectWidth() {
      const svgWidth = Number(this.chartWidth);
      if (svgWidth) {
        this.svg.rect.width = svgWidth / this.per - 4;
        this.svg.rect.x = svgWidth / this.per;
      }
    },
    getRectHeight(_data: ColumnChartType): number {
      const sum: number = this.getOnlyValues?.reduce((a: number, b: number) => {
        return Number(a) + Number(b);
      });
      const avg: number = sum / this.getParsedChartData.length || 0;
      this.average = avg;
      return heightToValCalc(
        [...this.getParsedChartData.map((item) => item.value)],
        _data.value,
        Number(this.chartHeight)
      );
    },
    initSVG() {
      if (this.getParsedChartData.length) {
        this.per = this.getParsedChartData.length;
        this.chartIsReady = true;
        this.setRectWidth();
      }
    },
  },
  mounted() {
    this.initSVG();
  },
});
</script>
<style lang="scss" scoped>
.column-chart {
  svg {
    transform: scaleY(-1);
    .rects {
      rect {
        fill: $primary-color;
        transition: height 0.2s;
        animation: heightEffect 0.5s forwards;

        &:hover {
          fill: $primary-color-light;
        }
      }
    }
  }
}
</style>
