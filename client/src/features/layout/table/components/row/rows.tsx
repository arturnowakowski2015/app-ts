import { useEffect, useRef, useState } from "react";
import { useBuildRows } from "./useBuildRows";
import { Column, Record } from "../../../../../model/Interface";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AppStateContext } from "../../../../../ctx/useThemeContext";

interface IProps {
  cross: boolean;
  columns?: Column[];
  deleteRow: (id: number) => void;
  result: any;
}
export const Rows = ({ cross, columns, result, deleteRow }: IProps) => {
  const [rows, build] = useBuildRows(result);
  const ref = useRef<Function>();
  const location = useLocation();
  ref.current = build;
  const navigate = useNavigate();
  const { state } = useContext(AppStateContext);

  useEffect(() => {
    if (ref.current) ref.current(result, columns);
  }, [result]); // eslint-disable-next-line react-hooks/exhaustive-deps
  return (
    <>
      {rows &&
        rows.map((row, ii) => {
          return (
            <tr
              className={"row-" + state.theme[state.i] + " table-row"}
              key={ii}
            >
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
              <button
                disabled={cross && true}
                onClick={() => deleteRow(row[1] as unknown as number)}
              >
                x
              </button>
            </tr>
          );
        })}
    </>
  );
};
