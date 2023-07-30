import { Set, Column, DataAny } from "../../../model/Interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getFilteredStr } from "../../../utils/rest";

export const useFilterData = (
  pageSize: number,

  currentPage: number,
  set: Set,
  actcategory: string,
  filteredstr: string
) => {
  let { data, isFetching, isLoading, isSuccess, refetch } = useQuery(
    ["paginate", filteredstr],
    async () => {
      let url: string =
        set &&
        set.host +
          set.database +
          "/filter/" +
          actcategory +
          "/" +
          filteredstr +
          "/" +
          currentPage +
          "/" +
          pageSize;

      return getFilteredStr(url);
    },
    { keepPreviousData: true, staleTime: 10000 }
  );
  return { data, isFetching, isLoading, isSuccess, refetch };
};
