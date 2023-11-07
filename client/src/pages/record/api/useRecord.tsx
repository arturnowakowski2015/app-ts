import { DataTable } from "../../../model/Interface";
const useRecord = () => {
  const update = (url: string, rec: DataTable) => {};
  const deleteRec = (str: string, rec: DataTable) => {};
  return { update, deleteRec } as const;
};
export { useRecord };
