import { Set, Column, DataAny } from "../../../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "../../../utils/api";
import axios from "axios";
/*
type Key = string | string[]
type Fetcher<Data> = () => Promise<Data>
type Options = { enabled?: boolean; cacheTime?: number }

const useQuery = <Data,>(key: Key, fetcher: Fetcher<Data>, options?: Options): Query<Data> => {
  // ...


const urls: string[] = [
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/photos",
];*/
const getRec = async (url: string) => {
  let y: any = await api.get<DataAny>(url, {
    method: "GET",
  });

  return y;
};

const useGetPaginatedData = (
  direction: boolean,
  len: number,
  currentPage: number,
  set: Set,
  actcategory: string
) => {
  let { data, isFetching, isLoading, isPreviousData } = useQuery(
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
      alert(url);
      let t: any = await axios.get(url);
      //await getRec(url);
      alert(url + "ddd " + JSON.stringify(t));
      return t;
    },
    { keepPreviousData: true, staleTime: 10000000000000 }
  );

  const queryClient = useQueryClient();

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
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage, queryClient]);

  return { isLoading, isFetching, isPreviousData, data } as const;
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
  const { data: sorted_data, refetch: r } = useQuery(
    ["sort", sort],
    async () => {
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
    }
  );
  return { sorted_data, r } as const;
};
export const useDeleteRow = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id1: number) => {
      console.log(id1 + ":id");
      let r = await fetch(
        set.host + set.database + "/" + set.actcategory + "/remove/" + id1,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await r.json();
    },
    {
      onMutate: async (id1) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries(["paginate", "sort"]);

        const currentPage1: any = (
          queryClient.getQueryData(["paginate", currentPage]) as DataAny
        )["data"];
        // remove resolved issue from the cache so it immediately
        // disappears from the UI

        if (currentPage1 && currentPage1["data"]) {
          queryClient.setQueryData(
            ["paginate", currentPage],
            (currentPage1 as DataAny)["data"].filter((t) => {
              return t.id !== id1 && t;
            })
          );
        }

        // save the current data in the mutation context to be able to
        // restore the previous state in case of an error
        return { currentPage1 };
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
