<template>
  <div class="my-music">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(this.curConsumer.consumerImg)">
      </div>
      <ul class="album-info">
        <li>昵称：{{this.curConsumer.consumerNickName}}</li>
        <li>性别：{{getSingerSex(this.curConsumer.consumerSex)}}</li>
        <li>生日：{{parseBirth(this.curConsumer.consumerBirth)}}</li>
        <li>地区：{{this.curConsumer.consumerLocation}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="album-title">
        个性签名:{{this.curConsumer.consumerIntroduction}}
      </div>
      <div class="songs-body">
        <album-content>
          <template slot="title">收藏歌曲</template>
        </album-content>
      </div>
    </div>
    <h1>收藏歌单</h1>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mixin} from "../mixins";
  import AlbumContent from "../components/AlbumContent";
  import ContentList from "../components/ContentList";

  export default {
    mixins:[mixin],
    name: 'my-music',
    computed:{
      ...mapGetters(['loginFlag','curConsumer','collectSong','collectSongList','selList'])
    },
    components:{
      ContentList,
      AlbumContent,
    },
    mounted() {
      this.$store.commit('setSelList',this.collectSong)
    },
    created() {
      this.$store.commit('serSelList',this.collectSong);
    }
  }
</script>


<style lang="scss" scoped>
  @import '../assets/css/my-music.scss';
</style>
