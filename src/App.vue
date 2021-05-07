<template>
  <div id="app">
    <v-app>
      <home/>
    </v-app>
  </div>
</template>

<script>
import Home from "./module/home/view/homePage.vue";

export default {
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
