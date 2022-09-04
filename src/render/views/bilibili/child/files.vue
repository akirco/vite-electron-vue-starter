<template>
  <div
    class="h-[98%] border-2 border-dashed border-dark-50 m-2 dark:border-gray-700"
  ></div>
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped></style>
