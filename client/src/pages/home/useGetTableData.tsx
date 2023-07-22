import { Set, Column, Enabled } from "../../Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { data } from "../../data/dummy";
interface Data {
  [id: string]: any[];
}
type PageMeta = {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type Generic = {
  items: Data;
  meta: PageMeta;
};
/*
type Key = string | string[]
type Fetcher<Data> = () => Promise<Data>
type Options = { enabled?: boolean; cacheTime?: number }

const useQuery = <Data,>(key: Key, fetcher: Fetcher<Data>, options?: Options): Query<Data> => {
  // ...

*/
const urls: string[] = [
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/photos",
];
const getRec = async (actcategory: string, page: number, set: Set) => {
  let y: any = await api.get<Data>(
    set.host +
      set.database +
      "/paginate/" +
      actcategory +
      "/" +
      page +
      "/" +
      300,
    {
      method: "GET",
    }
  );

  return y;
};
const controller = new AbortController();
const signal = controller.signal;
const getRecSorted = async (
  actcategory: string,
  selectedColumn: number,
  currentPage: number,
  columns: Column[],
  chevron: Boolean,
  set: Set
) => {
  return await api.get<Data>(
    set.host +
      set.database +
      "/sort/" +
      actcategory +
      "/" +
      (columns &&
        columns[selectedColumn] &&
        columns[selectedColumn].col.title) +
      "/" +
      (chevron ? "DESC" : "ASC") +
      "/" +
      currentPage +
      "/" +
      300,
    { signal, method: "GET" }
  );
};
const useGetPaginatedData = (
  direction: boolean,
  len: number,
  currentPage: number,
  set: Set,
  actcategory: string
) => {
  let { data, isFetching, isLoading, isPreviousData, error, refetch } =
    useQuery(
      ["paginate", currentPage],
      async () => {
        return getRec(actcategory, currentPage, set);
      },
      { keepPreviousData: true, staleTime: 100000000 }
    );

  const queryClient = useQueryClient();
  let r: any;
  useEffect(() => {
    let page: number = 0;

    queryClient.prefetchQuery(["paginate", currentPage + 1], async () => {
      return getRec(actcategory, (page = 1), set);
    });
  }, [data, currentPage, queryClient]);

  return [isLoading, isFetching, isPreviousData, data] as const;
};

const useGetSortedData = (
  sort: boolean,
  set: Set,
  currentPage: number,
  actcategory: string,
  columns: Column[],
  selectedColumn: number,
  chevron: Boolean
) => {
  const {
    data: sorted_data,
    isLoading: sorted_isLoading,
    isFetching,
    refetch: r,
  } = useQuery(["sort", sort], async () => {
    return await getRecSorted(
      actcategory,
      selectedColumn,
      currentPage,
      columns,
      chevron,
      set
    );
  });
  return [
    sorted_isLoading !== undefined ? sorted_isLoading : false,
    sorted_data,
  ] as const;
};
export const useDeleteRow = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id: number) => {
      let r = await fetch(
        set.host +
          set.database +
          "/" +
          set.actcategory +
          "/remove/" +
          (id + currentPage * 10 + 1),
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let t = await r.json();
    },
    {
      onMutate: async (issueId) => {
        alert(99);
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries(["paginate", "sort"]);
      },

      onSuccess: async () => {
        alert(80);
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        // queryClient.invalidateQueries(["paginate"]);
        queryClient.invalidateQueries(["paginate", currentPage]);
      },
    }
  );
  return mutator;
};
export { useGetPaginatedData, useGetSortedData };
