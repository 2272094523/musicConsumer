const configure = {
    state:{
        HOST: 'http://127.0.0.1:8889/',  //后台访问地址根目录
        activeName: ''                  //当前选中的菜单名
    },
    getters: {
        activeName: state => {
            let activeName = state.activeName
            if(!activeName){
              //如果没有的话，就从sessionStorage中获取。
                activeName = JSON.parse(window.sessionStorage.getItem('activeName'))
            }
            return activeName
        }

    },
    mutations: {
        setActiveName: (state,activeName) => {
            state.activeName = activeName
            window.sessionStorage.setItem('activeName',JSON.stringify(activeName))
        }
    }
}

export default configure
