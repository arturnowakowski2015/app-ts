import { Set, Column } from "../../../../model/Interface";
import { useQuery } from "@tanstack/react-query";
import { getRec } from "../../../../utils/rest";

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
  const { data: sorted_data, refetch: refetchSorted } = useQuery(
    ["sort", sort],
    async () => {
      let url: string =
        set &&
        set.host +
          set.database +
          "/sort/" +
          actcategory +
          "/" +
          columns?.[selectedColumn]?.col?.title +
          "/" +
          (chevron ? "DESC" : "ASC") +
          "/" +
          currentPage +
          "/" +
          pageSize;

      return await getRec(url);
    }
  );

  return { sorted_data, refetchSorted } as const;
};

export { useGetSortedData };
