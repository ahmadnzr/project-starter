// eslint-disable import/no-cycle -- Allow for this file

import { createAppAsyncThunk } from '../createAppAsyncThunk';

import { type PostInterface, type PostFilter } from './types';

export const getAllPost = createAppAsyncThunk(
  'post/getAllPost',
  async ({
    limit = 10,
    page = 1,
  }: PostFilter): Promise<{ data: PostInterface[]; totalData: number }> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`,
    );
    let totalData = 0;
    for (const [key, value] of response.headers.entries()) {
      if (key === 'x-total-count') {
        totalData = Number(value);
      }
    }
    const data = (await response.json()) as PostInterface[];
    return { data, totalData };
  },
);
