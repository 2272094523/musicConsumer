const user={
  state:{
    curConsumer:[],
    loginFlag:false,
  },
  getters:{
    curConsumer: state => {
      state.loginFlag=JSON.parse(localStorage.getItem('curConsumer'))
      return state.loginFlag;
    },
    loginFlag:state => {
      state.loginFlag=JSON.parse(localStorage.getItem('loginFlag'))
      return state.loginFlag;
    },
  },
  mutations:{
    setCurConsumer: (state, curConsumer) => {
      state.curConsumer = curConsumer;
      localStorage.setItem('curConsumer', JSON.stringify(curConsumer));
    },
    setLoginFlag: (state, loginFlag) => {
      state.loginFlag = loginFlag;
     localStorage.setItem('loginFlag',JSON.stringify(loginFlag));
    },
  }
}
export default user;
