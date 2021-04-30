<template>
  <div class="song-list">
    <ul class="song-list-header">
      <li v-for="(item,index) in songStyle" :key="index" @click="selectByStyle(item)" :class="{active:item==activeName}">
        {{item}}
      </li>
    </ul>
    <div>
      <content-list :content-list="data"></content-list>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                       :current-page="currentPage" :page-size="pageSize" :total="list1.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from 'vuex'
  import ContentList from "../components/ContentList";
  import {getAllSongList, selectSongListByStyle, selectSongStyle} from "../api";

  export default {
    name: 'song-list',
    components: {ContentList},
    data() {
      return {
        list1: [],
        pageSize: 5,
        currentPage: 1,
        songStyle: [],
        activeName:'全部'
      }
    },
    methods: {
      getSongList() {
        getAllSongList().then(res => {
          if (res.data.code == 200) {
            let tempList = res.data.data;
            for (let item of tempList) {
              let type = {
                name: item.songListTitle,
                img: item.songListImg,
                id: item.songListId,
                type: 1,
                introduction: item.songListIntroduction
              };
              this.list1.push(type);
            }
          }
        }).catch(err => {
          this.$message.error("服务器内部错误，请联系管理员,vx:13612413078")
        })
      },
      //获取当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      getSongStyle() {
        selectSongStyle().then(res => {
          if (res.data.code == 200) {
            this.songStyle = res.data.data;
          } else {
            this.$message.error("服务器错误")
          }
        }).catch(err => {
          this.$message.error("服务器错误")
        })
      },
      selectByStyle(style){
        this.activeName=style;
        this.list1=[];
        if (style.includes("全部")){
          this.getSongList();
          return;
        }
        selectSongListByStyle(style).then(res=> {
          if (res.data.code == 200) {
            let tempList = res.data.data;
            for (let item of tempList) {
              let type = {
                name: item.songListTitle,
                img: item.songListImg,
                id: item.songListId,
                type: 1,
                introduction: item.songListIntroduction
              };
              this.list1.push(type);
            }
          }else{
            this.$message.error("服务器错误")
          }
        }).catch(err=>{
          this.$message.error("服务器错误")
        })
      }
    },
    computed: {
      data() {
        return this.list1.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage)
      }
    },
    created() {
      this.getSongList();
      this.getSongStyle();
    },

  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/song-list.scss";
</style>
