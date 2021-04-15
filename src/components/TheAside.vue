<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="this.showAside==true">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item,index) in this.songOfList" :key="index"
            @click="toPlay(item.songId,item.songUrl,item.songImg,index,item.songName,item.singerName,item.songLyric)"
            :class="{'is-play':id==item.songId}">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.songName}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{item.singerName}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<i
            class="el-icon-delete" @click.stop="removeItem(item.songId)">删除</i>
          </div>
        </li>

      </ul>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "TheAside",
    computed: {
      ...mapGetters(['showAside', 'songOfList', 'id', 'isPlay', 'title', 'artist', 'playButtonUrl', 'lyric', 'imgUrl', 'listIndex'])
    },
    created() {
      this.$store.commit('setSongOfList', []);
    },
    methods: {
      toPlay(id, url, img, index, title, artist, lyric) {
        if (this.id == id) {
          if (this.isPlay) {
            this.$store.commit('setPlayButtonUrl', '#icon-bofang');
          } else {
            this.$store.commit('setPlayButtonUrl', '#icon-zanting');
          }
          this.$store.commit('setIsPlay', !this.isPlay);
          return;
        }
        this.storeCommit(id,url,title,'#icon-zanting',true,index,artist,img,lyric);
      },
      removeItem() {

      }

    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/the-aside.scss";
</style>
