import { type NewsTopic } from "@/refactor_lib/types/api/v1/NewsApiTypes";
import axiosClient from "@/services/axios-client";

async function getAllNewsData(pageNum: number) {
  try {
    return await axiosClient.get<NewsTopic["getAllNewsData"]>(
      `/news/get-all/?page=${pageNum ? pageNum : 1}`,
    );
  } catch (err) {
    console.log("cofig ", err);
  }
}
async function getPageNewsById(id: string) {
  try {
    return await axiosClient.get<NewsTopic["getPageById"]>(
      `/news/by-id/${id}/?page_comments=${1}`,
    );
  } catch (err) {
    console.log(err);
  }
}
async function likePost(id?: string, type?: string, isLike?: any) {
  try {
    if (isLike) {
      return await axiosClient.post("/news/like-or-dislike/", {
        id,
      });
    } else {
      return await axiosClient.post("/news/like-or-dislike/", {
        id,
        type,
      });
    }
  } catch (err) {
    console.log(err);
  }
}

export { getAllNewsData, getPageNewsById, likePost };
