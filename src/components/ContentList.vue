<template>
  <div class="content-list">
    <ul class="section-content" >
      <li class="content-item" v-for="(item,index) in contentList" :key="index" style="margin-left: 15px;margin-top: 20px">
        <div class="kuo" >
          <img class="item-img" :src="attachImageUrl(item.img)" >
          <div class="mask">
            <svg class="icon">
              <use xlink:href="#icon-bofang"></use>
            </svg>
          </div>
        </div>
        <span class="item-name">{{item.name}}</span>
      </li>

    </ul>
  </div>
</template>
<script>
  import {mixin} from '../mixins';

  export default {
    mixins: [mixin],
    name: 'content-list',
    props:['contentList']


  }
</script>
<style lang="scss" scoped>
  @import '../assets/css/content-list.scss';
</style>
