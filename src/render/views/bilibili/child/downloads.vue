<template>
  <Table />
</template>

<script lang="ts">
import { reactive, toRefs } from "vue";
import Table from '@/components/table/table.vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
    });

    return {
      ...toRefs(state),
    };
  },
  components:{
    Table
  }
};
</script>

<style scoped>
</style>
