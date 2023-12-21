import axios, { type AxiosResponse } from 'axios';

import { type PostFilter } from '../types';

/**
 * TODO: Get from .env
 * */
export const BASE_API_URL = 'https://jsonplaceholder.typicode.com';

const responseBody = <T>(response: AxiosResponse<T>) => response;
export const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    axios.post<T>(url, body).then(responseBody),
};

export const postService = {
  getAll: <T>({ limit, page }: PostFilter) =>
    request.get<T>(`${BASE_API_URL}/posts?_limit=${limit}&_page=${page}`),
};
