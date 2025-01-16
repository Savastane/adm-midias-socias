<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard YouTube</h1>
      <NuxtLink to="/dashboard/youtube/config"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      Configuração
    </NuxtLink>
      <NuxtLink 
        to="/dashboard/youtube/posts"
        class="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        <Icon name="mdi:youtube" class="w-5 h-5 mr-2" />
        Ver Vídeos
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Estatísticas -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Estatísticas do Canal</h2>
        <div class="space-y-4">
          <div>
            <p class="text-gray-600">Inscritos</p>
            <p class="text-2xl font-bold">10.5K</p>
          </div>
          <div>
            <p class="text-gray-600">Visualizações Totais</p>
            <p class="text-2xl font-bold">458.2K</p>
          </div>
          <div>
            <p class="text-gray-600">Horas Assistidas</p>
            <p class="text-2xl font-bold">25.4K</p>
          </div>
        </div>
      </div>

      <!-- Vídeos Recentes -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Vídeos Recentes</h2>
        <div class="space-y-4">
          <div v-for="video in recentVideos" :key="video.id" class="flex space-x-4 border-b pb-4">
            <div class="w-32 h-20 bg-gray-100 rounded relative">
              <img :src="video.thumbnail" alt="Video thumbnail" class="w-full h-full object-cover rounded" />
              <span class="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                {{ video.duration }}
              </span>
            </div>
            <div>
              <p class="font-medium line-clamp-2">{{ video.title }}</p>
              <div class="flex space-x-4 mt-2 text-sm text-gray-600">
                <span>👁️ {{ video.views }}</span>
                <span>👍 {{ video.likes }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Analytics -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Analytics</h2>
        <div class="space-y-6">
          <div>
            <h3 class="text-sm font-medium text-gray-600 mb-2">Origem do Tráfego</h3>
            <div class="space-y-2">
              <div v-for="source in trafficSources" :key="source.name" class="flex justify-between">
                <span class="text-sm">{{ source.name }}</span>
                <span class="text-sm font-medium">{{ source.percentage }}%</span>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-600 mb-2">Retenção de Audiência</h3>
            <div class="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-red-500" style="width: 65%"></div>
            </div>
            <p class="text-sm text-gray-600 mt-1">Média: 65%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentVideos = [
  {
    id: 1,
    title: 'Como aumentar seu engajamento no YouTube',
    thumbnail: 'https://via.placeholder.com/320x180',
    duration: '12:34',
    views: '2.3K',
    likes: 245
  },
  {
    id: 2,
    title: 'Dicas para crescer seu canal',
    thumbnail: 'https://via.placeholder.com/320x180',
    duration: '8:56',
    views: '1.8K',
    likes: 189
  },
  {
    id: 3,
    title: 'Tutorial: edição de vídeo profissional',
    thumbnail: 'https://via.placeholder.com/320x180',
    duration: '15:21',
    views: '3.4K',
    likes: 412
  }
]

const trafficSources = [
  { name: 'Pesquisa YouTube', percentage: 45 },
  { name: 'Sugestões', percentage: 30 },
  { name: 'Links externos', percentage: 15 },
  { name: 'Outros', percentage: 10 }
]
</script>
