<template>
  <div class="search-songs">
    <album-content></album-content>
  </div>
</template>

<script>
  import {mapGetters} from "vuex"
  import {mixin} from "../../mixins";
  import AlbumContent from "../AlbumContent";
  import {fuzzySelectSong} from "../../api/index";
  export default {
    name: "SearchSong",
    mixins:[mixin],
    components:{
      AlbumContent
    },
    computed:{
      ...mapGetters(['keyWords','selList'])
    },
    data(){
      return{

      }
    },
    watch:{
      keyWords(){
        fuzzySelectSong(this.keyWords).then(res => {
          if (res.data.data.length == 0) {
            this.$message({
              showClose: true,
              type: "info",
              message: "暂无符合条件的歌曲"
            });
            this.$store.commit('setSelList',[]);
          } else {
            this.$store.commit('setSelList', res.data.data);
          }
        }).catch(err=>{
          this.$message.error("服务器错误")
        })
      }
    },
    mounted() {
      fuzzySelectSong(this.keyWords).then(res => {
        if (res.data.data.length == 0) {
          this.$message({
            showClose: true,
            type: "info",
            message: "暂无符合条件的歌曲"
          });
          this.$store.commit('setSelList',[]);
        } else {
          this.$store.commit('setSelList', res.data.data);
        }
      }).catch(err=>{
        this.$message.error("服务器错误")
      })
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/search-songs";

</style>
