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
          <input type="text" aria-placeholder="搜索音乐" @keyup.enter="goSearch" v-model="key"></input>
          <div class="search-btn " @click="goSearch">
            <svg class="icon">
              <use xlink:href="#icon-sousuo"></use>
            </svg>
          </div>
        </div>
      </li>
      <li :class="{active : item.name==activeName}" v-for="item in loginMsg" :key="item.path"
          @click="goPage(item.path,item.name)" v-if="!loginFlag">
        {{item.name}}
      </li>
    </ul>
    <div class="header-right" style="margin-right: 40px;" v-if="loginFlag">
      <div id="user">
        <img :src='attachImageUrl(this.curConsumer.consumerImg)'>
      </div>
      <el-button type="primary" @click="goPage('setting','')" size="mini">个人中心</el-button>
      <el-button type="primary" @click="goPage(0,'')" size="mini">退出</el-button>
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
        key: '',
        list: [],
        loginMsg: [],
        consumer: [],
        menuList: [],
        temp: [1]
      }
    },
    computed: {
      ...mapGetters([
        'activeName',
        'loginFlag',
        'curConsumer',
        'selList',
        'keyWords',
        'collectSong',
        'collectActive',
        'collectSongList',

      ])
    },
    methods: {
      goHome() {
        this.$router.push({path: '/'});
      },
      goPage(goPath, goName) {
        if (goPath == 0) {
          this.$store.commit('setLoginFlag', false);
          this.$store.commit('setCurConsumer', []);
          this.$store.commit('setCollectSong',[]);
          this.$store.commit('setCollectActive',false);
          this.$store.commit('setCollectSongList',[]);
          this.$message.success("退出成功");
          this.goHome();
          return;
        }
        let backName = this.activeName;
        this.$store.commit('setActiveName', goName);
        this.$router.push({path: goPath, query: {backName}});
      },
      goSearch() {
        if (this.key == '') {
          this.$message({
            showClose: true,
            type: "info",
            message: "搜索关键字为空"
          })
          return;
        }else{
          this.$store.commit('setKeyWords',this.key);
          this.$router.push({path:'/search'});
        }
      },
      attachImageUrl(srcUrl) {
        return this.$store.state.configure.HOST + srcUrl;
      },
    },
    created() {
      this.navMsg = navMsg;
      this.loginMsg = loginMsg;
      this.menuList = menuList;
      this.key=this.keyWords;
    },
    mounted() {
      // document.querySelector('#user').addEventListener('click', function (e) {
      //   document.querySelector('.menu').classList.add('show');
      //   e.stopPropagation();
      // }, false);
      // document.querySelector('.menu').addEventListener('click', function (e) {
      //   e.stopPropagation();
      // }, false);
      // document.addEventListener('click', function (e) {
      //   document.querySelector('.menu').classList.remove('show');
      // })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/the-header.scss';
</style>
