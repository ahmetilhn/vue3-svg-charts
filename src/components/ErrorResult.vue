<template>
  <section class="error-result">
    <p>An error occurred while compiling the chart :(</p>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorResult",
});
</script>
<style lang="scss">
.error-result {
  text-align: center;
  font-size: 15px;
}
</style>
