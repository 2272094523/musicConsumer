import Vue from 'vue';
import Vuex from 'vuex';

const song = {
  state: {
    isPlay: false,
    url: '',
    id: '',
    playButtonUrl:'#icon-bofang',
    duration:0,//音乐时长
    curTime:0,//当前播放位置
    changeTime:0,//指定从哪里开始播放
    title:'',//歌名
    artist: '',//歌手名
    imgUrl:'',//歌曲图片
    autoNext:true,//自动播放下一首
    lyric:[],//未处理的歌词
    tempList:[],//单个歌单信息.
    listIndex:-1,//当前歌曲在歌单中的位置
    volume:50,//音量
  },
  getters: {
    isPlay: state => {
      let isPlay=state.isPlay;
      if (!isPlay){
        isPlay=JSON.parse(window.sessionStorage.getItem('isPlay')||false)
      }
      return isPlay;
    },
    url: state => {
      let url=state.url;
      if (url==''){
        url=JSON.parse(window.sessionStorage.getItem('url')||null)
      }
      return url;
    },
    id: state => {
      let id=state.id;
      if (id==''){
        id=JSON.parse(window.sessionStorage.getItem('id')||null)
      }
      return id;
    },
    playButtonUrl: state => {
      let playButtonUrl=state.playButtonUrl;
      if (playButtonUrl==''){
        playButtonUrl=JSON.parse(window.sessionStorage.getItem('playButtonUrl')||null)
      }
      return playButtonUrl;
    },
    duration: state => {
      let duration=state.duration;
      if (duration==''){
        duration=JSON.parse(window.sessionStorage.getItem('duration')||null)
      }
      return duration;
    },
    curTime: state => {
      let curTime=state.curTime;
      if (curTime==''){
        curTime=JSON.parse(window.sessionStorage.getItem('curTime')||null)
      }
      return curTime;
    },
    changeTime: state => {
      let changeTime=state.changeTime;
      if (changeTime==''){
        changeTime=JSON.parse(window.sessionStorage.getItem('changeTime')||null)
      }
      return changeTime;
    },
    title: state => {
      let title=state.title;
      if (title==''){
        title=JSON.parse(window.sessionStorage.getItem('title')||null)
      }
      return title;
    },
    artist: state => {
      let artist=state.artist;
      if (artist==''){
        artist=JSON.parse(window.sessionStorage.getItem('artist')||null)
      }
      return artist;
    },
    imgUrl: state => {
      let imgUrl=state.imgUrl;
      if (imgUrl==''){
        imgUrl=JSON.parse(window.sessionStorage.getItem('imgUrl')||null)
      }
      return imgUrl;
    },
    autoNext: state => {
      let autoNext=state.autoNext;
      if (!autoNext){
        autoNext=JSON.parse(window.sessionStorage.getItem('autoNext')||null)
      }
      return autoNext;
    },
    lyric: state => {
      let lyric=state.lyric;
      if (lyric==''){
        lyric=JSON.parse(window.sessionStorage.getItem('lyric')||null)
      }
      return lyric;
    },
    tempList: state => {
      let tempList=state.tempList;
      if (tempList==''){
        tempList=JSON.parse(window.sessionStorage.getItem('tempList')||null)
      }
      return tempList;
    },
    listIndex: state => {
      let listIndex=state.listIndex;
      if (listIndex==''){
        listIndex=JSON.parse(window.sessionStorage.getItem('listIndex')||null)
      }
      return listIndex;
    },
    volume: state => {
      let volume=state.volume;
      if (volume==''){
        volume=JSON.parse(window.sessionStorage.getItem('volume')||null)
      }
      return volume;
    },

  },
  mutations: {

    setIsPlay: (state, isPlay) => {
      state.isPlay = isPlay;
      window.sessionStorage.setItem('isPlay',JSON.stringify(isPlay));
    },
    setUrl: (state, url) => {
      state.url = url;
      window.sessionStorage.setItem('url',JSON.stringify(url));
    },
    setId: (state, id) => {
      state.id = id;
      window.sessionStorage.setItem('id',JSON.stringify(id));
    },
    setPlayButtonUrl:(state,playButtonUrl)=>{
      state.playButtonUrl = playButtonUrl;
      window.sessionStorage.setItem('playButtonUrl',JSON.stringify(playButtonUrl));
    },
    setDuration:(state,duration)=>{
      state.duration = duration;
      window.sessionStorage.setItem('duration',JSON.stringify(duration));
    },
    setCurTime:(state,curTime)=>{
      state.curTime = curTime;
      window.sessionStorage.setItem('curTime',JSON.stringify(curTime));
    },
    setChangeTime:(state,changeTime)=>{
      state.changeTime = changeTime;
      window.sessionStorage.setItem('changeTime',JSON.stringify(changeTime));
    },
    setTitle:(state,title)=>{
      state.title = title;
      window.sessionStorage.setItem('title',JSON.stringify(title));
    },
    setArtist:(state,artist)=>{
      state.artist = artist;
      window.sessionStorage.setItem('artist',JSON.stringify(artist));
    },
    setImgUrl:(state,imgUrl)=>{
      state.imgUrl = imgUrl;
      window.sessionStorage.setItem('imgUrl',JSON.stringify(imgUrl));
    },
    setAutoNext:(state,autoNext)=>{
      state.autoNext = autoNext;
      window.sessionStorage.setItem('autoNext',JSON.stringify(autoNext));
    },
    setLyric:(state,lyric)=>{
      state.lyric = lyric;
      window.sessionStorage.setItem('lyric',JSON.stringify(lyric));
    },
    setTempList:(state,tempList)=>{
      state.playButtonUrl = tempList;
      window.sessionStorage.setItem('tempList',JSON.stringify(tempList));
    },
    setListIndex:(state,listIndex)=>{
      state.listIndex = listIndex;
      window.sessionStorage.setItem('listIndex',JSON.stringify(listIndex));
    },
    setVolume:(state,volume)=>{
      state.volume = volume;
      window.sessionStorage.setItem('volume',JSON.stringify(volume));
    }
  }
}
export default song;
