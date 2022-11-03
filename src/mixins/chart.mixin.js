export default {
  data() {
    return {
      tooltip: {
        position: {
          left: 0,
          top: 0,
        },
        display: "none",
      },
    };
  },
  methods: {
    hoverTooltip(e) {
      this.tooltip.position.left = e.offsetX + 10 + "px";
      this.tooltip.position.top = e.offsetY - 70 + "px";
      this.tooltip.display = "flex";
    },
  },
};
