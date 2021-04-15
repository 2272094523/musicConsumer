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
    props: ['list2'],
    mounted() {
      this.$bus.$on('getList', msg => {
        this.lists = msg;
      })
      if (this.lists == '') {
        console.log(this.selName)
        fuzzySelectSong(this.selName).then(res=>{
          this.lists=res.data.data;
        })
      }
    },
    created() {
      this.lists = this.list2;

    },
    computed:{
      ...mapGetters(['songOfList','id','isPlay','selName'])
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
        this.$store.commit('setLyric',lyric);
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
        console.log(this.songOfList);
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/album-content.scss";

</style>
