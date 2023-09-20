import { Set, DataAny } from "../../../model/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useDeleteRec = (set: Set, currentPage: number) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id1: number) => {
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
        let y = await r.json();

        return y;
      } catch (error) {
        alert("dd " + error);
      }
    },
    {
      onMutate: async (id1) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries([["paginate", currentPage], "sort"]);
        // queryClient.removeQueries(["paginate", currentPage]);
      },
    }
  );
  return { mutator };
};
