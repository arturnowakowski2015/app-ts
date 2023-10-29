import { Set } from "../../../../model/Interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRec } from "../../../../utils/rest";
import { useLength } from "../../../../pages/App/api/useGetlength";
const useGetPaginatedData = (
  changeLocation: string,
  pageSize: number,
  direction: boolean,
  len: number,
  currentPage: number,
  set: Set,
  actcategory: string
) => {
  const { result } = useLength(true, set);
  let { data, isFetching, isLoading, isSuccess, refetch } = useQuery(
    [`paginate_${currentPage}`, currentPage, changeLocation],
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
    { keepPreviousData: true, staleTime: 1 }
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

    f();
    let url: string = "";
    url =
      set &&
      set.host +
        set.database +
        "/paginate/" +
        actcategory +
        "/" +
        1 +
        "/" +
        result.data.obj?.[actcategory];
    queryClient.prefetchQuery([`paginate_${100}`, 1], async () => {
      //console.log("prefetch 1");
      return getRec(url);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { isLoading, isFetching, isSuccess, data, refetch } as const;
};
export { useGetPaginatedData };
