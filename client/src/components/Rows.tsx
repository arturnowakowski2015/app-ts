import { useEffect, useRef } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable, Record } from "./Interface";
import { useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext } from "../ctx/MyGlobalContext";
interface IProps {
  data?: DataTable[];
  columns?: Column[];
  selectRecord: (rec: Record[]) => void;
}
const Rows = ({ data, columns, selectRecord }: IProps) => {
  const [rows, build] = useBuildRows();
  const ref = useRef<Function>();
  const location = useLocation();
  ref.current = build;
  useEffect(() => {
    if (ref.current) ref.current(data, columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const navigate = useNavigate();
  const { sets, i } = useGlobalContext();
  return (
    <>
      {rows &&
        rows.map((row, ii) => {
          return (
            <tr
              className={"row-" + sets[i] + " table-row"}
              key={ii}
              onClick={() => {
                if (location.pathname.split("/")[1] !== "settings") {
                  navigate("/record/" + row[1]);
                  selectRecord(row);
                }
              }}
            >
              {row.map((t, j) => {
                return (
                  <th key={j}>
                    <div className="string">{t.toString()}</div>
                  </th>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};
export default Rows;
