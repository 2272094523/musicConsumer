<template>
  <transition name="slide-fade">
    <div class="the-aside" v-if="this.showAside==true">
      <h2 class="title">播放列表</h2>
      <ul class="menus">
        <li v-for="(item,index) in this.songOfList" :key="index"
            @click="toPlay(item.songId,item.songUrl,item.songImg,index,item.songName,item.singerName,item.songLyric)"
            :class="{'is-play':id==item.songId}">
          <div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.songName}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{item.singerName}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;<i
            class="el-icon-delete" @click.stop="removeItem(item.songId)">删除</i>
          </div>
        </li>

      </ul>
    </div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "TheAside",
    computed: {
      ...mapGetters(['showAside', 'songOfList', 'id', 'isPlay', 'title', 'artist', 'playButtonUrl', 'lyric', 'imgUrl', 'listIndex'])
    },
    created() {
      this.$store.commit('setSongOfList', []);
    },
    methods: {
      toPlay(id, url, img, index, title, artist, lyric) {
        if (this.id == id) {
          if (this.isPlay) {
            this.$store.commit('setPlayButtonUrl', '#icon-bofang');
          } else {
            this.$store.commit('setPlayButtonUrl', '#icon-zanting');
          }
          this.$store.commit('setIsPlay', !this.isPlay);
          return;
        }
        this.$store.commit('setId', id);
        this.$store.commit('setUrl', url);
        this.$store.commit('setImgUrl', img);
        this.$store.commit('setListIndex', index);
        this.$store.commit('setTitle', title);
        this.$store.commit('setArtist', artist);
        this.$store.commit('setLyric', lyric);
        this.$store.commit('setPlayButtonUrl', '#icon-zanting');
      },
      removeItem() {
        if (this.songOfList.length == 1) {
          this.$store.commit('setIsPlay', false);
          this.$store.commit('setSongOfList', []);
          this.$store.commit('setId', '');
          this.$store.commit('setUrl', '');
          this.$store.commit('setImgUrl', '');
          this.$store.commit('setListIndex', -1);
          this.$store.commit('setTitle', '');
          this.$store.commit('setArtist', '');
          this.$store.commit('setLyric', '');
          this.$store.commit('setPlayButtonUrl', '#icon-bofang');
        } else if (this.listIndex == this.songOfList.length - 1) {
          let tempList = this.songOfList;
          tempList.splice(this.songOfList.length - 1, 1);
          this.$store.commit('setIsPlay', true);
          this.$store.commit('setSongOfList', tempList);
          this.$store.commit('setId', tempList[0].songId);
          this.$store.commit('setUrl', tempList[0].songUrl);
          this.$store.commit('setImgUrl', tempList[0].songImg);
          this.$store.commit('setListIndex', 0);
          this.$store.commit('setTitle', tempList[0].songName);
          this.$store.commit('setArtist', tempList[0].singerName);
          this.$store.commit('setLyric', tempList[0].songLyric);
          this.$store.commit('setPlayButtonUrl', '#icon-bofang');
        }else{
          let tempList = this.songOfList;
          tempList.splice(this.listIndex, 1);
          this.$store.commit('setSongOfList', tempList);
          this.$store.commit('setId', tempList[this.listIndex].songId);
          this.$store.commit('setUrl', tempList[this.listIndex].songUrl);
          this.$store.commit('setImgUrl', tempList[this.listIndex].songImg);
          this.$store.commit('setTitle', tempList[this.listIndex].songName);
          this.$store.commit('setArtist', tempList[this.listIndex].singerName);
          this.$store.commit('setLyric', tempList[this.listIndex].songLyric);
        }
        // let tempList=this.songOfList;
        // while (this.listIndex<tempList.length){
        //
        // }
      }
      // if (this.songOfList.length==1){
      //   this.$store.commit('setIsPlay', false);
      //   this.$store.commit('setId', '');
      //   this.$store.commit('setUrl', '');
      //   this.$store.commit('setImgUrl', '');
      //   this.$store.commit('setTitle', '');
      //   this.$store.commit('setArtist', '');
      //   this.$store.commit('setLyric', '');
      //   this.$store.commit('setPlayButtonUrl', '#icon-bofang');
      //   this.songOfList.splice(this.listIndex,1);
      //   this.$store.commit('setListIndex',-1);
      // }else{
      //   this.songOfList.splice(this.listIndex,1);
      //   console.log(this.songOfList[this.listIndex]);
      //   this.$store.commit('setIsPlay',true);
      //   this.$store.commit('setId', this.songOfList[this.listIndex].songId);
      //   this.$store.commit('setUrl', this.songOfList[this.listIndex].songUrl);
      //   this.$store.commit('setImgUrl', this.songOfList[this.listIndex].songImg);
      //   this.$store.commit('setTitle', this.songOfList[this.listIndex].songName);
      //   this.$store.commit('setArtist', this.songOfList[this.listIndex].singerName);
      //   this.$store.commit('setLyric', this.songOfList[this.listIndex].songLyric);
      //   this.$store.commit('setPlayButtonUrl', '#icon-zanting');
      // }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/the-aside.scss";
</style>
