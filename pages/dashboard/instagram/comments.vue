<template>
  <div class="min-h-screen bg-gray-50 py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-900">Comentários do Instagram</h1>
        <NuxtLink to="/dashboard/instagram" 
                  class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors">
          Voltar
        </NuxtLink>
      </div>
      <CommentManager :platform="'instagram'" />
    </div>
  </div>
</template>

<script setup>
import CommentManager from '~/components/CommentManager.vue'
</script>
