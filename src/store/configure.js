const configure = {
  state: {
    HOST: 'http://127.0.0.1:8889/',  //后台访问地址根目录
    activeName: '', //当前选中的菜单名,
    showAside:false,
    songOfList:[],
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

  },
  mutations: {
    setActiveName: (state, activeName) => {
      state.activeName = activeName;
      window.sessionStorage.setItem('activeName', JSON.stringify(activeName))
    },
    setShowAside: (state,showAside) => {
      state.showAside=showAside;
      window.sessionStorage.setItem('showAside', JSON.stringify(showAside))
    },
    setSongOfList:(state,songOfList) => {
      state.songOfList=songOfList;
      window.sessionStorage.setItem('songOfList', JSON.stringify(songOfList))
    },

  }
}

export default configure
