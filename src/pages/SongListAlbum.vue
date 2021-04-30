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
      <div class="album-score">
        <div>
          <h3>歌单评分</h3>
          <div>
            <el-rate v-model="avg" disabled></el-rate>
          </div>
        </div>
        <span>{{avg}}</span>
        <div @click="giveScore">
          <h3>评价</h3>
          <el-rate v-model="score" allow-half show-text ></el-rate>
        </div>
      </div>
      <div class="songs-body">
        <album-content >
          <template slot="title">{{item.name}}</template>
        </album-content>
        <Comment :beWriteId="id" :type="1"></Comment>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex"
  import {listSongDetail,insertRank,selectRankAvgScore} from "../api";
  import AlbumContent from "../components/AlbumContent";
  import Comment from "../components/Comment";

  export default {
    name: "SongListAlbum",
    mixins:[mixin],
    data(){
      return{
        id:'',
        item:[],
        avg:0,
        score:0,
      }
    },
    components:{
      AlbumContent,Comment
    },
    computed:{
      ...mapGetters(['songOfList','tempList','selList','curConsumer','loginFlag'])
    },
    methods:{
      getSongFromSongList(id){
        let _this=this;
        listSongDetail(id).then(res=>{
          if (res.data.code==200){
            _this.$store.commit('setSelList',res.data.data);

          }
        }).catch(err=>{
          _this.$message.error("服务器错误。请稍后重试")
        });
        selectRankAvgScore(id).then(res=>{
          _this.avg=res.data.data;
        })
      },
      giveScore(){
        if (!this.loginFlag){
          this.$message.info("请先登录，当前未登录，跳转到登录页面");
          this.$router.push({path:'/login'})
          return;
        }
        let param=new URLSearchParams();
        param.append("rankConsumerId",this.curConsumer.consumerId);
        param.append("rankSongListId",this.id);
        param.append("rankScore",this.score);
        insertRank(param).then(res=>{
          if (res.data.code==200){
            this.$message.success("评价成功")
            this.avg='';
            selectRankAvgScore(this.id).then(res=>{
              this.avg=res.data.data;
            })
          }else{
            this.$message.error(res.data.msg);
          }
        }).catch(err=>{
          this.$message.error("服务器错误。请稍后重试")
        });
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
