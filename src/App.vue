<template>
  <!-- <HelloWorld msg="HelloWorld"></HelloWorld> -->
  <!-- <LinkChannel msg="link"></LinkChannel> -->
  <LinkClient msg="link-client"></LinkClient>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import LinkClient from './components/LinkClientView.vue'
import { reactive, toRefs, computed, onBeforeMount, onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    LinkClient
    //HelloWorld
  },
  setup() {
  }

}
</script>
