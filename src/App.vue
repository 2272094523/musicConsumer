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
  created() {
    this.$store.commit('setShowAside',false);
  }


}
</script>

<style  lang="scss" scoped>
@import './assets/css/app.scss';
</style>
