<template>
  <div class="search-song-Lists">
    <content-list :contentList="list"></content-list>
  </div>
</template>

<script>
  import ContentList from "../ContentList";
  import {mixin} from "../../mixins";
  import {mapGetters} from 'vuex'
  import {fuzzySelectSongList} from "../../api";
  export default {
    name: "SearchSongList",
    components:{
      ContentList,
    },
    computed:{
      ...mapGetters(['keyWords'])
    },
    data(){
      return{
        list:[],
      }
    },
    mounted() {
      this.fuzzySelect(this.keyWords);
    },
    methods:{
      fuzzySelect(keyWords){
        fuzzySelectSongList(keyWords).then(res=>{
          if (res.data.code==200){
            for (let item of res.data.data){
              console.log(item.songListImg);
              let type={id:item.songListId,type:1,img:item.songListImg,name:item.songListTitle,introduction:item.songListIntroduction}
              this.list.push(type);
            }
            this.$message.success("查询成功")
            console.log(111)
            console.log(this.list)
          }
        }).catch(err=>{
          this.$message.error("服务器错误")
        })
      }
    },
    watch:{
      keyWords(){
        this.fuzzySelect(this.keyWords);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/search-song-Lists.scss";
</style>
