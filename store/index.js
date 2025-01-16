export const state = () => ({
  auth: {
    isAuthenticated: false,
    connectedPlatforms: []
  },
  posts: {
    scheduled: [],
    published: []
  },
  metrics: {
    likes: {},
    comments: {}
  }
})

export const mutations = {
  SET_AUTH_STATUS(state, status) {
    state.auth.isAuthenticated = status
  },
  ADD_CONNECTED_PLATFORM(state, platform) {
    state.auth.connectedPlatforms.push(platform)
  },
  ADD_SCHEDULED_POST(state, post) {
    state.posts.scheduled.push(post)
  },
  UPDATE_METRICS(state, { platform, metrics }) {
    state.metrics = {
      ...state.metrics,
      [platform]: metrics
    }
  }
}

export const actions = {
  async connectPlatform({ commit }, platform) {
    try {
      // Implementar lógica de conexão com a plataforma
      commit('ADD_CONNECTED_PLATFORM', platform)
      commit('SET_AUTH_STATUS', true)
    } catch (error) {
      console.error('Error connecting platform:', error)
    }
  },

  async schedulePost({ commit }, { platform, content, date }) {
    try {
      // Implementar lógica de agendamento
      const post = {
        id: Date.now(),
        platform,
        content,
        scheduledDate: date,
        status: 'scheduled'
      }
      commit('ADD_SCHEDULED_POST', post)
      return post
    } catch (error) {
      console.error('Error scheduling post:', error)
      throw error
    }
  },

  async fetchMetrics({ commit }, platform) {
    try {
      // Implementar busca de métricas da API
      const metrics = await this.$axios.$get(`/api/${platform}/metrics`)
      commit('UPDATE_METRICS', { platform, metrics })
      return metrics
    } catch (error) {
      console.error('Error fetching metrics:', error)
      throw error
    }
  }
}
