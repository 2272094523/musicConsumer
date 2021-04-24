import {fuzzySelectSong} from "../api";
import {mapGetters} from "vuex";

export const mixin = {
  methods: {
    //获取图片地址
    attachImageUrl(srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg';
    },
    storeCommit(id, url, title, playButtonUrl, isPlay, listIndex, artist, imgUrl, lyric) {
      this.$store.commit('setId', id);
      this.$store.commit('setUrl', url);
      this.$store.commit('setImgUrl', imgUrl);
      this.$store.commit('setListIndex', listIndex);
      this.$store.commit('setTitle', title);
      this.$store.commit('setArtist', artist);
      this.$store.commit('setLyric', lyric);
      this.$store.commit('setPlayButtonUrl', playButtonUrl);
      this.$store.commit('setIsPlay', isPlay);
    },
    parseLyric(lyric) {
      let result = [];
      // if (lyric.includes('[00:00.00]暂无歌词')){
      //   result.push('暂无歌词');
      // }
      let lines = lyric.split("\n");
      let pattern = /\[\d{2}:\d{2}.(\d{3}|\d{2})\]/g;
      if (!(/\[.+\]/.test(lyric))){
        return [[0,text]];
      }
      while (!pattern.test(lines[0])){
        lines=lines.slice(1);
      }
      for (let item of lines) {
        let time = item.match(pattern);
        let value = item.replace(pattern, '');
        for (let item1 of time) {
          let t = item1.slice(1, -1).split(":");
          if (value != '') {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        }
      }
      return result;
    }

  }
}
