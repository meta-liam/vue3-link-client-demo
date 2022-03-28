<template>
  <!-- <HelloWorld msg="HelloWorld"></HelloWorld> -->
  <!-- <LinkChannel msg="link"></LinkChannel> -->
  <LinkClient msg="link-client"></LinkClient>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
//import LinkChannel from './components/LinkChannelView.vue'
import LinkClient from './components/LinkClientView.vue'
import { reactive, toRefs, computed, onBeforeMount, onMounted } from 'vue'

export default {
  name: 'App',
  components: {
    LinkClient
    //LinkChannel
    //HelloWorld
  },
  setup() {
  }

}
</script>
