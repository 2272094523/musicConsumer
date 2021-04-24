<template>
  <div>
    <Logo></Logo>
    <div class="signUp">
      <div class="signUp-head">
        <span>用户注册</span>
      </div>
      <el-form :model="Form" ref="Form" label-width="70px" class="demo-ruleForm" :rules="rules">
        <el-form-item prop="userName" label="用户名">
          <el-input v-model="Form.userName" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="Form.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goBack(-1)">取消</el-button>
          <el-button type="primary" @click="Login('Form')">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import {Login} from "../api";
  import Logo from "../components/Logo";
  import {mapGetters} from 'vuex'

  export default {
    name: "Login",
    components: {Logo},
    data() {
      return {
        Form: {
          userName: '',
          password: '',
        },
        rules: {
          userName: [
            {required: true, trigger: 'blur', message: "请输入用户名"}
          ],
          password: [
            {required: true, trigger: 'blur', message: "请输入密码"}
          ],
        },
      }
    },
    computed:{
      ...mapGetters(['loginFlag','curConsumer'])
    },
    methods: {
      goBack(index) {
        this.$router.go(index);
        this.$store.commit('setActiveName',this.$route.query.backName)
      },
      Login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let param=new URLSearchParams();
            param.append("consumerUserName",this.Form.userName);
            param.append("consumerPassword",this.Form.password);
            Login(param).then((res=>{
              if (res.data.code==200){
                this.$message.success("登录成功");
                this.$store.commit('setLoginFlag',true);
                this.$store.commit('setCurConsumer',res.data.data);
                this.$store.commit('setActiveName','首页')
                this.$router.push({path:'/'});
              }else{
                this.$message({showClose: true, type: 'error', message: res.data.msg});
              }
            })).catch((err=>{
              this.$message({showClose: true, type: 'error', message: '服务器错误，请稍后再登录'});
            }))
          }else {
            this.$message({showClose: true, type: 'info', message: '请输入完整的用户名和密码'});
          }
        })
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../assets/css/sign-up.scss';
</style>
