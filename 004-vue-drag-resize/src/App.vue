<template>
  <div id="app">
    <HelloWorld />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style lang="scss">
#app {
  border: 1px solid #ccc;
  width: 500px;
  height: 400px;
  position: relative;
  box-sizing: border-box;
}
</style>
