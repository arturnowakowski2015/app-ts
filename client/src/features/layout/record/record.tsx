import { DataTable, Column, Set } from "../../../model/Interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRec } from "./api/useRec";
import { useDeleteRow } from "../table/api/useDeleteRow";

import "../../../styles/record.scss";
interface IProps {
  url: string;
  id: number;
  record?: DataTable[];
  currentPage: number;
  set: Set;
  columns: Column[];
  deleteRec: (cat: string, str: DataTable) => void;
  update: (url: string, record: DataTable) => void;
}
export const Rec = ({
  url,
  id,
  record,
  columns,
  currentPage,
  set,
  deleteRec,
  update,
}: IProps) => {
  const navigate = useNavigate();
  const { data, setData } = useRec(record as DataTable[], columns);
  const { mutator, len1: mutatedLen } = useDeleteRow(set, currentPage);
  const deleteRecord = () => {
    mutator.mutate(id);
  };
  useEffect(() => {
    setTimeout(() => {
      navigate("/" + set.actcategory);
    }, 4000);
  }, [deleteRecord]);
  return (
    <div className="recordcontainer">
      {mutator.isLoading && <div>...deleting</div>}
      {mutator.isSuccess && <div>Successfully deleted !!!</div>}
      <div>{data && Object.entries(data) && Object.keys(data)[2]}</div>
      <input
        type="text"
        value={
          (data && data[columns && columns[2] && columns[2].col.title]) || ""
        }
        onChange={(e) =>
          setData({
            ...data,
            [columns[2].col.title]: e.currentTarget.value,
          })
        }
      />{" "}
      <div>{data && Object.entries(data) && Object.keys(data)[3]}</div>
      <input
        type="text"
        value={
          (data && data[columns && columns[3] && columns[3].col.title]) || ""
        }
        onChange={(e) =>
          setData({
            ...data,
            [columns[3].col.title]: e.currentTarget.value,
          })
        }
      />{" "}
      <div>{data && Object.entries(data) && Object.keys(data)[4]}</div>
      <input
        type="text"
        value={
          (data && data[columns && columns[4] && columns[4].col.title]) || ""
        }
        onChange={(e) =>
          setData({
            ...data,
            [columns[4].col.title]: e.currentTarget.value,
          })
        }
      />
      <br />
      <br />
      <br />
      <button disabled={(mutator.isLoading || mutator.isSuccess) && true}>
        update
      </button>
      <button
        disabled={(mutator.isLoading || mutator.isSuccess) && true}
        onClick={() => deleteRecord()}
      >
        delete
      </button>
    </div>
  );
};
