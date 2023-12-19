import { type PostInterface, type PostFilter } from '../types';

export const fetchPost = async ({
  limit = 10,
  page = 1,
}: PostFilter): Promise<{
  post: PostInterface[];
  totalData: number;
}> => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
  );

  let totalData = 0;
  for (const [key, value] of response.headers.entries()) {
    if (key === 'x-total-count') {
      totalData = Number(value);
    }
  }

  const post = (await response.json()) as PostInterface[];
  return { post, totalData };
};
