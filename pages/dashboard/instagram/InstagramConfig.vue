<template>
  <div>
    <h2>Instagram Configuration</h2>
    <form @submit.prevent="saveConfig">
      <label for="accessToken">Access Token:</label>
      <input type="text" id="accessToken" v-model="config.accessToken" required />
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: {
        accessToken: ''
      }
    };
  },
  methods: {
    saveConfig() {
      // Save the config to the server or local storage
      console.log('Instagram config saved:', this.config);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
