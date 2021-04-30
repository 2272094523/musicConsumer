<template>

  <div class="singer-album">
    <div class="album-slide">
      <div class="singer-img">
        <img :src="attachImageUrl(singer.singerImg)" />
      </div>
      <ul class="info">
        <li>{{getSingerSex(singer.singerSex)}}</li>
        <li>生日:{{parseBirth(singer.singerBirth)}}</li>
        <li>故乡:{{singer.singerLocation}}</li>
      </ul>
    </div>
    <div class="album-content">
      <div class="intro">
        <h2>{{singer.singerName}}</h2>
        <span>{{singer.singerIntroduction}}</span>
      </div>
      <div class="content">
        <album-content >
          <template slot="title">个人歌曲</template>
        </album-content>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex"
  import {getSingerById, songOfSingerId} from "../api";
  import AlbumContent from "../components/AlbumContent";
  import Comment from "../components/Comment";
  export default {
    name: "SingerAlbum",
    mixins:[mixin],
    components:{
      AlbumContent,Comment
    },
    data(){
      return{
        id:'',
        singer:'',
        list:[],
      }
    },
    methods:{
      getSongBySingerId(id){
        songOfSingerId(id).then(res=>{
          this.list=res.data.data;
          this.$store.commit("setSelList",this.list);
        }).catch(err=>{
          this.$message.error("服务器错误")
        })
      },
      getSinger(id){
        getSingerById(id).then(res=>{
          this.singer=res.data.data;
        }).catch(err=>{
          this.$message.error("服务器错误")
        })
      }
    },
    computed:{
      ...mapGetters(['loginFlag','curConsumer','selList'])
    },
    created() {
      this.id=this.$route.query.item.id;
      this.getSongBySingerId(this.id);
      this.getSinger(this.id);
    }
  }
</script>

<style lang="scss" scoped>
@import "../assets/css/singer-album.scss";
</style>
