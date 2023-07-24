import { Set } from "../../../model/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const useDeleteRow = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id: number) => {
      let r = await fetch(
        set.host +
          set.database +
          "/" +
          set.actcategory +
          "/remove/" +
          (id + currentPage * 10 + 1),
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
      onSuccess: async () => {
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        // queryClient.invalidateQueries(["paginate"]);
        queryClient.invalidateQueries(["paginate", currentPage]);
      },
    }
  );
};
export { useDeleteRow };
