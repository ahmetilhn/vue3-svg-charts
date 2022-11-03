import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      tooltip: {
        position: {
          left: "0px",
          top: "0px",
        },
        display: "none",
        content: "",
      },
    };
  },
  methods: {
    hoverTooltip(mouseEvent: MouseEvent, content: string) {
      this.tooltip.position.left = mouseEvent.offsetX + 10 + "px";
      this.tooltip.position.top = mouseEvent.offsetY - 70 + "px";
      this.tooltip.display = "flex";
      if (content) {
        this.tooltip.content = content;
      }
    },
  },
});
