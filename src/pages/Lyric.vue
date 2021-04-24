<template>
  <div class="song-lyric">
    <h1 class="lyric-title">歌词</h1>
    <ul class="has-lyric" v-if="lyric.length!=0" key="index">
      <li v-for="(item,index) in lyr" v-bind:key="index">
        {{item[1]}}
      </li>
    </ul>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from 'vuex'

  export default {
    name: "Lyric",
    mixins:[mixin],
    data(){
      return{
        lyr:[],
      }
    },
    computed:{
      ...mapGetters(['curTime','id','lyric','listIndex','songOfList'])
    },
    created() {
      this.lyr=this.lyric;
    },
    watch:{
      id(){
        this.lyr=this.parseLyric(this.songOfList[this.listIndex].lyric);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/lyric.scss";
</style>
