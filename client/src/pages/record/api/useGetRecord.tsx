import { useQuery } from "@tanstack/react-query";

import { Lenghts, Set } from "../../../model/Interface";
import { api } from "../../../utils/api";
import { getRecord } from "../../../utils/rest";

const useGetRecord = (id: number, set: Set) => {
  let {
    data: result,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ["getrecord", id],
    async () => {
      let url: string =
        set &&
        set.host + set.database + "/" + set.actcategory + "/getrecord/" + id;
      return await getRecord(url);
    },
    { keepPreviousData: true, staleTime: 10000 }
  );

  return { result, isLoading, isFetching, refetch };
};
export { useGetRecord };
