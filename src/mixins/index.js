import {fuzzySelectSong} from "../api";

export const mixin = {
  methods: {
    //获取图片地址
    attachImageUrl(srcUrl) {
      return srcUrl ? this.$store.state.configure.HOST + srcUrl : '../assets/img/user.jpg';
    },
    toPlay:function(id,url,img,index,title,artist,lyric){
      this.$store.commit('setId',id);
      this.$store.commit('setUrl',this.$store.state.configure.HOST+url);
      this.$store.commit('setImgUrl',this.$store.state.configure.HOST+img);
      this.$store.commit('setListIndex',index);
      this.$store.commit('setTitle',title);
      this.$store.commit('setArtist',artist);
      this.$store.commit('setLyric',lyric);
      this.$store.commit('setPlayButtonUrl','#icon-zanting');
    }
  }
}
