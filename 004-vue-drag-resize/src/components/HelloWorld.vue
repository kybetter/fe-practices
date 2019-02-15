<template>
  <div ref="box" class="box" @mousedown.prevent.stop="onMouseDown">
    <!-- <div class="top"></div> -->
      <!-- <div class="left"></div> -->
      <div @mousedown.prevent.stop="onRightMouseDown" class="right"></div>
      <div @mousedown.prevent.stop="onBottomMouseDown" class="bottom"></div>
      <!-- <div class="top-left"></div> -->
      <!-- <div class="top-right"></div> -->
      <!-- <div class="bottom-left"></div> -->
      <div @mousedown.prevent.stop="onBottomRightMouseDown" class="bottom-right"></div>
  </div>
</template>

<script>
export default {
  name: 'dragBox',
  data() {
    return {
      el: null,
    }
  },
  mounted() {
    this.el = this.el || this.$refs.box;
    this.el.style.setProperty("transform", "translate(0px, 0px)");
  },
  methods: {
    getXY(data) {
      const res = /translate\((\d+)px, (\d+)px\)/.exec(data);
      return res && [res[1], res[2]] || [0, 0];
    },
    onMouseDown(e) {
      const [x, y] = this.getXY(this.el.style.transform);
      document.onmousemove = me => this.onDragMove(me, [e.clientX - x, e.clientY - y]);
      document.onmouseup = this.onMouseUp;
    },
    onDragMove(e, XY) {
      this.el.style.transform = `translate(${e.clientX - XY[0]}px, ${e.clientY - XY[1]}px)`;
    },
    onRightMouseDown(e) {
      const oldWidth = Number(window.getComputedStyle(this.el).width.replace('px', ''));
      document.onmousemove = me => {
        this.el.style.width = `${oldWidth + me.x - e.x}px`;
      }
      document.onmouseup = this.onMouseUp;
    },
    onBottomMouseDown(e) {
      const oldHeight = Number(window.getComputedStyle(this.el).height.replace('px', ''));
      document.onmousemove = me => {
        this.el.style.height = `${oldHeight + me.y - e.y}px`;
      }
      document.onmouseup = this.onMouseUp;
    },
    onBottomRightMouseDown(e) {
      const oldWidth = Number(window.getComputedStyle(this.el).width.replace('px', ''));
      const oldHeight = Number(window.getComputedStyle(this.el).height.replace('px', ''));
      document.onmousemove = me => {
        this.el.style.width = `${oldWidth + me.x - e.x}px`;
        this.el.style.height = `${oldHeight + me.y - e.y}px`;
      }
      document.onmouseup = this.onMouseUp;
    },
    onMouseUp() {
     document.onmousemove = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  width: 100px;
  height: 100px;
  background: skyblue;
  transform: translate(0px, 0px);
  cursor: move;
  // position: relative;
  position: absolute;
  // top: 0;
  // left: 0;
}
.box .top {
  width: 100%;
  height: 5px;
  position: absolute;
  top: -2px;
  left: 0;
  cursor: row-resize;
}
.box .bottom {
  width: 100%;
  height: 5px;
  position: absolute;
  bottom: -2px;
  left: 0;
  cursor: row-resize;
}
.box .left {
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -2px;
  cursor: col-resize;
}
.box .right {
  width: 5px;
  height: 100%;
  position: absolute;
  top: 0;
  right: -2px;
  cursor: col-resize;
}
.box .top-left {
  width: 5px;
  height: 5px;
  position: absolute;
  top: -2px;
  left: -2px;
  z-index: 2;
  cursor: nwse-resize;
}
.box .top-right {
  width: 5px;
  height: 5px;
  position: absolute;
  top: -2px;
  right: -2px;
  z-index: 2;
  cursor: nesw-resize;
}
.box .bottom-left {
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: -2px;
  left: -2px;
  z-index: 2;
  cursor: nesw-resize;
}
.box .bottom-right {
  width: 5px;
  height: 5px;
  position: absolute;
  bottom: -2px;
  right: -2px;
  z-index: 3;
  cursor: nwse-resize;
}
</style>
