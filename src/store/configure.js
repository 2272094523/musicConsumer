const configure = {
  state: {
    HOST: 'http://127.0.0.1:8889/',  //后台访问地址根目录
    activeName: '', //当前选中的菜单名,
    showAside:false,
    songOfList:[],
    keyWords: '',
    collectActive:false,
    collectSong:[],
    collectSongList:[],
  },
  getters: {
    activeName: state => {
      let activeName = state.activeName
      if (!activeName) {
        //如果没有的话，就从sessionStorage中获取。
        activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
      }
      return activeName
    },
    collectSong: state => {
      let collectSong = state.collectSong
      if (!collectSong) {
        //如果没有的话，就从sessionStorage中获取。
        collectSong = JSON.parse(window.sessionStorage.getItem('collectSong'))
      }
      return collectSong
    },
    collectSongList: state => {
      let collectSongList = state.collectSongList
      if (!collectSongList) {
        //如果没有的话，就从sessionStorage中获取。
        collectSongList = JSON.parse(window.sessionStorage.getItem('collectSongList'))
      }
      return collectSongList
    },

    collectActive: state => {
      let collectActive = state.collectActive
      if (!collectActive) {
        //如果没有的话，就从sessionStorage中获取。
        collectActive = JSON.parse(window.sessionStorage.getItem('collectActive'))
      }
      return collectActive
    },

    showAside:state=>{
      let showAside=state.showAside;
      if (!showAside) {
        //如果没有的话，就从sessionStorage中获取。
        showAside = JSON.parse(window.sessionStorage.getItem('showAside'))
      }
      return showAside
    },
    songOfList: state=>{
      let songOfList=state.songOfList;
      if (songOfList==[]) {
        //如果没有的话，就从sessionStorage中获取。
        songOfList = JSON.parse(window.sessionStorage.getItem('songOfList'))
      }
      return songOfList
    },
    keyWords: state=>{
      let keyWords=state.keyWords;
      if (keyWords=='') {
        //如果没有的话，就从sessionStorage中获取。
        keyWords = JSON.parse(window.sessionStorage.getItem('keyWords'))
      }
      return keyWords
    },

  },
  mutations: {
    setActiveName: (state, activeName) => {
      state.activeName = activeName;
      window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
    },
    setCollectSong: (state, collectSong) => {
      state.collectSong = collectSong;
      window.sessionStorage.setItem('collectSong', JSON.stringify(collectSong))
    },
    setCollectSongList: (state, collectSongList) => {
      state.collectSongList = collectSongList;
      window.sessionStorage.setItem('collectSongList', JSON.stringify(collectSongList))
    },
    setShowAside: (state,showAside) => {
      state.showAside=showAside;
      window.sessionStorage.setItem('showAside', JSON.stringify(showAside))
    },
    setSongOfList:(state,songOfList) => {
      state.songOfList=songOfList;
      window.sessionStorage.setItem('songOfList', JSON.stringify(songOfList))
    },
    setKeyWords:(state,keyWords)=>{
      state.keyWords=keyWords;
      window.sessionStorage.setItem('keyWords',JSON.stringify(keyWords));
    },
    setCollectActive:(state,collectActive)=>{
      state.collectActive=collectActive;
      window.sessionStorage.setItem('collectActive',JSON.stringify(collectActive));
    }
  }
}

export default configure
