import { Set } from "../../../../model/Interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRec } from "../../../../utils/rest";

const useGetPaginatedData = (
  changeLocation: string,
  pageSize: number,
  direction: boolean,
  len: number,
  currentPage: number,
  set: Set,
  actcategory: string
) => {
  let { data, isFetching, isLoading, isSuccess, refetch } = useQuery(
    ["paginate", currentPage, changeLocation],
    async () => {
      let url: string =
        set &&
        set.host +
          set.database +
          "/paginate/" +
          actcategory +
          "/" +
          currentPage +
          "/" +
          pageSize;

      // console.log("paginate 1");

      return getRec(url);
    },
    { keepPreviousData: true, staleTime: 10000 }
  );
  const queryClient = useQueryClient();
  useEffect(() => {
    const f = async () => {
      let url: string =
        set &&
        set.host +
          set.database +
          "/paginate/" +
          actcategory +
          "/" +
          currentPage +
          "/" +
          pageSize;

      // console.log("paginate 1");

      return getRec(url);
    };
    f(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let url: string =
      set &&
      set.host +
        set.database +
        "/paginate/" +
        actcategory +
        "/" +
        currentPage +
        "/" +
        pageSize;
    queryClient.prefetchQuery(["paginate", currentPage], async () => {
      //console.log("prefetch 1");
      return getRec(url);
    });
    let url1: string =
      set &&
      set.host +
        set.database +
        "/paginate/" +
        actcategory +
        "/" +
        (Number(currentPage) + 1) +
        "/" +
        pageSize;
    queryClient.prefetchQuery(
      ["paginate", Number(currentPage) + 1],
      async () => {
        console.log("prefetch 1+1");
        return getRec(url1);
      }
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, queryClient]);

  return { isLoading, isFetching, isSuccess, data, refetch } as const;
};
export { useGetPaginatedData };
