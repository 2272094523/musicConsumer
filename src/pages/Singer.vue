<template>
  <div class="singer">
    <ul class="singer-header">
      <li v-for="(item,index) in singerSex" :key="index" @click="selectBySex(item)"
          :class="{active:item.name==activeName}">
        {{item.name}}
      </li>
    </ul>
    <div>
      <content-list :content-list="data"></content-list>
      <div class="pagination">
        <el-pagination @current-change="handleCurrentChange" background layout="total,prev,pager,next"
                       :current-page="currentPage" :page-size="pageSize" :total="list1.length">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getAllSinger,getSingerBySex} from "../api";
  import ContentList from "../components/ContentList";
  import {singerStyle} from '../assets/data/singer';
  export default {
    name: 'singer',
    data() {
      return {
        activeName: '全部',
        list1: [],
        pageSize: 5,
        currentPage: 1,
        singerSex: [],
      }
    },
    components:{
      ContentList,
    },
    methods: {
      //获取当前页
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      getSinger() {
        getAllSinger().then(res => {
          if (res.data.code = 200) {
            let tempList = res.data.data;
            for (let item of tempList) {
              let type = {
                name: item.singerName,
                img: item.singerImg,
                id: item.singerId,
                type: 0,
                introduction: item.singerIntroduction,
              };
              this.list1.push(type);
            }
          } else {
            this.$message.error("服务器错误")
          }
        }).catch(err => {
          this.$message.error("服务器错误")
        })
      },
      selectBySex(item){
        console.log(item)
        this.list1=[];
        this.activeName=item.name;
        if (item.type==-1){
          this.getSinger();
        }else{
          getSingerBySex(item.type).then(res=>{
            if (res.data.code==200){
              let tempList = res.data.data;
              for (let item of tempList) {
                let type = {
                  name: item.singerName,
                  img: item.singerImg,
                  id: item.sigerId,
                  type: 0,
                  introduction: item.singerIntroduction,
                };
                this.list1.push(type);
              }
            }else{
              this.$message.error("服务器错误")
            }
          }).catch(err=>{
            this.$message.error("服务器错误")
          })
        }
      }
    },
    computed: {
      data() {
        return this.list1.slice((this.currentPage - 1) * this.pageSize, this.pageSize * this.currentPage)
      }
    },
    created() {
      this.getSinger();
      this.singerSex=singerStyle;
    },
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/singer.scss";
</style>
