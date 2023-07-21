import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from "../utils/reactQuery";

export const useGetTableData = (page: number, limit: number) =>
  useFetch<any[]>(
    `http://localhost:3001/comments/paginate/new?_page=${page}&limit=${limit}`
  );
