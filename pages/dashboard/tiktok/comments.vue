<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Comentários do TikTok</h1>
        <NuxtLink to="/dashboard/tiktok" 
                  class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Voltar
        </NuxtLink>
      </div>
      <CommentManager :platform="'tiktok'" />
    </div>
  </div>
</template>

<script setup>
import CommentManager from '~/components/CommentManager.vue'
</script>
