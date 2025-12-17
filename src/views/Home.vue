<script setup lang="ts">
import SkipCard from '@/components/SkipCard.vue'
import { ref, onMounted } from 'vue'
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
import { test } from '@/api/test'
import { LinkInfo } from '@/types/llinks'
const infos = ref<LinkInfo[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const loadLinksFromFile = async () => {
  try {
    loading.value = true
    error.value = null

    // 从 public 目录读取
    const response = await fetch('/links.json')

    if (!response.ok) {
      throw new Error(`Failed to load links: ${response.status}`)
    }

    const data = await response.json()
    infos.value = data

    // 可选：保存到 localStorage 作为缓存
    localStorage.setItem('links_cache', JSON.stringify(data))
    localStorage.setItem('links_cache_timestamp', Date.now().toString())
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'

    // 如果网络请求失败，尝试从缓存读取
    const cache = localStorage.getItem('links_cache')
    if (cache) {
      try {
        infos.value = JSON.parse(cache)
        console.warn('Using cached links due to fetch error')
      } catch (e) {
        // 缓存也无效，使用默认值
        // infos.value = [{ title: '备用链接', url: 'https://example.com' }]
      }
    }
  } finally {
    loading.value = false
  }
}

// 组件挂载时加载
onMounted(() => {
  loadLinksFromFile()
})
</script>

<template>
  <div class="flex flex-row space-x-12 mt-[35%]">
    <SkipCard
      v-for="(item, index) in infos"
      :key="index"
      :msg="item"
      class="card w-full h-full"
    ></SkipCard>
  </div>
  <router-view />
</template>

<style scoped>
.card {
  height: 200px;
  width: 200px;
  border-radius: 25%;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center

}
.card:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
  transform: scale(1.25)
}
</style>
