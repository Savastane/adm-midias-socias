<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-semibold">Dashboard Twitter</h1>
      
      <NuxtLink 
        to="/dashboard/twitter/posts"
        class="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
      >
        <Icon name="mdi:twitter" class="w-5 h-5 mr-2" />
        Ver Tweets
      </NuxtLink>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Estatísticas -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Estatísticas</h2>
        <div class="space-y-4">
          <div>
            <p class="text-gray-600">Seguidores</p>
            <p class="text-2xl font-bold">8.2K</p>
          </div>
          <div>
            <p class="text-gray-600">Tweets</p>
            <p class="text-2xl font-bold">1.4K</p>
          </div>
          <div>
            <p class="text-gray-600">Menções</p>
            <p class="text-2xl font-bold">256</p>
          </div>
        </div>
      </div>

      <!-- Tweets Recentes -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Tweets Recentes</h2>
        <div class="space-y-4">
          <div v-for="tweet in recentTweets" :key="tweet.id" class="border-b pb-4">
            <p class="font-medium">{{ tweet.content }}</p>
            <div class="flex space-x-4 mt-2 text-sm text-gray-600">
              <span>🔄 {{ tweet.retweets }}</span>
              <span>❤️ {{ tweet.likes }}</span>
              <span>💬 {{ tweet.replies }}</span>
            </div>
            <p class="text-sm text-gray-500 mt-1">{{ tweet.date }}</p>
          </div>
        </div>
      </div>

      <!-- Tendências -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-lg font-medium mb-4">Tendências</h2>
        <div class="space-y-4">
          <div v-for="trend in trends" :key="trend.id" class="border-b pb-3">
            <p class="font-medium text-blue-500">#{{ trend.hashtag }}</p>
            <p class="text-sm text-gray-600">{{ trend.tweets }} tweets</p>
            <div class="mt-1 text-xs">
              <span :class="[
                'px-2 py-1 rounded',
                trend.trending === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ trend.trending === 'up' ? '↑' : '↓' }} {{ trend.change }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const recentTweets = [
  {
    id: 1,
    content: 'Acabamos de lançar nossa nova feature! 🚀 Confira agora mesmo!',
    retweets: 45,
    likes: 123,
    replies: 12,
    date: '2h atrás'
  },
  {
    id: 2,
    content: 'Dicas importantes para seu negócio crescer nas redes sociais! #Marketing #SocialMedia',
    retweets: 32,
    likes: 98,
    replies: 8,
    date: '5h atrás'
  },
  {
    id: 3,
    content: 'Respondendo algumas dúvidas frequentes sobre nossa plataforma... 🤔',
    retweets: 21,
    likes: 76,
    replies: 15,
    date: '8h atrás'
  }
]

const trends = [
  {
    id: 1,
    hashtag: 'Marketing',
    tweets: '12.5K',
    trending: 'up',
    change: 23
  },
  {
    id: 2,
    hashtag: 'SocialMedia',
    tweets: '8.2K',
    trending: 'up',
    change: 15
  },
  {
    id: 3,
    hashtag: 'DigitalMarketing',
    tweets: '5.4K',
    trending: 'down',
    change: 8
  }
]
</script>
