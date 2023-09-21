import { Set, DataAny } from "../../../../model/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { len } from "./useGetSortedData";
let len1 = len;
export const useDeleteRow = (set: Set, currentPage: number) => {
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
        return await r.json();
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

        (currentPage1 as DataAny) &&
          (currentPage1 as DataAny)["data"].splice(
            (currentPage1 as DataAny) &&
              (currentPage1 as DataAny)["data"].findIndex((t) => {
                return t.id === id1 && t;
              }),
            1
          ); // eslint-disable-next-line

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
        nextPage?.data.shift();
        console.log(
          "oooooooooooooooooooooooooooooooo",
          JSON.stringify(nextPage)
        );

        // save the current data in the mutation context to be able to
        // restore the previous state in case of an error

        len1 = currentPage1.obj[set.actcategory];
        return { currentPage1, nextPage };
      },
      onSettled: async (res) => {
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        len1 = res.obj[set.actcategory];
        queryClient.invalidateQueries(["paginate"]);
      },
    }
  );
  return { mutator, len1 };
};
