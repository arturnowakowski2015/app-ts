import { Record, DataTable, Column } from "../components/Interface";

import { useRec } from "../hooks/useRec";
interface IProps {
  record?: Record[];
  categoryurl: string;
  columns: Column[];
  deleteRec: (cat: string, str: DataTable) => void;
  update: (url: string, record?: DataTable) => void;
}
const Rec = ({ record, categoryurl, columns, deleteRec, update }: IProps) => {
  const [data, setData] = useRec(record as Record[], columns);
  return (
    <>
      <div>{data && Object.entries(data) && Object.keys(data)[2]}</div>
      <input
        type="text"
        value={(data && data[columns[2].col.title]) || ""}
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
        value={(data && data[columns[3].col.title]) || ""}
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
        value={(data && data[columns[4].col.title]) || ""}
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
      <button
        onClick={() => {
          update(categoryurl, data);
        }}
      >
        update
      </button>
      <button
        onClick={() => {
          deleteRec(categoryurl, data);
        }}
      >
        delete
      </button>
    </>
  );
};
export default Rec;
