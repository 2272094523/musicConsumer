<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
    </h1>
    <ul>
      <li>
        <div class="song-item">
          <span class="item-index"></span>
          <span class="item-title">歌曲</span>
          <span class="item-name">歌手</span>
          <span class="item-intro">专辑</span>
        </div>
      </li>
      <li v-for="(item,index) in lists" :key="index">
        <div class="song-item"
             @click="toPlay(item.songId,item.songUrl,item.songImg,index+1,item.songName,item.singer.singerName,item.songLyric)">
          <span class="item-index">{{index+1}}</span>
          <span class="item-title">{{item.songName}}</span>
          <span class="item-name">{{item.singer.singerName}}</span>
          <span class="item-intro">{{item.songIntroduction}}</span>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mixin} from "../mixins";

  export default {
    name: "AlbumContent",
    mixins: [mixin],
    data() {
      return {
        lists: [],
        flag: true,
      }
    },
    props: ['list2'],
    mounted() {
      this.$bus.$on('getList', msg => {
        this.lists = msg;
      })
    },
    created() {
      this.lists = this.list2;
      if (this.lists == '') {
        this.flag = false;
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/album-content.scss";

</style>
