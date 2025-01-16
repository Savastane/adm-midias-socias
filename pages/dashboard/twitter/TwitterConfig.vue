<template>
  <div>
    <h2>Twitter Configuration</h2>
    <form @submit.prevent="saveConfig">
      <label for="apiKey">API Key:</label>
      <input type="text" id="apiKey" v-model="config.apiKey" required />
      <label for="apiSecret">API Secret:</label>
      <input type="text" id="apiSecret" v-model="config.apiSecret" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        apiKey: '',
        apiSecret: ''
      }
    };
  },
  methods: {
    saveConfig() {
      // Save the config to the server or local storage
      console.log('Twitter config saved:', this.config);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
