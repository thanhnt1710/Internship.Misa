<template>
  <body>
    <TheApp/>
    <router-view/>
  </body>
</template>

<script>
import TheApp from './components/layout/TheApp.vue'
// import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    TheApp
  },
  computed: {

  }
}
</script>

<style>
  /* @import './lib/jquery-3.6.0.min.js'; */
  @import './assets/Resource/fontawesome-free-5.15.3-web/fontawesome-free-5.15.3-web/css/all.min.css';
  @import './css/common/main.css';
  @import './css/common/combobox.css';
</style>
