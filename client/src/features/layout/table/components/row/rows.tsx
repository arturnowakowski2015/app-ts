import { useEffect, useRef, useState } from "react";
import { useBuildRows } from "./useBuildRows";
import { Column, Set, Enabled, Chevron } from "../../../../../model/Interface";
import { useNavigate, useLocation } from "react-router-dom";

import { useGlobalContext } from "../../../../../ctx/MyGlobalContext";

interface IProps {
  columns?: Column[];
  deleteRow: (id: number) => void;
  result: any;
}
export const Rows = ({ columns, result, deleteRow }: IProps) => {
  const [rows, build] = useBuildRows(result);
  const ref = useRef<Function>();
  const location = useLocation();
  ref.current = build;
  const navigate = useNavigate();
  const { sets, i } = useGlobalContext();

  useEffect(() => {
    if (ref.current) ref.current(result, columns);
  }, [result]); // eslint-disable-next-line react-hooks/exhaustive-deps
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
                      }
                    }}
                  >
                    <div className="string">{t.toString()}</div>
                  </th>
                );
              })}
              <div onClick={() => deleteRow(row[1] as unknown as number)}>
                x{row[1] as unknown as number}
              </div>
            </tr>
          );
        })}
    </>
  );
};
