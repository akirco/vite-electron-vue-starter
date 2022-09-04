<template>
  <div id="predownload" class="h-[98%]">
    <div
      id="input_region"
      class="pt-2 pl-2 border-2 border-dashed border-dark-50 m-2 dark:border-gray-700"
    >
      <input
        v-model="rawUrl"
        type="text"
        placeholder="Type here"
        class="input input-bordered input-md w-full"
      />
      <div class="pl-4">
        <button
          @click="fetchVideo"
          class="btn gap-2 btn-accent dark:text-gray-700"
        >
          <FilterIcon class="h-6 w-6" />
          解析视频
        </button>
      </div>
      <!-- end1 -->
      <select class="select select-bordered w-full">
        <option disabled selected>Who shot first?</option>
        <option>Han Solo</option>
        <option>Greedo</option>
      </select>
      <div class="pl-4">
        <button class="btn gap-2 btn-accent dark:text-gray-700">
          <DocumentDownloadIcon class="h-6 w-6" />
          下载视频
        </button>
      </div>
      <!-- end2 -->
    </div>
    <div class="flex justify-center items-center">
      <videoPlay v-bind="options" :poster="options.cover" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent, ref } from "vue";
import { DocumentDownloadIcon, FilterIcon } from "@heroicons/vue/solid";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";
import request from "@/api/request";

export default defineComponent({
  setup() {
    const options = reactive({
      width: "98%", //播放器高度
      height: "98%", //播放器高度
      color: "#409eff", //主题色
      title: "测试", //视频名称
      cover: "https://cdn.jsdelivr.net/gh/xdlumia/files/video-play/ironMan.jpg",
      src: "https://vjs.zencdn.net/v/oceans.mp4", //视频源
      muted: false, //静音
      webFullScreen: false,
      speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
      autoPlay: false, //自动播放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: false, //关灯模式
      volume: 0.3, //默认音量大小
      control: true, //是否显示控制
      controlBtns: [
        "audioTrack",
        "quality",
        "speedRate",
        "volume",
        "setting",
        "pip",
        "pageFullScreen",
        "fullScreen",
      ], //显示所有按钮,
    });
    const rawUrl = ref("");
    const fetchVideo = async () => {
      if (rawUrl.value === "") {
        alert("你大爷，请输入视频地址");
      } else {
        const originUrl =
          /http[s]?:\/\/[\w.]+[\w/]*[\w.]*\??[\w=&:\-+%]*[/]*/.exec(
            rawUrl.value
          );
        const result = await request.get(
          `https://tenapi.cn/video/?url=${originUrl[0]}`
        );
        if (result.code === 200) {
          const data = await request.download(result.cover, {});
          console.log(data);
        }
      }
    };

    return {
      options,
      rawUrl,
      fetchVideo,
    };
  },
  components: {
    DocumentDownloadIcon,
    FilterIcon,
    videoPlay,
  },
});
</script>

<style scoped>
#predownload {
  display: grid;
  grid-template-rows: 20% 80%;
}

#input_region {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 80% 20%;
}
/* 外部播放器组件样式 */
#refPlayerWrap {
  border-radius: 12px;
  padding: 2px;
  border: 2px dashed #282c34;
}
</style>
