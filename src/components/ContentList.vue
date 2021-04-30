<template>
  <div class="content-list">
    <ul class="section-content" >
      <li class="content-item" v-for="(item,index) in contentList" :key="index" style="margin-left: 15px;margin-top: 20px">
        <div class="kuo" @click="goAlbum(item,item.type)">
          <img class="item-img" :src="attachImageUrl(item.img)" >
          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <span class="item-name">{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  import {mixin} from '../mixins';
  import {mapGetters} from 'vuex'

  export default {
    mixins: [mixin],
    name: 'content-list',
    props:['contentList'],
    methods:{
      goAlbum(item,type){
        this.$store.commit("setTempList",item);
        if (type==0){
          this.$router.push({path:'singer-album',query:{item}})
        }else{
          this.$router.push({path:'song-list-album',query:{item}})
        }
        this.$store.commit('setActiveName','');
      }
    },
    computed:{
      ...mapGetters(['activeName'])
    },
    created() {
      console.log(this.contentList);
    }
  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/content-list.scss';
</style>
