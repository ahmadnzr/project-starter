'use client';

import { useState } from 'react';
import { List, Pagination, type PaginationProps, Skeleton } from 'antd';

import styles from './page.module.css';

import { type PostFilter } from '@/__commons/utils/types';
import { usePostQueryHook } from '@/__commons/hooks';

export default function Home() {
  const [pagination, setPagination] = useState<PostFilter>({
    page: 1,
    limit: 5,
  });

  const { data, totalData, fetchStatus } = usePostQueryHook({
    ...pagination,
  });

  const onChangePage: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination((val) => ({ ...val, page, limit: pageSize }));
  };

  return (
    <main className={styles.main}>
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Skeleton loading={fetchStatus === 'fetching'} active>
              <List.Item.Meta title={item.title} description={item.body} />
              {item.body}
            </Skeleton>
          </List.Item>
        )}
      />
      {data?.length ? (
        <Pagination
          current={pagination.page}
          defaultCurrent={1}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onChange={onChangePage}
          pageSize={pagination.limit}
          total={totalData}
        />
      ) : null}
    </main>
  );
}
