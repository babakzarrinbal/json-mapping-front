<template>
  <div
    class="bg-dark"
    style="width:10px;user-select:none;user-drage:none;cursor:ew-resize;margin-top:-15px;margin-bottom:-15px"
    @mousedown="lock($event)"
    draggable="false"
    ref="dragger"
  ></div>
</template>

<script>
export default {
  data(){
    return{
      parentEle:null,
      width:0
    }
  },
  mounted(){
    this.parentEle = this.$refs.dragger.parentElement;

  },
  methods: {
    mouseup() {
      window.document.body.style.cursor = "";
      window.removeEventListener("mousemove", this.mousemove);
      window.removeEventListener("mouseup", this.mouseup);
    },
    mousemove(e) {
      let width = (e.clientX - this.containerOffset)/this.containerwidth;
      window.Math.round((width<0?0:(width>1?1:width))*100) + "%"
      this.$emit('mousemove',window.Math.round((width<0?0:(width>1?1:width))*100));
    },
    lock() {
      this.containerwidth = this.parentEle.offsetWidth;
      this.containerOffset = this.parentEle.offsetLeft;
      window.document.body.style.cursor = "ew-resize";

     window.addEventListener("mouseup", this.mouseup);
     window.addEventListener("mousemove", this.mousemove);
    }
  }
};
</script>

<style>
</style>