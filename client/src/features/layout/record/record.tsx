import { DataTable, Column, Set } from "../../../model/Interface";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRec } from "./api/useRec";
import { useDeleteRow } from "../table/api/useDeleteRow";
import { useUpdateRec } from "./api/useUpdateRec";
import "../../../styles/record.scss";
interface IProps {
  setLen: (str: boolean) => void;
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
  setLen,
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
  const { mutator: updateMutator } = useUpdateRec(set, data);
  const updateRecord = () => {
    updateMutator.mutate(id);
    setTimeout(() => {
      navigate("/" + set.actcategory);
    }, 1700);
  };
  const deleteRecord = () => {
    mutator.mutate(id);
    setTimeout(() => {
      navigate("/" + set.actcategory);
    }, 1700);
  };

  return (
    <div className="recordcontainer">
      <div style={{ height: "20px" }}>
        {mutator.isLoading && <div>...deleting</div>}
        {mutator.isSuccess && <div>Successfully deleted !!!</div>}
        {updateMutator.isLoading && <div>...updating</div>}
        {updateMutator.isSuccess && <div>Successfully updated !!!</div>}
      </div>
      <input type="text" value={id} />
      {"    " + "    id"}
      <br></br> <br />
      <br></br>
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
      />
      {"  >  " + data && Object.entries(data) && Object.keys(data)[2]}
      <br /> <br />
      <br />
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
      />
      {"  >  " + data && Object.entries(data) && Object.keys(data)[3]}
      <br></br> <br />
      <br />
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
      {"  >  " + data && Object.entries(data) && Object.keys(data)[4]}
      <br />
      <br />
      <br />
      <button
        disabled={
          (mutator.isLoading ||
            mutator.isSuccess ||
            updateMutator.isLoading ||
            updateMutator.isSuccess) &&
          true
        }
        onClick={() => updateRecord()}
      >
        update
      </button>
      <button
        disabled={
          (mutator.isLoading ||
            mutator.isSuccess ||
            updateMutator.isLoading ||
            updateMutator.isSuccess) &&
          true
        }
        onClick={() => {
          deleteRecord();
          setTimeout(() => {
            setLen(true);
          }, 5000);
        }}
      >
        delete
      </button>
    </div>
  );
};
