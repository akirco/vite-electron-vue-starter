<template>
    <div class="w-[200px] h-full p-2 bg-PlightBgColor dark:bg-PdarkBgColor flex flex-col">
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="按钮" @click="toggleDark"></btn>
        <btn title="Dark" @click="toggleDark"></btn>

    </div>
</template>



<script lang="ts">
import { reactive, toRefs, defineComponent } from 'vue'
import btn from "@/components/button/btn.vue";
import ipcRenderer from "@/utils/ipcRenderer";


export default defineComponent({
    setup() {
        // * data
        const state = reactive({
            count: 0,
        })
        // * functions
        const toggleDark = () => {
            ipcRenderer.invoke<string>("dark-mode:toggle");
        }

        return {
            ...toRefs(state),
            toggleDark
        }
    },
    components: {
        btn
    }
})
</script>