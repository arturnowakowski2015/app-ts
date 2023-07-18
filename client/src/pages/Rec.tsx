import { Record, DataTable, Column } from "../components/Interface";

import { useRec } from "../hooks/useRec";
interface IProps {
  record?: Record[];

  columns: Column[];
  deleteRec: (cat: string, str: DataTable) => void;
  update: (url: string, record?: DataTable) => void;
}
const Rec = ({ record, columns, deleteRec, update }: IProps) => {
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
      <button>update</button>
      <button>delete</button>
    </>
  );
};
export default Rec;
