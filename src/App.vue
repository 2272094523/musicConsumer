<template>
  <div id="app">
    <the-header />
    <router-view class="music-content"/>
    <scroll-top/>
    <song-audio></song-audio>
    <the-aside></the-aside>
    <play-bar/>
    <the-footer/>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import ScrollTop from './components/ScrollTop';
import TheFooter from './components/TheFooter';
import SongAudio from "./components/SongAudio";
import PlayBar from "./components/PlayBar"
import TheAside from "./components/TheAside";
import {mapGetters} from 'vuex'
import {selectCollectSong, selectCollectSongList} from "./api";
export default {

  name: 'App',
  components: {
    TheHeader,
    ScrollTop,
    TheFooter,
    SongAudio,
    PlayBar,
    TheAside,
  },
  computed:{
    ...mapGetters(['curConsumer','collectActive','collectSong','collectSongList','loginFlag'])
  },
  created() {
    this.$store.commit('setShowAside',false);
    if (this.loginFlag){
      selectCollectSong(this.curConsumer.consumerId).then(res=>{
        if (res.data.code==200){
          this.$store.commit('setCollectSong',res.data.data);
          if (this.id!=''){
            for(let item of res.data.data){
              if (this.id==item.songId){
                this.$store.commit('setCollectActive',true);
                break;
              }
            }
          }
        }
      })
      selectCollectSongList(this.curConsumer.consumerId).then(res=>{
        if (res.data.code==200){
          let tempList=[];
          for (let item of res.data.data){
            let type={name:item.songListTitle,img:item.songListImg,id:item.songListId,type:1,introduction:item.songListIntroduction,style:item.songListStyle};
            tempList.push(type);
          }
          this.$store.commit("setCollectSongList",tempList);
        }
      })
    }
  }


}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
