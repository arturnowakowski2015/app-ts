import { Set, Column, DataAny } from "../../../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { api } from "../../../utils/api";

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
  let { data, isFetching, isLoading, isPreviousData, refetch } = useQuery(
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
      console.log("paginate 1");
      return getRec(url);
    },
    { keepPreviousData: true, staleTime: 10000 }
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
      console.log("prefetch 1");
      return getRec(url);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, currentPage, queryClient]);
  useEffect(() => {
    let url: string =
      set.host +
      set.database +
      "/paginate/" +
      actcategory +
      "/" +
      (Number(currentPage) + 1) +
      "/" +
      10;
    queryClient.prefetchQuery(
      ["paginate", Number(currentPage) + 1],
      async () => {
        console.log("prefetch 1+1");
        return getRec(url);
      }
    ); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, queryClient]);

  return { isLoading, isFetching, isPreviousData, data, refetch } as const;
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
      console.log("sort");
      return await getRec(url);
    }
  );
  return { sorted_data, r } as const;
};
export const useDeleteRow = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id1: number) => {
      console.log(
        id1 +
          ": " +
          set.host +
          set.database +
          "/" +
          set.actcategory +
          "/remove/" +
          id1
      );
      let r;
      try {
        r = await fetch(
          set.host + set.database + "/" + set.actcategory + "/remove/" + id1,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return await r.json();
        return r;
      } catch (error) {
        alert("dd " + error);
      }
    },
    {
      onMutate: async (id1) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries(["paginate", "sort"]);

        const currentPage1: any = (
          queryClient.getQueryData(["paginate", currentPage]) as DataAny
        )["data"];
        const nextPage: any =
          (queryClient.getQueryData([
            "paginate",
            Number(currentPage) + 1,
          ]) as DataAny) &&
          (
            queryClient.getQueryData([
              "paginate",
              Number(currentPage) + 1,
            ]) as DataAny
          )["data"];
        let data: any =
          (currentPage1 as DataAny) &&
          (currentPage1 as DataAny)["data"].splice(
            (currentPage1 as DataAny)["data"].findIndex((t) => {
              return t.id === id1 && t;
            }),
            1
          );

        // there might not be any issues left to add if a user clicks fast
        // and/or the internet connection is slow

        // remove resolved issue from the cache so it immediately
        // disappears from the UI

        /*       queryClient.setQueryData(["issues"], {
          ...currentPage,
          items: currentPage.items.filter(({ id }) => id !== issueId),
        });
*/

        //alert(JSON.stringify(currentPage1));
        if (currentPage1 && currentPage1["data"]) {
          queryClient.setQueryData(["paginate", id1], {
            ...currentPage1,
            data: {
              data: currentPage1.data.push(nextPage.data[0]),
            },
          });
        }
        nextPage.data.shift();

        // save the current data in the mutation context to be able to
        // restore the previous state in case of an error
        console.log(currentPage1.data.length + ":::" + nextPage.data.length);
        return { currentPage1, nextPage };
      },
      onSettled: async () => {
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        queryClient.invalidateQueries(["paginate", 1]);
      },
    }
  );
  return mutator;
};
export { useGetPaginatedData, useGetSortedData };
