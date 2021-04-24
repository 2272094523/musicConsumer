<template>
  <div class="the-header">
    <div class="header-logo" @click="goHome">
      <svg class="icon">
        <use xlink:href="#icon-erji"></use>
      </svg>
      网抑云
    </div>
    <ul class="navbar">
      <li :class="{active : item.name==activeName}" v-for="item in navMsg" :key="item.path"
          @click="goPage(item.path,item.name)">{{item.name}}
      </li>
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
      <li :class="{active : item.name==activeName}" v-for="item in loginMsg" :key="item.path"
          @click="goPage(item.path,item.name)" v-show="!loginFlag">
        {{item.name}}
      </li>
    </ul>
    <div class="header-right" v-show="loginFlag" style="margin-right: 40px;">
      <div id="user">
        <img :src='attachImageUrl(img)'>
        <ul class="menu">
          <li v-for="(item,index) in menuList" :key="index" @click="goPage(item.path)">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {navMsg, loginMsg, menuList} from "../assets/data/header";
  import {mapGetters} from 'vuex'
  import {fuzzySelectSong} from "../api";

  export default {
    name: 'the-header',
    data() {
      return {
        navMsg: [],
        keyWords: '',
        list: [],
        loginMsg: [],
        consumer: [],
        menuList: [],
        img:'',
      }
    },
    computed: {
      ...mapGetters([
        'activeName',
        'loginFlag',
        'curConsumer',
        'selList'
      ])
    },
    watch:{
      curConsumer(){
        if(this.curConsumer==''){
          this.img='';
        }
        else this.img=this.curConsumer.consumerImg;
      }
    },
    methods: {
      goHome() {
        this.$router.push({path: '/'});
      },
      goPage(goPath, goName) {
        if(goPath==0){
          this.$store.commit('setLoginFlag',false);
          this.$store.commit('setCurConsumer',[]);
          this.$message.success("退出成功");
          this.goHome();
          return;
        }
        let backName=this.activeName;
        this.$store.commit('setActiveName', goName);
        this.$router.push({path: goPath, query: {backName}});
      },
      goSearch() {
        if (this.keyWords == '') {
          this.$message({
            showClose: true,
            type: "info",
            message: "搜索关键字为空"
          })
          return;
        }
        fuzzySelectSong(this.keyWords).then(res => {
          if (res.data.data.length == 0) {
            this.$message({
              showClose: true,
              type: "info",
              message: "暂无符合条件的歌曲"
            });
            this.list = [];
          } else {
            this.list = res.data.data;
          }
        }).finally(() => {
          this.$bus.$emit("getList", this.list)
          // this.$store.commit('setSelList',this.list);
          let list2 = this.list;
          this.$router.push({path: '/search', query: {list2}});
        })
      },
      attachImageUrl(srcUrl) {
        return this.$store.state.configure.HOST + srcUrl;
      },
    },
    created() {
      console.log(this.curConsumer)
      this.navMsg = navMsg;
      this.loginMsg = loginMsg;
      this.menuList = menuList;
    },
    mounted() {
      document.querySelector('#user').addEventListener('click', function (e) {
        document.querySelector('.menu').classList.add('show');
        e.stopPropagation();
      }, false);
      document.querySelector('.menu').addEventListener('click', function (e) {
        e.stopPropagation();
      }, false);
      document.addEventListener('click', function (e) {
        document.querySelector('.menu').classList.remove('show');
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
