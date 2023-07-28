import { Set, Column, DataAny } from "../../../../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getRec } from "../../../../utils/rest";

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

export let len: number = 0;

const useGetSortedData = (
  pageSize: number,
  sort: boolean,
  set: Set,
  currentPage: number,
  actcategory: string,
  columns: Column[],
  selectedColumn: number,
  chevron: Boolean
) => {
  let u: number = 0;
  let y: any;
  const { data: sorted_data, refetch: r } = useQuery(
    ["sort", sort],
    async () => {
      let url: string =
        set &&
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
          pageSize;

      return await getRec(url);
    }
  );

  return { sorted_data, r } as const;
};

export { useGetSortedData };
