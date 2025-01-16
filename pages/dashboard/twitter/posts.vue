<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Tweets</h1>
      <div class="flex space-x-3">
        <NuxtLink to="/dashboard/twitter/comments" 
                  class="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center space-x-2">
          <Icon name="mdi:comment" class="w-5 h-5" />
          <span>Comentários</span>
        </NuxtLink>
        <button @click="showScheduler = true"
                class="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors">
          Novo Tweet
        </button>
      </div>
    </div>

    <!-- Lista de Tweets -->
    <div class="space-y-4 mb-6">
      <div v-for="tweet in paginatedPosts" :key="tweet.id" 
           class="bg-white rounded-xl shadow-sm hover:bg-gray-50 transition-colors p-4">
        <div class="flex space-x-3">
          <img :src="tweet.profilePic" alt="Profile" class="w-12 h-12 rounded-full" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-1">
              <span class="font-bold truncate">{{ tweet.name }}</span>
              <span class="text-gray-500">@{{ tweet.handle }}</span>
              <span class="text-gray-500">·</span>
              <span class="text-gray-500">{{ tweet.time }}</span>
            </div>
            
            <p class="mt-2 text-gray-800 whitespace-pre-wrap">{{ tweet.content }}</p>
            
            <img v-if="tweet.image" 
                 :src="tweet.image" 
                 :alt="tweet.content" 
                 class="mt-3 rounded-2xl border border-gray-100 w-full" />
            
            <div class="flex items-center justify-between mt-4 text-gray-500 max-w-md">
              <button @click="showReplies(tweet)" 
                      class="flex items-center group">
                <div class="p-2 rounded-full group-hover:bg-sky-100 group-hover:text-sky-500">
                  <Icon name="mdi:comment-outline" class="w-5 h-5" />
                </div>
                <span class="ml-1 text-sm group-hover:text-sky-500">{{ tweet.replies }}</span>
              </button>
              
              <button @click="showRetweets(tweet)"
                      class="flex items-center group">
                <div class="p-2 rounded-full group-hover:bg-green-100 group-hover:text-green-500">
                  <Icon name="mdi:repeat" class="w-5 h-5" />
                </div>
                <span class="ml-1 text-sm group-hover:text-green-500">{{ tweet.retweets }}</span>
              </button>
              
              <button @click="showLikes(tweet)"
                      class="flex items-center group">
                <div class="p-2 rounded-full group-hover:bg-pink-100 group-hover:text-pink-500">
                  <Icon name="mdi:heart-outline" class="w-5 h-5" />
                </div>
                <span class="ml-1 text-sm group-hover:text-pink-500">{{ tweet.likes }}</span>
              </button>
              
              <button class="group">
                <div class="p-2 rounded-full group-hover:bg-sky-100 group-hover:text-sky-500">
                  <Icon name="mdi:share-variant-outline" class="w-5 h-5" />
                </div>
              </button>
            </div>
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
      variant="sky"
      @previous="previousPage"
      @next="nextPage"
      @page="goToPage"
    />

    <!-- Modal de Respostas -->
    <UModal v-model="showRepliesModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Respostas</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="reply in selectedTweet?.replyList" :key="reply.id" class="border-b pb-4">
            <div class="flex items-start space-x-3">
              <img :src="reply.avatar" :alt="reply.name" class="w-10 h-10 rounded-full" />
              <div class="flex-1">
                <div class="flex items-center space-x-2">
                  <span class="font-bold">{{ reply.name }}</span>
                  <span class="text-gray-500">@{{ reply.handle }}</span>
                  <span class="text-gray-500">·</span>
                  <span class="text-gray-500">{{ reply.time }}</span>
                </div>
                <p class="mt-1 text-gray-800">{{ reply.text }}</p>
                <div class="flex items-center space-x-4 mt-2">
                  <button class="text-gray-500 hover:text-sky-500">
                    <Icon name="mdi:comment-outline" class="w-4 h-4" />
                  </button>
                  <button class="text-gray-500 hover:text-green-500">
                    <Icon name="mdi:repeat" class="w-4 h-4" />
                  </button>
                  <button class="text-gray-500 hover:text-pink-500">
                    <Icon name="mdi:heart-outline" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Retweets -->
    <UModal v-model="showRetweetsModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Retweets</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="retweet in selectedTweet?.retweetList" :key="retweet.id" 
               class="flex items-center justify-between py-2 border-b">
            <div class="flex items-center space-x-3">
              <img :src="retweet.avatar" :alt="retweet.name" class="w-10 h-10 rounded-full" />
              <div>
                <div class="flex items-center space-x-1">
                  <span class="font-bold">{{ retweet.name }}</span>
                  <span class="text-gray-500">@{{ retweet.handle }}</span>
                </div>
                <p class="text-sm text-gray-500">{{ retweet.followers }} seguidores</p>
              </div>
            </div>
            <button class="px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-900">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Modal de Curtidas -->
    <UModal v-model="showLikesModal">
      <div class="p-4">
        <h2 class="text-xl font-semibold mb-4">Curtidas</h2>
        <div class="space-y-4 max-h-96 overflow-y-auto">
          <div v-for="like in selectedTweet?.likeList" :key="like.id" 
               class="flex items-center justify-between py-2 border-b">
            <div class="flex items-center space-x-3">
              <img :src="like.avatar" :alt="like.name" class="w-10 h-10 rounded-full" />
              <div>
                <div class="flex items-center space-x-1">
                  <span class="font-bold">{{ like.name }}</span>
                  <span class="text-gray-500">@{{ like.handle }}</span>
                </div>
                <p class="text-sm text-gray-500">{{ like.followers }} seguidores</p>
              </div>
            </div>
            <button class="px-4 py-1.5 bg-black text-white rounded-full hover:bg-gray-900">
              Seguir
            </button>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Post Scheduler -->
    <PostScheduler
      v-model="showScheduler"
      platform="twitter"
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
const itemsPerPage = ref(10)
const showLikesModal = ref(false)
const showRepliesModal = ref(false)
const selectedTweet = ref(null)
const showScheduler = ref(false)

// Computed properties
const posts = computed(() => postsStore.twitterPosts)
const totalPages = computed(() => Math.ceil(posts.value.length / itemsPerPage.value))
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return posts.value.slice(start, end)
})

// Load posts when component mounts
onMounted(async () => {
  await postsStore.fetchTwitterPosts()
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
function showLikes(tweet) {
  selectedTweet.value = tweet
  showLikesModal.value = true
}

function showReplies(tweet) {
  selectedTweet.value = tweet
  showRepliesModal.value = true
}

function handlePostScheduled() {
  // Atualizar a lista de tweets após o agendamento
}
</script>
