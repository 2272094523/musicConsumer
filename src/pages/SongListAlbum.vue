<template>
  <div class="song-list-album">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(item.img)"/>
      </div>
      <div class="album-info">
        <h2>简介:</h2>
        <span>{{item.introduction}}</span>
      </div>
    </div>
    <div class="album-content">
      <div class="album-title">
        <p>{{item.name}}</p>
      </div>
      <div class="songs-body">
        <album-content :list2="this.list">
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex"
  import {listSongDetail} from "../api";
  import AlbumContent from "../components/AlbumContent";

  export default {
    name: "SongListAlbum",
    mixins:[mixin],
    data(){
      return{
        list:[],
        id:'',
        item:[],
      }
    },
    components:{
      AlbumContent,
    },
    computed:{
      ...mapGetters(['songOfList','tempList'])
    },
    methods:{
      getSongFromSongList(id){
        listSongDetail(id).then(res=>{
          if (res.data.code==200){
            this.list=res.data.data;
            console.log("select")
            console.log(this.list);
          }
        }).catch(err=>{
          this.$message.error("服务器错误。请稍后重试")
        })
      }
    },
    created() {
      this.id=this.$route.query.item.id;
      this.item=this.tempList;
      this.getSongFromSongList(this.id);
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/song-list-album.scss";
</style>
