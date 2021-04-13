<template>
  <div class="search-songs">
    <album-content :list2="list"></album-content>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {mixin} from "../../mixins";
  import AlbumContent from "../AlbumContent";
  export default {
    name: "SearchSong",
    mixins:[mixin],
    components:{
      AlbumContent
    },
    data(){
      return{
        list:[],
      }
    },
    props:['lists'],
    created() {
      this.list=this.lists;
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/search-songs";

</style>
