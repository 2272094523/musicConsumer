<template>

  <div class="home">
    <swiper></swiper>
    <div class="section" v-for="(item,index) in songsList" :key="index">
      <div class="section-title">{{item.name}}</div>
      <content-list :contentList="item.list"></content-list>
    </div>
  </div>
</template>

<script>
  import Swiper from "../components/Swiper";
  import contentList from '../components/ContentList'
  import {getAllSinger, getAllSongList} from '../api/index';
  import {mixin} from '../mixins';

  export default {
    name: 'home',
    mixins: [mixin],
    components: {Swiper,contentList},
    data() {
      return {
        songsList:[{name:'歌手',list:[]},{name:'歌单',list:[]}],
        list1:[],
        list2:[],
      }
    },
    methods: {
      getSongList() {
        getAllSongList().then(res => {
          if (res.data.code == 200) {
            //只获取前10条歌单
            this.list1 = res.data.data.slice(0, 10);
            for (let item of this.list1){
              let type={name:item.songListTitle,img:item.songListImg,id:item.songListId,type:1,introduction:item.songListIntroduction};
              this.songsList[1].list.push(type);
            }
          }
        }).catch(err => {
          this.$message.error("服务器内部错误，请联系管理员,vx:13612413078")
        })
      },
      getSinger() {
        getAllSinger().then(res => {
          if (res.data.code == 200) {
            this.list2=res.data.data.slice(0, 10);
            for (let item of this.list2){
              let type={id:item.singerId,name:item.singerName,img:item.singerImg,type:0,introduction:item.singerIntroduction};
              this.songsList[0].list.push(type);
            }
          }
        })
      }
    },
    created() {
      this.getSongList();
      this.getSinger();
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/home.scss';
</style>
