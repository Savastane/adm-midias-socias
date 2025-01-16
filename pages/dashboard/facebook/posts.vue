<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Posts do Facebook</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/dashboard/facebook/comments" 
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Icon name="mdi:comment" class="w-5 h-5" />
          <span>Comentários</span>
        </NuxtLink>
        <NuxtLink to="/dashboard/facebook/config"
                  class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          Configuração
        </NuxtLink>
        <button @click="showScheduler = true"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Novo Post
        </button>
      </div>
    </div>

    <!-- Lista de Posts -->
    <div class="space-y-6 mb-6">
      <div v-for="post in paginatedPosts" :key="post.id" 
           class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4">
          <!-- Cabeçalho do Post -->
          <div class="flex items-center space-x-3 mb-4">
            <img :src="post.authorAvatar" alt="" class="w-10 h-10 rounded-full" />
            <div>
              <div class="font-semibold">{{ post.author }}</div>
              <div class="text-sm text-gray-500 flex items-center space-x-1">
                <span>{{ post.date }}</span>
                <span>•</span>
                <Icon name="mdi:earth" class="w-4 h-4" />
              </div>
            </div>
          </div>
          
          <!-- Conteúdo do Post -->
          <p class="text-gray-800 mb-4">{{ post.content }}</p>
          
          <!-- Imagem do Post -->
          <img v-if="post.image" :src="post.image" :alt="post.content" class="rounded-lg mb-4 w-full" />
          
          <!-- Contadores -->
          <div class="flex items-center justify-between text-sm text-gray-500 py-2 border-y">
            <div class="flex items-center space-x-2">
              <div class="flex -space-x-1">
                <div class="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                  <Icon name="mdi:thumb-up" class="w-3 h-3 text-white" />
                </div>
                <div class="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                  <Icon name="mdi:heart" class="w-3 h-3 text-white" />
                </div>
              </div>
              <button @click="showReactions(post)" class="hover:underline">
                {{ post.reactions }}
              </button>
            </div>
            <div class="flex items-center space-x-4">
              <button @click="showComments(post)" class="hover:underline">
                {{ post.comments.length }} comentários
              </button>
              <span>{{ post.shares }} compartilhamentos</span>
            </div>
          </div>
          
          <!-- Botões de Ação -->
          <div class="flex items-center justify-between pt-2">
            <button class="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <Icon name="mdi:thumb-up-outline" class="w-6 h-6" />
              <span>Curtir</span>
            </button>
            <button class="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <Icon name="mdi:comment-outline" class="w-6 h-6" />
              <span>Comentar</span>
            </button>
            <button class="flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-100 rounded-lg text-gray-500">
              <Icon name="mdi:share-outline" class="w-6 h-6" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Paginação -->
    <Pagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :total-items="posts.length"
      :items-per-page="itemsPerPage"
      variant="blue"
      @previous="previousPage"
      @next="nextPage"
      @page="goToPage"
    />

    <!-- Modal de Reações -->
    <UModal v-model="showReactionsModal">
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Reações</h2>
          <div class="flex space-x-2">
            <button class="p-2 rounded-full hover:bg-gray-100">
              <Icon name="mdi:thumb-up" class="w-6 h-6 text-blue-600" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-100">
              <Icon name="mdi:heart" class="w-6 h-6 text-red-500" />
            </button>
            <button class="p-2 rounded-full hover:bg-gray-100">
              <Icon name="mdi:emoticon-happy" class="w-6 h-6 text-yellow-500" />
            </button>
          </div>
        </div>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="reaction in selectedPost?.reactionsList" :key="reaction.id" 
               class="flex items-center justify-between py-2 border-b">
            <div class="flex items-center space-x-3">
              <img :src="reaction.avatar" :alt="reaction.name" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium">{{ reaction.name }}</p>
                <div class="flex items-center space-x-1 text-sm text-gray-500">
                  <Icon :name="reaction.icon" :class="reaction.color" class="w-4 h-4" />
                  <span>{{ reaction.type }}</span>
                </div>
              </div>
            </div>
            <button class="text-blue-600 hover:bg-blue-50 p-2 rounded-full">
              <Icon name="mdi:account-plus" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Comentários -->
    <UModal v-model="showCommentsModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Comentários</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="comment in selectedPost?.comments" :key="comment.id" class="border-b pb-4">
            <div class="flex space-x-3">
              <img :src="comment.avatar" :alt="comment.name" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="bg-gray-100 rounded-2xl px-4 py-2">
                  <p class="font-medium">{{ comment.name }}</p>
                  <p>{{ comment.text }}</p>
                </div>
                <div class="flex items-center space-x-4 mt-1 ml-2 text-sm">
                  <button class="text-gray-500 hover:text-gray-700">Curtir</button>
                  <button class="text-gray-500 hover:text-gray-700">Responder</button>
                  <span class="text-gray-500">{{ comment.time }}</span>
                </div>
                <!-- Respostas -->
                <div v-if="comment.replies?.length" class="mt-2 ml-6 space-y-3">
                  <div v-for="reply in comment.replies" :key="reply.id" class="flex space-x-3">
                    <img :src="reply.avatar" :alt="reply.name" class="w-8 h-8 rounded-full" />
                    <div>
                      <div class="bg-gray-100 rounded-2xl px-4 py-2">
                        <p class="font-medium">{{ reply.name }}</p>
                        <p>{{ reply.text }}</p>
                      </div>
                      <div class="flex items-center space-x-4 mt-1 ml-2 text-sm">
                        <button class="text-gray-500 hover:text-gray-700">Curtir</button>
                        <button class="text-gray-500 hover:text-gray-700">Responder</button>
                        <span class="text-gray-500">{{ reply.time }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Post Scheduler -->
    <PostScheduler
      v-model="showScheduler"
      platform="facebook"
      @post-scheduled="handlePostScheduled"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePostsStore } from '~/stores/posts'
import PostScheduler from '~/components/PostScheduler.vue'

const postsStore = usePostsStore()
const currentPage = ref(1)
const itemsPerPage = ref(5)
const showReactionsModal = ref(false)
const showCommentsModal = ref(false)
const selectedPost = ref(null)
const showScheduler = ref(false)

// Computed properties
const posts = computed(() => postsStore.facebookPosts)
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage.value))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return posts.value.slice(start, end)
})

// Load posts when component mounts
onMounted(async () => {
  await postsStore.fetchFacebookPosts()
})

// Pagination methods
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}

// Modal methods
function showReactions(post) {
  selectedPost.value = post
  showReactionsModal.value = true
}

function showComments(post) {
  selectedPost.value = post
  showCommentsModal.value = true
}

function handlePostScheduled() {
  // Atualizar a lista de posts após o agendamento
}
</script>
