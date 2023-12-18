'use client';

import { useEffect } from 'react';
import { List, Pagination, type PaginationProps, Skeleton } from 'antd';

import styles from './page.module.css';

import { useDispatch, useSelector } from '@/lib/features/store';
import { ROW_PER_PAGE, getAllPost, postSlice } from '@/lib/features/post';

export default function Home() {
  const dispatch = useDispatch();
  const { data, pagination, status } = useSelector((state) => state.post);

  const onChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    dispatch(
      postSlice.actions.setPagination({
        ...pagination,
        currentPage: page,
        limit: pageSize,
      }),
    );
  };

  useEffect(() => {
    dispatch(
      getAllPost({ limit: pagination.limit, page: pagination.currentPage }),
    );
  }, [dispatch, pagination]);

  return (
    <main className={styles.main}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Skeleton loading={status === 'loading'} active>
              <List.Item.Meta title={item.title} description={item.body} />
              {item.body}
            </Skeleton>
          </List.Item>
        )}
      />
      <Pagination
        current={pagination.currentPage}
        defaultCurrent={1}
        defaultPageSize={ROW_PER_PAGE}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        onChange={onChangePage}
        pageSize={pagination.limit}
        total={pagination.totalData}
      />
    </main>
  );
}
