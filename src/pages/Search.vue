<template>
  <div class="search">
    <nav class="searchList-nav" ref="change">
      <span :class="{isActive : toggle=='Song'}" @click="handleChangView('Song')">歌曲</span>
      <span :class="{isActive : toggle=='SongList'}" @click="handleChangView('SongList')">歌单</span>
    </nav>
    <component :is="currentView" ></component>
  </div>
</template>
<script>
  import searchSong from '../components/search/SearchSong'
  import searchSongList from '../components/search/SearchSongList'
  import {mapGetters} from 'vuex'

  export default {
    name: 'search',
    components: {
      searchSong, searchSongList,
    },
    data() {
      return {
        toggle: 'Song',
        currentView: 'searchSong',
      }
    },
    methods: {
      handleChangView(name) {
        this.currentView = 'search' + name;
        this.toggle = name;
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/search.scss';

</style>
