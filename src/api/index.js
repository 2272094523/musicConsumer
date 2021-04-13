import {get,post} from "./http";

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/selectAll`);

//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(singerId) => get(`singer/selectAllBySingerId?singerId=${singerId}`);
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

//============用户相关================
//查询用户
export const getAllConsumer =() => get(`consumer/selectAll`);
