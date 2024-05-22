<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from 'vue'
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
import { test } from '@/api/test'
import { ref } from 'vue'
const info = ref()
const getInfo = async () => {
  const res = await test()
  console.log(res.data)
  info.value = res.data
}
getInfo()
</script>

<template>
  <h3>{{ info }}</h3>
  <h1>测试 vueUse 的鼠标坐标</h1>
  <h3>Mouse: {{ x }} x {{ y }}</h3>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
