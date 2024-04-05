import type { Post } from '@/types/post';
import { getAxiosInstance, getResponseData } from '@/utils/axios';
import { POSTS } from '@/utils/constants/endpoint';

export const getPost = async () => {
  const response = await getAxiosInstance().get(POSTS.GET_POST);
  return getResponseData<Post[]>(response);
};
