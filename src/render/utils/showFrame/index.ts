import { ref } from "vue";

const platform = ref(process.platform === "win32");
// const platform = true

export default platform;
