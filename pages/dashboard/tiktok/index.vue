<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard TikTok</h1>
      <NuxtLink 
        to="/dashboard/tiktok/posts"
        class="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        <Icon name="mdi:music-note" class="w-5 h-5 mr-2" />
        Ver TikToks
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Estatísticas -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Estatísticas</h2>
        <div class="space-y-4">
          <div>
            <p class="text-gray-600">Seguidores</p>
            <p class="text-2xl font-bold">25.8K</p>
          </div>
          <div>
            <p class="text-gray-600">Curtidas</p>
            <p class="text-2xl font-bold">142.3K</p>
          </div>
          <div>
            <p class="text-gray-600">Visualizações</p>
            <p class="text-2xl font-bold">789.5K</p>
          </div>
        </div>
      </div>

      <!-- Vídeos Populares -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Vídeos Populares</h2>
        <div class="space-y-4">
          <div v-for="video in popularVideos" :key="video.id" class="flex space-x-4 border-b pb-4">
            <div class="w-24 h-36 bg-gray-100 rounded-lg relative">
              <img :src="video.thumbnail" alt="Video thumbnail" class="w-full h-full object-cover rounded-lg" />
              <div class="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 rounded">
                {{ video.duration }}
              </div>
            </div>
            <div class="flex-1">
              <p class="font-medium line-clamp-2">{{ video.description }}</p>
              <div class="mt-2 space-y-1 text-sm">
                <div class="flex items-center space-x-2">
                  <span>♥️ {{ video.likes }}</span>
                  <span>💬 {{ video.comments }}</span>
                </div>
                <div class="flex items-center space-x-2">
                  <span>🔄 {{ video.shares }}</span>
                  <span>👁️ {{ video.views }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Análise de Hashtags -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Hashtags Populares</h2>
        <div class="space-y-4">
          <div v-for="hashtag in topHashtags" :key="hashtag.id" class="border-b pb-3">
            <div class="flex justify-between items-center">
              <div>
                <p class="font-medium">#{{ hashtag.name }}</p>
                <p class="text-sm text-gray-600">{{ hashtag.views }} visualizações</p>
              </div>
              <div class="text-sm">
                <span :class="[
                  'px-2 py-1 rounded',
                  hashtag.trending === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ hashtag.trending === 'up' ? '↑' : '↓' }} {{ hashtag.engagement }}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dicas de Hashtags -->
        <div class="mt-6">
          <h3 class="text-sm font-medium text-gray-600 mb-2">Hashtags Sugeridas</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="tag in suggestedTags" 
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const popularVideos = [
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/180x320',
    duration: '0:30',
    description: 'Dicas rápidas para crescer no TikTok! 🚀 #TikTokGrowth',
    likes: '45.2K',
    comments: '1.2K',
    shares: '8.5K',
    views: '256.8K'
  },
  {
    id: 2,
    thumbnail: 'https://via.placeholder.com/180x320',
    duration: '0:45',
    description: 'Tutorial: como fazer transições perfeitas ✨ #TikTokTutorial',
    likes: '32.1K',
    comments: '987',
    shares: '5.4K',
    views: '189.3K'
  },
  {
    id: 3,
    thumbnail: 'https://via.placeholder.com/180x320',
    duration: '0:15',
    description: 'Trend do momento! 🔥 #TrendingNow',
    likes: '67.8K',
    comments: '2.3K',
    shares: '12.1K',
    views: '423.5K'
  }
]

const topHashtags = [
  {
    id: 1,
    name: 'FYP',
    views: '2.5B',
    trending: 'up',
    engagement: 45
  },
  {
    id: 2,
    name: 'TrendingNow',
    views: '1.8B',
    trending: 'up',
    engagement: 32
  },
  {
    id: 3,
    name: 'Tutorial',
    views: '956M',
    trending: 'down',
    engagement: 12
  }
]

const suggestedTags = [
  'viral',
  'trending',
  'foryou',
  'dance',
  'music',
  'comedy',
  'tutorial'
]
</script>
