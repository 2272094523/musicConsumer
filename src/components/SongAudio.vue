<template>
  <div class="song-audio">
    <audio ref="player" :src="url" controls="controls" preload="true" @canplay="startPlay" @ended="ended" @timeupdate="timeUpdate">
    </audio>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'SongAudio',
    methods: {
      startPlay() {
        let player = this.$refs.player;
        this.$store.commit("setDuration",player.duration);
        //开始播放
        player.play()
        this.$store.commit("setIsPlay",true);
      },
      //结束播放
      ended() {
        this.$store.commit("setIsPlay",false);
        this.$store.commit("setCurTime",0);
        this.$store.commit("setAutoNext",!this.autoNext);
      },
      //开始，暂停
      togglePlay() {
        let player = this.$refs.player;
        if (this.id==''){
          return;
        }
        if (this.isPlay) {
          player.play();
        } else {
          player.pause();
        }
      },
      timeUpdate(){
        //音乐播放的时候，记录音乐的播放位置
        this.$store.commit("setCurTime",this.$refs.player.currentTime)
      }
    },
    computed: {
      ...mapGetters([
        'id',
        'url',
        'isPlay',
        'curTime',
        'changeTime',
        'autoNext',
        'volume',//y音量
      ])
    },
    watch: {
      //监听播放还是暂停
      isPlay: function () {
        this.togglePlay();
      },
      changeTime:function () {
        this.$refs.player.currentTime=this.changeTime;
      },
      volume:function (val) {
        this.$refs.player.volume=val;
      }
    },
    created() {
      this.$store.commit("setIsPlay",false)
      this.$store.commit("setUrl",'')
      this.$store.commit("setId",'');
    }
  }
</script>

<style>
  .song-audio {
    display: inline;
  }
</style>
