<template>
  <div class="play-bar" :class="{show:!toggle}">
    <div @click="toggle=!toggle" class="item-up" :class="{turn:toggle}">
      <svg class="icon">
        <use xlink:href="#icon-jiantou-xia-cuxiantiao"></use>
      </svg>
    </div>
    <div class="kongjian">
      <!--      上一首-->
      <div class="item" @click="prevSong">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi"></use>
        </svg>
      </div>
      <!--      播放-->
      <div class="item" @click="togglePlay">
        <svg class="icon">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
      <!--      下一首-->
      <div class="item" @click="nextSong">
        <svg class="icon">
          <use xlink:href="#icon-ziyuanldpi1"></use>
        </svg>
      </div>
      <!--      歌曲图片-->
      <div class="item-img" @click="showLyric">
        <img :src="imgUrl"/>
      </div>
      <div class="playing-speed">
        <div class="current-time">{{nowTime}}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div class="progress" ref="progress" v-on:mousemove="mousemove">
            <div ref="bg" class="bg" @click="updateMove">
              <!--              进度条-->
              <div ref="curProgress" class="cur-progress" :style="{width:curLength+'%'}">
              </div>
              <!--              拖动点-->
              <div class="idot" ref="idot" :style="{left:curLength+'%'}" v-on:mousedown="mousedown"
                   v-on:mouseup="mouseup">
              </div>
            </div>
          </div>
        </div>
        <div class="left-time">{{songTime}}</div>
        <!--        音量-->
        <div class="item item-volume">
          <svg class="icon" v-if="volume==0">
            <use xlink:href="#icon-yinliangjingyinheix"></use>
          </svg>
          <svg class="icon" v-else>
            <use xlink:href="#icon-yinliang1"></use>
          </svg>

          <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
        </div>
        <!--        收藏-->
        <div class="item">
          <svg class="icon">
            <use xlink:href="#icon-xihuan-shi"></use>
          </svg>
        </div>
        <!--        下载-->
        <div class="item" @click="download">
          <svg class="icon">
            <use xlink:href="#icon-xiazai"></use>
          </svg>
        </div>
        <!--        当前播放的列表-->
        <div class="item">
          <svg class="icon">
            <use xlink:href="#icon-liebiao" @click="changeAside"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {mixin} from "../mixins";
  import {downLoadMusic} from "../api";

  export default {
    name: "PlayBar",
    mixins: [mixin],
    data() {
      return {
        nowTime: '00:00',
        songTime: '00:00',
        curLength: 0,//当前播放的位置
        progressLength: 0,//总进度条位置
        mouseStartX: 0,//拖拽开始位置
        tag: false,//拖拽开始结束的标志，当开始拖拽才会变成true,
        volume: 50,//默认音量50,
        toggle:true,
      }
    },
    computed: {
      ...mapGetters(['isPlay', 'id', 'url', 'playButtonUrl', 'imgUrl', 'title', 'artist', 'duration', 'curTime','showAside','listIndex','songOfList','autoNext'])
    },
    methods: {
      //控制音乐播放暂停
      togglePlay() {
        if (this.id == '') {
          this.$message({
            type: 'info',
            message: '当前播放歌单中暂无歌曲',
            showClose: true,
          })
          return;
        }
        if (this.isPlay) {
          this.$store.commit('setPlayButtonUrl', '#icon-bofang')
          this.$store.commit('setIsPlay', false);
        } else {
          this.$store.commit('setPlayButtonUrl', '#icon-zanting')
          this.$store.commit('setIsPlay', true);
        }
      },
      formatSeconds(time) {
        let value = parseInt(time, 10);
        let result = '';
        let minute = (value / 60) % 60;
        minute = parseInt(minute, 10);
        let second = value % 60;
        second = parseInt(second, 10);
        if (minute > 0) {
          if (minute < 10) {
            result += "0" + minute + ":";
          } else {
            result += minute + ":";
          }
        } else {
          result += "00:";
        }
        if (second > 0) {
          if (second < 10) {
            result += '0' + second;
          } else {
            result += second;
          }
        } else {
          result += "00";
        }
        return result;
      },
      //拖拽开始
      mousedown(e) {
        this.mouseStartX = e.clientX;
        this.tag = true;
      },
      //拖拽结束
      mouseup() {
        this.tag = false;
      },
      mousemove(e) {
        if (!this.duration) {
          return false;
        } else {
          if (this.tag) {
            let movementX = e.clientX - this.mouseStartX;
            let curLength = this.$refs.curProgress.getBoundingClientRect().width;
            let newPercent = ((movementX + curLength) / this.progressLength) * 100;
            if (newPercent > 100) {
              newPercent = 100;
            }
            this.curLength = newPercent;
            this.mouseStartX = e.clientX;
            this.changeTime(newPercent)
          }
        }
      },
      changeTime(percent) {
        let newCurtime = percent * 0.01 * this.duration;
        this.$store.commit('setChangeTime', newCurtime);
      },
      updateMove(e) {
        if (!this.tag) {
          //进度条的左侧左边
          let curLength = this.$refs.bg.offsetLeft;
          let newPercent = ((e.clientX - curLength) / this.progressLength) * 100;
          if (newPercent >= 100) {
            newPercent = 100;
          } else if (newPercent <= 0) {
            newPercent = 0;
          }
          this.curLength = newPercent;
          this.changeTime(this.curLength);
        }
      },
      changeAside(){
        this.$store.commit('setShowAside',!this.showAside);
      },
      prevSong(){
        if (this.listIndex!=-1&&this.songOfList.length>1){
          if (this.listIndex>0){
            this.$store.commit('setListIndex',this.listIndex-1);
          }else{
            this.$store.commit('setListIndex',this.songOfList.length-1);
          }
          this.toPlay(this.songOfList,this.listIndex);
        }else{
          this.$message({
            type:'info',
            showClose:true,
            message:'当前播放歌单只有一首歌曲'
          })
        }
      },
      nextSong(){
        if (this.listIndex!=-1&&this.songOfList.length>1){
          if (this.listIndex==this.songOfList.length-1){
            this.$store.commit('setListIndex',0);
          }else{
            this.$store.commit('setListIndex',this.listIndex+1);
          }
          this.toPlay(this.songOfList,this.listIndex);
        }else{
          this.$message({
            type:'info',
            showClose:true,
            message:'当前播放歌单只有一首歌曲'
          })
        }
      },
      toPlay(songOfList, listIndex){
        let type=songOfList[listIndex];
        this.storeCommit(type.songId,type.songUrl,type.songName,'#icon-zanting',true,listIndex,type.singerName,type.songImg,this.parseLyric(type.songLyric));
      },
      autoPlay(){
        if (this.songOfList.length==1){
          this.toPlay(this.songOfList,this.listIndex);
        }else{
          this.nextSong();
        }
      },
      showLyric(){
        this.$router.push({path:'/lyric',lyric:this.lyric})
      },
      download(){
        if (this.songOfList.length==0){
          this.$message({
            showClose:true,
            message:"当前暂无播放的歌曲",
            type:'error'
          })
          return;
        }
        downLoadMusic(this.url).then(res=>{
          let content=res.data;
          let eleLink=document.createElement('a');
          eleLink.download=`${this.artist}+' - '+${this.title}`;
          eleLink.style.display='none';
          let blob=new Blob([content]);
          eleLink.href=URL.createObjectURL(blob);
          document.body.appendChild(eleLink);
          eleLink.click();
          document.body.removeChild(eleLink);
        }).catch(err=>{
          this.$message.error('下载失败。服务器错误');
        })
      }
    },
    mounted() {
      this.progressLength = this.$refs.progress.getBoundingClientRect().width;
      document.querySelector('.item-volume').addEventListener('click', function (e) {
        document.querySelector('.volume').classList.add('show-volume');
        e.stopPropagation();
      }, false);
      document.querySelector('.volume').addEventListener('click', function (e) {
        e.stopPropagation();
      }, false)
      document.addEventListener('click',function (e) {
          document.querySelector('.volume').classList.remove('show-volume');
      },false)

    },
    created() {
      this.storeCommit('','','','#icon-bofang',false,-1,'','','');
    },
    watch: {
      //记录当前播放进度，以及更改歌曲时间。
      curTime() {
        this.nowTime = this.formatSeconds(this.curTime);
        this.songTime = this.formatSeconds(this.duration);
        this.curLength = (this.curTime / this.duration) * 100;
      },
      //音量变化
      volume() {
        this.$store.commit('setVolume', this.volume / 100);
      },
      autoNext(){
        this.autoPlay();
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/play-bar.scss";
</style>
