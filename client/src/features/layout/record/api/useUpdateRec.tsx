import { Set, DataAny, DataTable } from "../../../../model/Interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecord } from "../../../../utils/rest";
const useUpdateRec = (set: Set, data: DataTable) => {
  const queryClient = useQueryClient();
  const mutator = useMutation(
    async (id1: number) => {
      let url: string = "https://xydxrz-3000.csb.app/comments/new/update/" + id1;
      try {
        return await updateRecord(url, { data: data });
      } catch (error) {
        alert("dd " + error);
      }
    },
    {
      onMutate: async (id: number) => {
        // cancel all queries that contain the key "issues"
        await queryClient.cancelQueries(["getrecord"]);
      },
    }
  );

  return { mutator };
};
export { useUpdateRec };
