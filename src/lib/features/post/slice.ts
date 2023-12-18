import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { getAllPost } from './service';
import { type Pagination, type PostSliceState } from './types';

export const ROW_PER_PAGE = 5;

const initialState: PostSliceState = {
  data: [],
  status: 'idle',
  pagination: {
    totalData: 0,
    currentPage: 1,
    limit: ROW_PER_PAGE,
  },
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPagination: (state, action: PayloadAction<Pagination>) => {
      state.pagination = {
        ...state.pagination,
        limit: action.payload.limit,
        currentPage: action.payload.currentPage,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllPost.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload.data;
        state.pagination.totalData = action.payload.totalData;
      });
  },
});
