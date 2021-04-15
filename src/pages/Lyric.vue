<template>
  <div class="song-lyric">
    <h1 class="lyric-title">歌词</h1>
    <ul class="has-lyric" v-if="lyric.length" key="index">
      <li v-for="(item,index) in lyric" v-bind:key="index">

      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Lyric",
    data(){
      return{
        lyric:[],
      }
    },

  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/lyric.scss";
</style>
