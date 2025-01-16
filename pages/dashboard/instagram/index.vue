<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard Instagram</h1>
      <NuxtLink 
        to="/dashboard/instagram/posts"
        class="flex items-center px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
      >
        <Icon name="mdi:instagram" class="w-5 h-5 mr-2" />
        Ver Posts
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Estatísticas -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Estatísticas</h2>
        <div class="space-y-4">
          <div>
            <p class="text-gray-600">Seguidores</p>
            <p class="text-2xl font-bold">5.8K</p>
          </div>
          <div>
            <p class="text-gray-600">Curtidas</p>
            <p class="text-2xl font-bold">12.4K</p>
          </div>
          <div>
            <p class="text-gray-600">Comentários</p>
            <p class="text-2xl font-bold">2.3K</p>
          </div>
        </div>
      </div>

      <!-- Feed -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Feed</h2>
        <div class="grid grid-cols-3 gap-2">
          <div v-for="post in recentPosts" :key="post.id" 
               class="aspect-square bg-gray-100 rounded relative group cursor-pointer">
            <img :src="post.image" alt="Post" class="w-full h-full object-cover rounded" />
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white space-x-4">
              <span>❤️ {{ post.likes }}</span>
              <span>💬 {{ post.comments }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Stories -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Stories</h2>
        <div class="space-y-4">
          <div v-for="story in stories" :key="story.id" class="flex items-center space-x-3 border-b pb-3">
            <div class="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
              <img :src="story.image" alt="Story" class="w-full h-full rounded-full border-2 border-white" />
            </div>
            <div>
              <p class="font-medium">{{ story.title }}</p>
              <p class="text-sm text-gray-600">{{ story.views }} visualizações</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentPosts = [
  { id: 1, image: 'https://via.placeholder.com/300', likes: 245, comments: 42 },
  { id: 2, image: 'https://via.placeholder.com/300', likes: 189, comments: 34 },
  { id: 3, image: 'https://via.placeholder.com/300', likes: 367, comments: 55 },
  { id: 4, image: 'https://via.placeholder.com/300', likes: 421, comments: 67 },
  { id: 5, image: 'https://via.placeholder.com/300', likes: 156, comments: 23 },
  { id: 6, image: 'https://via.placeholder.com/300', likes: 298, comments: 45 }
]

const stories = [
  { id: 1, title: 'Destaque do dia', views: '1.2K', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Bastidores', views: '987', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Novidades', views: '2.1K', image: 'https://via.placeholder.com/150' }
]
</script>
