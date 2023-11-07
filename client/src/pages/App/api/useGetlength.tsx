import { useQuery } from "@tanstack/react-query";

import { Lenghts, Set } from "../../../model/Interface";
import { api } from "../../../utils/api";

const useLength = (isLen: boolean, set: Set) => {
  let {
    data: result,
    isFetching,
    isLoading,
    refetch,
  } = useQuery(
    ["length", isLen],
    async () => {
      let url: string =
        set.host + set.database + "/" + set.actcategory + "/len";
      //"http://localhost:3001/comments/new/len";
      let y: any = await api.get<Lenghts>(url, {
        method: "GET",
      });
      return await y;
    }
    //{ keepPreviousData: true, staleTime: 10000000000 }
  );

  return { result, isLoading, isFetching, refetch };
};
export { useLength };
