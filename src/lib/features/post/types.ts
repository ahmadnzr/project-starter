export interface PostInterface {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostFilter {
  limit?: number;
  page?: number;
}

export interface Pagination {
  totalData: number;
  currentPage: number;
  limit: number;
}

export interface PostSliceState {
  data: PostInterface[];
  status: 'idle' | 'loading' | 'failed';
  pagination: Pagination;
}
