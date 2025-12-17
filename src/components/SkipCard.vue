<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { LinkInfo } from '@/types/llinks'

const userStore = useUserStore()
defineProps<{ msg: LinkInfo }>()
</script>

<template>
  <a :href="msg.url" target="_blank" class="link-card size-full flex flex-col">
    <div class="bg-image" :style="{ backgroundImage: `url(${msg.image})` }">
      <!-- <div class="">{{ msg.title }}</div> -->
    </div>
    <div class="">{{ msg.title }}</div>
  </a>
</template>

<style scoped>
.link-card {
  display: block;
}

.bg-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
</style>
