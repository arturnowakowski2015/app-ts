import { useEffect } from "react";
import { Set, DataAny, Data1 } from "../../../../model/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { len } from "./useGetSortedData";
import { getRec } from "../../../../utils/rest";
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
        console.log("dd " + error);
      }
    },
    {
      onMutate: async (id1) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries([`paginate_${currentPage}`, "sort"]);

        const currentPage1: any | undefined = (
          queryClient.getQueryData([
            `paginate_${currentPage}`,
            currentPage,
            "new",
          ]) as DataAny
        )?.["data"];
        let nextPage: any | undefined = undefined;

        nextPage = (queryClient.getQueryData([`paginate_100`, 1]) as DataAny)[
          "data"
        ];

        // const nextPage: any | undefined = (
        //   queryClient.getQueryData([
        //     `paginate_${currentPage + 1}`,
        //     Number(currentPage) + 2,
        //   ]) as DataAny
        // )["data"];
        let row: any = await nextPage?.data?.filter((t: any) => {
          return t.id === id1 && t;
        })[0];

        (currentPage1 as Data1)["data"].splice(
          (currentPage1 as Data1)["data"].findIndex((t) => {
            return t?.id === id1 && t;
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

        // alert(JSON.stringify(row));
        if (currentPage1 && currentPage1["data"]) {
          await queryClient.setQueryData(
            [`paginate_${currentPage}`, currentPage],
            {
              ...currentPage1,
              data: {
                data: currentPage1.data.push(row),
              },
            }
          );
          nextPage.data = nextPage?.data?.filter((t: any) => {
            return t.id !== id1 && t;
          });
          // save the current data in the mutation context to be able to
          // restore the previous state in case of an error

          len1 = currentPage1.obj[set.actcategory];
        }

        return { currentPage1, nextPage };
      },
      onSettled: async (res) => {
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        len1 = res.obj[set.actcategory];
      },
    }
  );
  return { mutator, len1 };
};
