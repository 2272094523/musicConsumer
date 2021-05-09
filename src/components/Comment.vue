<template>
  <div>
    <div class="comment">
      <h2>评论</h2>
      <div class="comment-msg">
        <div class="comment-img">
          <img :src="attachImageUrl(this.curConsumer.consumerImg)" v-if="this.loginFlag">
        </div>
        <el-input class="comment-input" type="textarea" :rows="2" placeholder="请输入评论内容" v-model="content"></el-input>
      </div>
      <el-button type="primary" class="sub-btn" @click="addComment">评论</el-button>
      <p>精彩评论:{{commentList.length}}条评论</p>
      <ul class="popular" v-for="(item,index) in commentList" :key="index">
        <li>
          <div class="popular-img">
            <img :src="attachImageUrl(item.consumer.consumerImg)"/>
          </div>
          <div class="popular-msg">
            <ul>
              <li class="name">{{item.consumer.consumerNickName}}</li>
              <li class="name">{{item.commetCreateTime}}</li>
              <li class="time">{{item.commentContent}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mixin} from "../mixins";
  import {mapGetters} from "vuex";
  import {insertComment,selectSongListComment} from "../api";

  export default {
    name: "Comment",
    mixins:[mixin],
    props:[
      'beWriteId','type'
    ],
    data(){
      return{
        content:'',
        commentList:[],
      }
    },
    computed:{
      ...mapGetters(['curConsumer','loginFlag'])
    },
    methods:{
      addComment(){
        if(!this.loginFlag){
          this.$message.error("请先登录");
          return;
        }else{
          if (this.content==''){
            this.$message.error("请输入评论内容");
            return;
          }
          let params=new URLSearchParams();
          params.append("commentType",this.type);
          params.append("consumer.consumerId",this.curConsumer.consumerId);
          params.append("commentContent",this.content);
          params.append("commentBeWriteId",this.beWriteId);
          insertComment(params).then(res=>{
            if (res.data.code==200){
              this.$message.success("评论成功");
              this.commentList=[],
              this.selectAllComment();
            }else{
              this.$message.error(res.data.msg);
            }
          }).catch(err=>{
            this.$message.error("评论失败，服务器错误");
          })
        }
      },
      selectAllComment(){
        selectSongListComment(this.beWriteId).then(res=>{
          this.commentList=res.data.data;
        })
      },

    },
    created() {
      this.selectAllComment();
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/comment.scss";

</style>
