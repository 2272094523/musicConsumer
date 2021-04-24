import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import MyMusic from '@/pages/MyMusic'
import Singer from '@/pages/Singer'
import SongList from '@/pages/SongList'
import Search from '../pages/Search'
import Lyric from "../pages/Lyric";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Setting from "../pages/Setting";
import SongAlbum from "../pages/SongAlbum";
import SongListAlbum from "../pages/SongListAlbum";

Vue.use(Router)

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-music',
      name: 'my-music',
      component: MyMusic
    },
    {
      path: '/singer',
      name: 'singer',
      component: Singer
    },
    {
      path: '/song-list',
      name: 'song-list',
      component: SongList
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path:'/lyric',
      name:"lyric",
      component:Lyric
    },
    {
      path:'/login',
      name:"login",
      component:Login
    },
    {
      path:'/sign-up',
      name:"sign-up",
      component:SignUp
    },
    {
      path:'/setting',
      name:"Setting",
      component:Setting
    },
    {
      path:'/song-album',
      name:"SongAlbum",
      component:SongAlbum
    },
    {
      path:'/song-list-album',
      name:"SongListAlbum",
      component:SongListAlbum
    },

  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
