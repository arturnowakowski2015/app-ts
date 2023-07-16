import { useEffect, useRef } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, DataTable, Record } from "./Interface";
import { useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext } from "../ctx/MyGlobalContext";
import { Set } from "./Interface";
interface IProps {
  data?: DataTable[];
  columns?: Column[];
  selectRecord: (rec: Record[]) => void;
  remove: (ii: number) => void;
}
const Rows = ({ data, columns, remove, selectRecord }: IProps) => {
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
            <tr className={"row-" + sets[i] + " table-row"} key={ii}>
              {row.map((t, j) => {
                return (
                  <th
                    key={j}
                    onClick={() => {
                      if (location.pathname.split("/")[1] !== "settings") {
                        navigate("/record/" + row[1]);
                        selectRecord(row);
                      }
                    }}
                  >
                    <div className="string">{t.toString()}</div>
                  </th>
                );
              })}
              <div onClick={() => remove(ii)}>x</div>
            </tr>
          );
        })}
    </>
  );
};
export default Rows;
