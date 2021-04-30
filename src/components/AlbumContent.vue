<template>
  <div class="content">
    <h1 class="title">
      <slot name="title"></slot>
      <hr/>
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
      <li v-for="(item,index) in this.selList" :key="index">
        <div class="song-item"
             @click="toPlay(item.songId,item.songUrl,item.songImg,index,item.songName,item.singer.singerName,item.songLyric)">
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
  import {fuzzySelectSong} from "../api";

  export default {
    name: "AlbumContent",
    mixins: [mixin],
    data() {
      return {
        lists: [],
        flag: true,
      }
    },
    mounted() {

    },
    computed:{
      ...mapGetters(['songOfList','id','isPlay','selList','collectSong','collectActive'])
    },
    methods:{
      toPlay:function(id,url,img,index,title,artist,lyric){
        if (this.id==id){
          if (this.isPlay){
            this.$store.commit('setPlayButtonUrl','#icon-bofang');
          }else{
            this.$store.commit('setPlayButtonUrl','#icon-zanting');
          }
          this.$store.commit('setIsPlay',!this.isPlay);
          return;
        }
        this.$store.commit('setId',id);
        this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
        this.$store.commit('setImgUrl',this.$store.state.configure.HOST+img);
        this.$store.commit('setListIndex',index);
        this.$store.commit('setTitle',title);
        this.$store.commit('setArtist',artist);
        this.$store.commit('setLyric',this.parseLyric(lyric));
        this.$store.commit('setPlayButtonUrl','#icon-zanting');
        let tempList=[];
        let flag=false;
        tempList=this.songOfList;
        for (let item of this.songOfList) {
          if (item.songId==id){
            flag=true;
            break;
          }
        }
        if (!flag){
          let type={songId:id,songUrl:this.$store.state.configure.HOST+url,songName:title,singerName:artist,songLyric:lyric,songImg:this.$store.state.configure.HOST+img};
          tempList.push(type);
          this.$store.commit('setSongOfList',tempList);
        }
        let collectFlag=false;
        for (let item of this.collectSong){
          if (item.songId==id){
            this.$store.commit('setCollectActive',true);
            collectFlag=true;
            break;
          }
        }
        if (collectFlag==false) this.$store.commit('setCollectActive',false);
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/album-content.scss";

</style>
