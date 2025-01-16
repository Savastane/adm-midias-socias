<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard Facebook</h1>
      <NuxtLink 
        to="/dashboard/facebook/posts"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Icon name="mdi:facebook" class="w-5 h-5 mr-2" />
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
            <p class="text-2xl font-bold">1.2K</p>
          </div>
          <div>
            <p class="text-gray-600">Curtidas</p>
            <p class="text-2xl font-bold">3.4K</p>
          </div>
          <div>
            <p class="text-gray-600">Compartilhamentos</p>
            <p class="text-2xl font-bold">856</p>
          </div>
        </div>
      </div>

      <!-- Posts Recentes -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Posts Recentes</h2>
        <div class="space-y-4">
          <div v-for="post in recentPosts" :key="post.id" class="border-b pb-4">
            <p class="font-medium">{{ post.title }}</p>
            <p class="text-sm text-gray-600">{{ post.date }}</p>
            <div class="flex space-x-4 mt-2">
              <span class="text-sm text-gray-500">👍 {{ post.likes }}</span>
              <span class="text-sm text-gray-500">💬 {{ post.comments }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Agendamentos -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Agendamentos</h2>
        <div class="space-y-4">
          <div v-for="schedule in schedules" :key="schedule.id" class="border-b pb-4">
            <p class="font-medium">{{ schedule.title }}</p>
            <p class="text-sm text-gray-600">{{ schedule.date }}</p>
            <span :class="[
              'px-2 py-1 text-xs rounded',
              schedule.status === 'Agendado' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
            ]">
              {{ schedule.status }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentPosts = [
  { id: 1, title: 'Novidades da semana', date: '14 Dez 2023', likes: 45, comments: 12 },
  { id: 2, title: 'Promoção especial', date: '13 Dez 2023', likes: 89, comments: 24 },
  { id: 3, title: 'Dicas úteis', date: '12 Dez 2023', likes: 67, comments: 15 }
]

const schedules = [
  { id: 1, title: 'Post sobre produtos', date: '16 Dez 2023 14:00', status: 'Agendado' },
  { id: 2, title: 'Anúncio de evento', date: '17 Dez 2023 10:00', status: 'Agendado' },
  { id: 3, title: 'Dicas da semana', date: '15 Dez 2023 16:00', status: 'Publicado' }
]
</script>
