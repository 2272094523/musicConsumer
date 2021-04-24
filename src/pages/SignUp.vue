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
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="Form.nickName" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item prop="sex" label="性别">
          <el-radio-group v-model="Form.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="Form.email" placeholder="邮箱" style="width: 70%;"></el-input>
          <span v-if="codeShow" style="color:royalblue;" @click="getEmailCode()">获取验证码</span>
          <!-- 倒计时 -->
          <span v-else-if="!codeShow">{{count}}秒后重试</span>
        </el-form-item>
        <el-form-item prop="emailCode" label="验证码">
          <el-input v-model="Form.emailCode" placeholder="验证码" style="width: 100%;"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker v-model="Form.birth" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="introduction" label="简介">
          <el-input v-model="Form.introduction" placeholder="简介"></el-input>
        </el-form-item>
        <el-form-item prop="location" label="地区">
          <el-select v-model="Form.location" style="width: 100%;">
            <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="goBack(-1)">取消</el-button>
          <el-button type="primary" @click="signUp('Form')">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Logo from "../components/Logo";
  import {cities} from "../assets/data/form";
  import {getCode, SignUp} from "../api";
  import {mapGetters} from 'vuex'

  export default {
    name: "SignUp",
    data() {
      return {
        Form: {
          userName: 'aa123456',
          password: 'aa123445',
          sex: '1',
          email: '984736478@qq.com',
          birth: '',
          introduction: 'ss',
          location: '',
          nickName: 'ss',
          emailCode:'',
        },
        cities: [],
        rules: {},
        codeShow: true,
        count: '',
        timer: null,

        rules: {
          userName: [
            {required: true, trigger: 'blur', message: "请输入用户名"}
          ],
          password: [
            {required: true, trigger: 'blur', message: "请输入密码"}
          ],
          nickName: [
            {required: true, trigger: 'blur', message: "请输入昵称"}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          email: [
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']},
            {required: true, message: "请输入邮箱", trigger: ['blur', 'change']}
          ],
          birth: [
            {required: true, type: 'date', message: '请选择日期', trigger: 'change'}
          ],
          introduction: [
            {required: true, message: '请输入介绍', trigger: 'blur'}
          ],
          location: [
            {required: true, message: '请输入地区', trigger: 'change'}
          ],
          emailCode:[
            {required:true,message:"请输入验证码",trigger:['blur','change']}
          ]
        },
      }
    },
    computed:{
      ...mapGetters(['loginFlag'])
    },
    created() {
      this.cities = cities;
    },
    components: {Logo},
    methods: {
      goBack(index) {
        this.$router.go(index);
        this.$store.commit('setActiveName',this.$route.query.backName)
      },
      signUp(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let date = this.Form.birth;
            date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let params = new URLSearchParams();
            params.append("consumerUserName", this.Form.userName);
            params.append("consumerPassword", this.Form.password);
            params.append("consumerNickName", this.Form.nickName);
            params.append("consumerSex", this.Form.sex);
            params.append("consumerEmail", this.Form.email);
            params.append("consumerBirth", date);
            params.append("consumerIntroduction", this.Form.introduction);
            params.append("consumerLocation", this.Form.location);
            params.append("consumerImg", "/consumerImg/init.JPG");
            params.append("code", this.Form.emailCode);
            let _this = this;
            SignUp(params).then(res => {
              if (res.data.code == 200) {
                _this.$message.success("注册成功");
                this.$store.commit('setLoginFlag',true);
                this.$store.commit('setCurConsumer',res.data.data);
                this.$store.commit('setActiveName','首页')
                setTimeout(function () {
                  _this.$router.push({path: '/'});
                }, 2000);
              } else {
                _this.$message.error(res.data.msg)
              }
            }).catch(err => {
              _this.$message.error("服务器错误,请稍后再试")
            })
          } else {
            this.$message({showClose: true, type: 'info', message: '请将信息补充完整'});
          }
        })

      },
      getEmailCode() {
        if (this.Form.email == '') {
          this.$message({showClose: true, type: 'error', message: '邮箱不能为空'});
          return;
        } else {
          let reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
          let result = reg.test(this.Form.email);
          if (!result) {
            this.$message({showClose: true, type: 'error', message: '邮箱格式错误'});
            return;
          } else {

            getCode(this.Form.email).then(res => {
                if (res.data.code == 200) {
                  this.$message({showClose: true, type: 'success', message: '验证码已发到您的邮箱，请注意查收'});
                  const TIME_OUT = 60;
                  if (!this.timer) {
                    this.count = TIME_OUT;
                    this.codeShow = false;
                    this.timer = setInterval(() => {
                      if (this.count > 0 && this.count <= TIME_OUT) {
                        this.count--;
                      } else {
                        this.codeShow = true;
                        clearInterval(this.timer);
                        this.timer = null;
                      }
                    }, 1000)
                  }
                } else {
                  this.$message({showClose: true, type: 'error', message: '该邮箱已经被注册，请重新填写'});
                  return;
                }
              }
            ).catch(err => {
              this.$message({showClose: true, type: 'error', message: '服务器内部错误'});
            })
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/css/sign-up.scss';
</style>
