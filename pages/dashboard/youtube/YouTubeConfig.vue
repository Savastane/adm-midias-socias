<template>
  <div>
    <h2>YouTube Configuration</h2>
    <form @submit.prevent="saveConfig">
      <label for="apiKey">API Key:</label>
      <input type="text" id="apiKey" v-model="config.apiKey" required />
      <button type="submit">Save</button>
    </form>
    <NuxtLink to="/dashboard/youtube/config"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      Configuração
    </NuxtLink>
    <NuxtLink to="/dashboard/youtube/config"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      Configuração
    </NuxtLink>
    <NuxtLink to="/dashboard/youtube/videos"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
      Ver Vídeos
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        apiKey: ''
      }
    };
  },
  methods: {
    saveConfig() {
      // Save the config to the server or local storage
      console.log('YouTube config saved:', this.config);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
