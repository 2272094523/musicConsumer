<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg>
       网抑云
    </div>
    <ul class="navbar">
      <li :class="{active : item.name==activeName}" v-for="item in navMsg" :key="item.path" @click="goPage(item.path,item.name)">{{item.name}}</li>
      <li>
        <div class="header-search">
          <input type="text" aria-placeholder="搜索音乐" @keyup.enter="goSearch" v-model="keyWords"></input>
          <div class="search-btn " @click="goSearch">
            <svg class="icon">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {navMsg} from "../assets/data/header";
  import {mapGetters} from 'vuex'
  import {fuzzySelectSong} from "../api";

  export default {
    name: 'the-header',
    data() {
      return{
        navMsg:[],
        keyWords:'',
        list:[],
      }
    },
    computed:{
      ...mapGetters([
        'activeName',
        'selName'
      ])
    },
    methods: {
      goHome() {
        this.$router.push({path: '/'});
      },
      goPage(goPath,goName){
        this.$store.commit('setActiveName',goName);
        this.$router.push({path:goPath});
      },
      goSearch(){
        if (this.keyWords==''){
          this.$message({
            showClose:true,
            type:"info",
            message:"搜索关键字为空"
          })
          return;
        }
        fuzzySelectSong(this.keyWords).then(res=>{
          if (res.data.data.length==0){
            this.$message({
              showClose:true,
              type:"info",
              message:"暂无符合条件的歌曲"
            });
            this.list=[];
          }else{
            this.list=res.data.data;
          }
        }).finally(()=>{
          this.$bus.$emit("getList",this.list)
          let list2=this.list;
          this.$store.commit('setSelName',this.keyWords);
          this.$router.push({path:'/search',query:{list2}});
        })
      }
    },
    created() {
      this.navMsg =navMsg;
    },


  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
