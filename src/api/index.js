import {get,post} from "./http";
import Axios from "axios";

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/selectAll`);
//查询某个歌手
export const getSingerById=(param)=>get(`singer/getSingerById?singerId=${param}`)
//根据性别查询歌手
export const getSingerBySex=(param)=>get(`singer/selectAllBySex?singerSex=${param}`)

//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(singerId) => get(`song/selectAllBySingerId?singerId=${singerId}`);
//根据歌曲id查询歌曲对象
export const songOfSongId =(songId) => get(`song/selectById?songId=${songId}`);
//模糊查询歌曲
export const fuzzySelectSong=(songName)=>get(`song/fuzzySelect?songName=${songName}`)
//查询所有歌曲
export const selectAllSong=()=>get(`song/selectAll`)

//============歌单相关================
//查询歌单
export const getAllSongList =() => get(`songlist/selectAll`);

//============歌单的歌曲相关============
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listsong/selectSongOfListSong?songListId=${songListId}`);
//根据歌单名字模糊查询
export const fuzzySelectSongList=(songListTitle)=>get(`songlist/fuzzySelectByTitle?songListTitle=${songListTitle}`)
//查询全部风格
export const selectSongStyle=()=>get(`songlist/getSongStyle`)
//根据风格名字查询全部歌单
export const selectSongListByStyle=(param)=>get(`songlist/selectByStyle?songListStyle=${param}`)
//============用户相关================
//查询用户
export const getAllConsumer =() => get(`consumer/selectAll`);
//查询某个用户下收藏的歌曲
export const selectCollectSong=(params)=>get(`collect/selectCollectSong?consumerId=${params}`)
//查询某个用户下收藏的歌单
export const selectCollectSongList=(params)=>get(`collect/selectCollectSongList?consumerId=${params}`)
//增加收藏
export const insertCollect=(params)=>post(`collect/insert`,params)
//取消收藏
export const deleteCollect=(params)=>post(`collect/delete`,params)
//获取邮箱验证码
export const getCode=(param)=>get(`consumer/getEmailCode?consumerEmail=${param}`)


//注册用户
export const SignUp=(param)=>post('consumer/insert',param)

//登录
export const Login=(param)=>post('consumer/login',param)


//增加歌单评价
export const insertRank=(param)=>post('rank/insert',param);
//查看歌单平均分
export const selectRankAvgScore=(param)=>get(`rank/selectAvgScore?rankSongListId=${param}`)
//提交评论
export const insertComment=(param)=>post('comment/insert',param)
//查看歌曲评论
export const selectSongComment=(param)=>get(`comment/selectCommentBySongId?songId=${param}`)
//查看歌单评论
export const selectSongListComment=(param)=>get(`comment/selectCommentBySongListId?songListId=${param}`)

export const downLoadMusic=(url)=>Axios({
  method:'get',
  url:url,
  responseType:'blob'
})
