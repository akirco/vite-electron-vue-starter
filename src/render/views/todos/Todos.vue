<template>
    <div class="w-full h-full" @contextmenu="fn">

    </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'

export default {
    setup() {
        const state = reactive({
            count: 0,
        })
        const fn = ()=>{
            console.log(1);
        }

        return {
            ...toRefs(state),
            fn
        }
    }
}
</script>

<style lang="scss" scoped>
</style>