import { Set, Column, Enabled } from "../../Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { data } from "../../data/dummy";
interface Data {
  [id: string]: any[];
}
interface DataD {
  data: Data;
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
const getRec = async (url: string) => {
  let y: any = await api.get<Data>(url, {
    method: "GET",
  });

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
        let url: string =
          set.host +
          set.database +
          "/paginate/" +
          actcategory +
          "/" +
          currentPage +
          "/" +
          10;
        return getRec(url);
      },
      { keepPreviousData: true, staleTime: 10000000000000 }
    );

  const queryClient = useQueryClient();
  let r: any;
  useEffect(() => {
    let url: string =
      set.host +
      set.database +
      "/paginate/" +
      actcategory +
      "/" +
      currentPage +
      "/" +
      10;
    queryClient.prefetchQuery(["paginate", currentPage], async () => {
      return getRec(url);
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
    let url: string =
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
      10;
    return await getRec(url);
  });
  return [
    sorted_isLoading !== undefined ? sorted_isLoading : false,
    sorted_data,
  ] as const;
};
export const useDeleteRow = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id1: number) => {
      let r = await fetch(
        set.host + set.database + "/" + set.actcategory + "/remove/" + id1,
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
      onMutate: async (id1) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries(["paginate", "sort"]);
        /* alert(
          "pop " +
            JSON.stringify(
              (queryClient.getQueryData(["paginate", currentPage]) as Data)[
                "data"
              ]
            )
        );
        const currentPage1: any = (
          queryClient.getQueryData(["paginate", currentPage]) as Data
        )["data"];
        // remove resolved issue from the cache so it immediately
        // disappears from the UI
        let v: any[] = (currentPage1 as Data)["data"].splice(
          (currentPage1 as Data)["data"].findIndex((t) => {
            return t.id === id1;
          }),
          1
        );
        queryClient.setQueryData(
          ["paginate", currentPage],
          {
            ...(currentPage1 as Data),
            data: v,
          },
          currentPage1
        );
        // save the current data in the mutation context to be able to
        // restore the previous state in case of an error
        return { currentPage1 };
        */
      },
      onSuccess: async () => {
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
