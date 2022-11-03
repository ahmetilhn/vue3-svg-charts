export default {
  data() {
    return {
      tooltip: {
        position: {
          left: 0,
          top: 0,
        },
        display: "none",
        content: "",
      },
    };
  },
  methods: {
    hoverTooltip(domEvent, payload) {
      this.tooltip.position.left = domEvent.offsetX + 10 + "px";
      this.tooltip.position.top = domEvent.offsetY - 70 + "px";
      this.tooltip.display = "flex";
      if (payload.content) {
        this.tooltip.content = payload.content;
      }
    },
  },
};
