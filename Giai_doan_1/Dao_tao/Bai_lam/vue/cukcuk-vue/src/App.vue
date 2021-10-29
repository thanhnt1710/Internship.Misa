<template>
  <body>
    <TheApp/>
  </body>
</template>

<script>
import TheApp from './components/base/TheApp.vue'
// import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    TheApp
  }
}
</script>

<style>
  @import './assets/Resource/fontawesome-free-5.15.3-web/fontawesome-free-5.15.3-web/css/all.min.css';
  @import './css/common/main.css';
  @import './css/common/combobox.css';
</style>
