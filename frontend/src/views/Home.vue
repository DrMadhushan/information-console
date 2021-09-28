<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Explore />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Explore from '@/components/Explore.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Explore
  }
}
</script>

<style lang="scss">
.home { 
  padding-top: 50px;
}
</style>