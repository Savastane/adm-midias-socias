<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Comentários do Twitter</h1>
        <NuxtLink to="/dashboard/twitter" 
                  class="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
          Voltar
        </NuxtLink>
      </div>
      <CommentManager :platform="'twitter'" />
    </div>
  </div>
</template>

<script setup>
import CommentManager from '~/components/CommentManager.vue'
</script>
