<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">TikToks</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/dashboard/tiktok/comments" 
                  class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2">
          <Icon name="mdi:comment" class="w-5 h-5" />
          <span>Comentários</span>
        </NuxtLink>
        <button @click="showScheduler = true"
                class="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Novo TikTok
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="tiktok in tiktoks" :key="tiktok.id" class="bg-white rounded-lg shadow">
        <div class="relative">
          <img :src="tiktok.thumbnail" :alt="tiktok.description" class="w-full aspect-[9/16] object-cover rounded-t-lg" />
          <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-sm px-2 py-1 rounded flex items-center space-x-1">
            <Icon name="mdi:play" class="w-4 h-4" />
            <span>{{ tiktok.views }}</span>
          </div>
        </div>
        
        <div class="p-4">
          <p class="text-gray-800 mb-3 line-clamp-2">{{ tiktok.description }}</p>
          
          <div class="flex items-center space-x-2 text-sm text-gray-500 mb-3">
            <Icon name="mdi:music" class="w-4 h-4" />
            <span class="truncate">{{ tiktok.sound }}</span>
          </div>
          
          <div class="flex items-center justify-between text-gray-600">
            <button @click="showLikes(tiktok)" class="flex items-center space-x-2 hover:text-pink-500">
              <Icon name="mdi:heart" class="w-5 h-5" />
              <span>{{ tiktok.likes }}</span>
            </button>
            <button @click="showComments(tiktok)" class="flex items-center space-x-2 hover:text-pink-500">
              <Icon name="mdi:comment" class="w-5 h-5" />
              <span>{{ tiktok.comments.length }}</span>
            </button>
            <div class="flex items-center space-x-2">
              <Icon name="mdi:share" class="w-5 h-5" />
              <span>{{ tiktok.shares }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Likes -->
    <UModal v-model="showLikesModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Curtidas</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="like in selectedTiktok?.likesList" :key="like.id" 
               class="flex items-center justify-between border-b pb-2">
            <div class="flex items-center space-x-3">
              <img :src="like.avatar" :alt="like.username" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ like.username }}</p>
                <p class="text-sm text-gray-500">@{{ like.handle }}</p>
              </div>
            </div>
            <span class="text-sm text-gray-500">{{ like.date }}</span>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Comentários -->
    <UModal v-model="showCommentsModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Comentários</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="comment in selectedTiktok?.comments" :key="comment.id" class="border-b pb-4">
            <div class="flex items-start space-x-3">
              <img :src="comment.avatar" :alt="comment.username" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-medium">{{ comment.username }}</p>
                    <p class="text-sm text-gray-500">{{ comment.date }}</p>
                  </div>
                  <div class="flex items-center space-x-2 text-gray-500">
                    <button class="hover:text-pink-500">
                      <Icon name="mdi:heart" class="w-5 h-5" />
                    </button>
                    <span>{{ comment.likes }}</span>
                  </div>
                </div>
                <p class="mt-2 text-gray-800">{{ comment.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Post Scheduler -->
    <PostScheduler
      v-model="showScheduler"
      platform="tiktok"
      @post-scheduled="handlePostScheduled"
    />
  </div>
</template>

<script setup>
import PostScheduler from '~/components/PostScheduler.vue'
import { ref } from 'vue'

const showLikesModal = ref(false)
const showCommentsModal = ref(false)
const selectedTiktok = ref(null)
const showScheduler = ref(false)

const tiktoks = ref([
  {
    id: 1,
    description: 'Dicas incríveis para crescer no TikTok! 🚀 #DicasTikTok #Viral',
    thumbnail: 'https://via.placeholder.com/400x600',
    views: '10.2K',
    sound: 'Som original - Minha Conta',
    likes: 1234,
    likesList: [
      {
        id: 1,
        username: 'João Silva',
        handle: 'joaosilva',
        avatar: 'https://via.placeholder.com/100',
        date: '1h'
      },
      // ... mais curtidas
    ],
    comments: [
      {
        id: 1,
        username: 'Maria Santos',
        avatar: 'https://via.placeholder.com/100',
        text: 'Amei as dicas! 😍',
        date: '30m',
        likes: 45
      },
      // ... mais comentários
    ],
    shares: 89
  },
  // ... mais tiktoks
])

const showLikes = (tiktok) => {
  selectedTiktok.value = tiktok
  showLikesModal.value = true
}

const showComments = (tiktok) => {
  selectedTiktok.value = tiktok
  showCommentsModal.value = true
}

const handlePostScheduled = () => {
  // Atualizar a lista de TikToks após o agendamento
}
</script>
