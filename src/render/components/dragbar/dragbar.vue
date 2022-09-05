<template>
  <div class="drag" :style="{
    width: dragWidth + 'px',
    height: dragHeight + 'px',
  }">
    <div @mousedown.self="dragStart($event)" class="dweb-drag-bar">
      <div class="onOff shadow" @click="openCloseParent" @mousedown="onOffStyle" @mouseup="onOffStyle"
        @mouseleave="onOffCancle" @touchstart="onOffStyle" @touchend="onOffStyle" @touchcancel="onOffCancle" :style="{
          opacity: onOffOpacity,
          marginLeft: onOffMarginLeft + 'px',
          marginTop: onOffMarginTop + 'px',
          transform: 'rotate(' + onOffRotate + 'deg)',
        }"></div>
    </div>
    <div v-if="dragType" @mousemove="dragMove($event)" @mouseup.self="dragCancel()" @mouseout.self="dragCancel()"
      class="dragcover" :style="{
        zIndex: dragCoverZIndex,
        width: parentWidth + 'px',
        height: parentHeight + 'px',
        left: dragCoverOffsetLeft + 'px',
        top: dragCoverOffsetTop + 'px',
        cursor: dragCoverCursor,
      }"></div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from "vue";
import { useCurrentElement } from "@vueuse/core";
import anime from "animejs/lib/anime.es";
export default defineComponent({
  name: "DragBar",
  props: {
    minWidth: {
      type: Number,
      default: 200,
    },
    dragDir: {
      type: String,
      default: "right",
    },
  },
  setup(props: any,{emit}) {
    const minWidth = ref(props.minWidth);
    const dragDir = props.dragDir;
    const dragWidth = ref(0);
    const dragHeight = ref(0);
    const onOffRotate = ref(0);

    const onOffOpacity = ref(1);

    const parentWidth = ref(0);
    const parentHeight = ref(0);
    let parentOffsetLeft = 0;
    let parentOffsetTop = 0;
    const dragType = ref(false);
    const dragCoverZIndex = ref(-1);
    const dragCoverOffsetLeft = ref(0);
    const dragCoverOffsetTop = ref(0);
    const dragCoverCursor = ref("w-resize");
    const openCloseType = ref(true);
    const onOffMarginLeft = ref(0);
    const onOffMarginTop = ref(0);

    const default_parent_width = ref(0);
    const default_parent_height = ref(0);
    const default_parent_offsetLeft = ref(0);
    const default_parent_offsetTop = ref(0);

    let dragStartNum_x = 0;
    let dragStartNum_y = 0;

    onMounted(() => {
      parentDom = element.value.parentElement;
      default_parent_width.value = parentDom!.clientWidth;
      default_parent_height.value = parentDom!.clientHeight;
      default_parent_offsetLeft.value = parentDom!.offsetLeft;
      default_parent_offsetTop.value = parentDom!.offsetTop;

      parentWidth.value = parentDom!.clientWidth;
      parentHeight.value = parentDom!.clientHeight;
      parentOffsetLeft = parentDom!.offsetLeft;
      parentOffsetTop = parentDom!.offsetTop;
      checkAllDomTop(parentDom!.parentElement!);
      currentDom = element.value;
      switch (dragDir) {
        case "right":
          // @ts-ignore
          currentDom.style.right = 0;
          dragWidth.value = 0;
          dragHeight.value = parentHeight.value;
          dragCoverOffsetLeft.value = -parentWidth.value / 2 + 5;
          dragCoverCursor.value = "w-resize";
          break;
        case "left":
          // @ts-ignore
          currentDom.style.left = 0;
          dragWidth.value =0;
          dragHeight.value = parentHeight.value;
          dragCoverOffsetLeft.value = -parentWidth.value / 2 + 5;
          dragCoverCursor.value = "w-resize";
          break;
        case "top":
          // @ts-ignore
          currentDom.style.top = 0;
          dragWidth.value = parentWidth.value;
          dragHeight.value = 10;
          onOffRotate.value = 90;
          dragCoverOffsetTop.value = -parentHeight.value / 2 + 5;
          dragCoverCursor.value = "n-resize";
          break;
        case "bottom":
          // @ts-ignore
          currentDom.style.bottom = 0;
          dragWidth.value = parentWidth.value;
          dragHeight.value = 10;
          onOffRotate.value = 90;
          dragCoverOffsetTop.value = -parentHeight.value / 2 + 5;
          dragCoverCursor.value = "n-resize";
          break;
        default:
          break;
      }
    });

    const element = useCurrentElement();
    let parentDom: HTMLElement | null = null;
    let currentDom: Element | null = null;

    //展开收起父级框体
    function openCloseParent() {
      openCloseType.value = !openCloseType.value;
      emit("on-change", openCloseType.value)
      switch (dragDir) {
        case "right":
          anime({
            targets: parentDom!,
            translateX: openCloseType.value ? 0 : parentDom!.clientWidth * -1,
            duration: 300,
            easing: "easeOutQuad",
            begin: () => {
              openCloseType.value
                ? (onOffMarginLeft.value = 0)
                : (onOffMarginLeft.value = 20);
            },
          });
          break;
        case "left":
          anime({
            targets: parentDom!,
            translateX: openCloseType.value ? 0 : parentDom!.clientWidth,
            duration: 300,
            easing: "easeOutQuad",
            begin: () => {
              openCloseType.value
                ? (onOffMarginLeft.value = 0)
                : (onOffMarginLeft.value = -20);
            },
          });
          break;
        case "top":
          anime({
            targets: parentDom!,
            translateY: openCloseType.value ? 0 : parentDom!.clientHeight,
            duration: 300,
            easing: "easeOutQuad",
            begin: () => {
              openCloseType.value
                ? (onOffMarginTop.value = 0)
                : (onOffMarginTop.value = -20);
            },
          });
          break;
        case "bottom":
          anime({
            targets: parentDom!,
            translateY: openCloseType.value ? 0 : -parentDom!.clientHeight,
            duration: 300,
            easing: "easeOutQuad",
            begin: () => {
              openCloseType.value
                ? (onOffMarginTop.value = 0)
                : (onOffMarginTop.value = 20);
            },
          });
          break;

        default:
          break;
      }
    }

    //开始拖拽
    function dragStart(e: MouseEvent) {
      console.log(e);
      dragType.value = true;
      dragCoverZIndex.value = 9999;
      dragStartNum_x = e.x;
      dragStartNum_y = e.y;
    }
    //开始移动
    function dragMove(e: MouseEvent) {
      if (dragType.value && parentDom) {
        let mouseX = e.x;
        let mouseY = e.y;
        let offsetMove_x = mouseX - dragStartNum_x;
        let offsetMove_y = mouseY - dragStartNum_y;
        let width = mouseX - parentOffsetLeft;
        let height = mouseY - parentOffsetTop;
        let nowWidth_parent = parentDom.clientWidth;
        let nowHeight_parent = parentDom.clientHeight;
        let nowOffseLeft_parent = parentDom.offsetLeft;
        let nowOffsetTop_parent = parentDom.offsetTop;
        switch (dragDir) {
          case "right":
            if (width >= minWidth.value) {
              console.log(width + " width");
              console.log(parentOffsetLeft + " offset");
              console.log(default_parent_width.value + " default");
              nowWidth_parent += offsetMove_x;
              parentDom.style.width = nowWidth_parent + "px";
              parentDom.style.left = nowOffseLeft_parent + "px";
            } else {
              parentDom.style.width = default_parent_width.value + "px";
              parentDom.style.left = default_parent_offsetLeft.value + "px";
            }
            break;
          case "left":
            if (width <= 0) {
              nowWidth_parent -= offsetMove_x;
              parentDom.style.width = nowWidth_parent + "px";
              parentDom.style.left = nowOffseLeft_parent + offsetMove_x + "px";
            } else {
              parentDom.style.width = default_parent_width.value + "px";
              parentDom.style.left = default_parent_offsetLeft.value + "px";
            }
            break;
          case "top":
            if (height < 0) {
              nowHeight_parent -= offsetMove_y;
              parentDom.style.height = nowHeight_parent + "px";
              parentDom.style.top = nowOffsetTop_parent + offsetMove_y + "px";
              if (-height >= default_parent_offsetTop.value - 20) {
                parentDom.style.top = 0 + "px";
                parentDom.style.height =
                  default_parent_height.value + default_parent_offsetTop.value + "px";
              }
            } else {
              parentDom.style.height = default_parent_height.value + "px";
              parentDom.style.top = default_parent_offsetTop.value + "px";
            }
            break;
          case "bottom":
            if (height > default_parent_height.value) {
              nowHeight_parent += offsetMove_y;
              parentDom.style.height = nowHeight_parent + "px";
              parentDom.style.bottom = nowOffsetTop_parent + offsetMove_y + "px";
              if (-height >= default_parent_offsetTop.value - 20) {
                parentDom.style.top = 0 + "px";
                parentDom.style.height =
                  default_parent_height.value + default_parent_offsetTop.value + "px";
              }
            } else {
              parentDom.style.height = default_parent_height.value + "px";
              parentDom.style.top = default_parent_offsetTop.value + "px";
            }
            break;

          default:
            break;
        }
        dragStartNum_x = mouseX;
        dragStartNum_y = mouseY;
      }
    }
    //结束拖拽
    function dragCancel() {
      //@ts-ignore
      currentDom!.style.width = "10px";
      dragType.value = false;
      dragCoverZIndex.value = -1;
    }

    function onOffStyle() {
      if (onOffOpacity.value == 1) {
        onOffOpacity.value = 0.5;
      } else {
        onOffOpacity.value = 1;
      }
    }

    function onOffCancle() {
      onOffOpacity.value = 1;
    }

    function checkAllDomTop(parentDom: HTMLElement) {
      if (parentDom.parentElement) {
        parentOffsetTop += parentDom.parentElement.offsetTop;
        checkAllDomTop(parentDom.parentElement);
      } else {
        return;
      }
    }

    return {
      onOffStyle,
      onOffCancle,
      dragStart,
      dragMove,
      dragCancel,
      dragType,
      dragCoverZIndex,
      onOffMarginLeft,
      onOffMarginTop,
      dragWidth,
      dragHeight,
      openCloseParent,
      onOffOpacity,
      onOffRotate,
      parentWidth,
      parentHeight,
      dragCoverOffsetLeft,
      dragCoverOffsetTop,
      dragCoverCursor,
    };
  },
});
</script>

<style scoped>
.drag {
  position: absolute;
}

.dweb-drag-bar {
  width: 100%;
  background: #2b2f3b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.onOff {
  min-width: 20px;
  height: 60px;
  border-radius: 5px;
  /* background: #373d4d; */
  box-shadow: 0 10px 15px -3px rgba(4, 4, 4, 0.6), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}


.onOff::before {
  content: "|||";
  color: #727584;
  font-size: 12px;
}

.onOff img {
  width: 100%;
}

.dragcover {
  height: 100%;
  position: absolute;
  top: 0;
  z-index: -9999;
}
</style>
