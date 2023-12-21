import { postService } from '../utils/api';
import { type PostFilter, type PostInterface } from '../utils/types';

export const fetchPost = async ({
  limit = 10,
  page = 1,
}: PostFilter): Promise<{
  post: PostInterface[];
  totalData: number;
}> => {
  const { data, headers } = await postService.getAll<PostInterface[]>({
    limit,
    page,
  });

  return { post: data, totalData: Number(headers['x-total-count']) };
};
