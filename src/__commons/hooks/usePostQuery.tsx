import { useQuery } from '@tanstack/react-query';

import { type PostFilter } from '../utils/types';
import { fetchPost } from '../services';

export const usePostQueryHook = ({ limit, page }: PostFilter) => {
  const { data, isLoading, fetchStatus, isPlaceholderData } = useQuery({
    queryKey: ['post', { limit, page }],
    queryFn: () => fetchPost({ limit, page }),
    placeholderData: (prevData) => prevData,
  });

  return {
    data: data?.post,
    totalData: data?.totalData,
    isLoading,
    fetchStatus,
    isPlaceholderData,
  };
};
