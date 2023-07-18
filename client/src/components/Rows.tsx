import { useEffect, useRef, useState } from "react";
import { useBuildRows } from "../hooks/useBuildRows";
import { Column, Set, Enabled, Chevron } from "./Interface";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useGlobalContext } from "../ctx/MyGlobalContext";

interface IProps {
  enabled: Enabled;
  selectedColumn: number;
  chevron: Chevron;
  actcategory: string;
  currentPage: number;
  columns?: Column[];
  set: Set;
  datas: (data: any, sorted_data: any) => void;
  setEnabledSet: (arr: Enabled) => void;
}
const Rows = ({
  setEnabledSet,
  datas,
  enabled,
  selectedColumn,
  chevron,
  actcategory,
  set,
  currentPage,
  columns,
}: IProps) => {
  const [rows, build] = useBuildRows();
  const ref = useRef<Function>();
  const location = useLocation();
  ref.current = build;

  let { data, isLoading, error, refetch } = useQuery(
    ["paginate", currentPage],
    async () => {
      const data = await fetch(
        set.host +
          set.database +
          "/paginate/" +
          actcategory +
          "/" +
          10 * currentPage +
          "/" +
          (currentPage * 10 + 10),
        {
          method: "GET",
        }
      );
      return await data.json();
    },
    { cacheTime: 0 }
  );

  const {
    data: sorted_data,
    isLoading: sorted_isLoading,

    refetch: r,
  } = useQuery(
    ["sort", enabled.e[1]],
    async () => {
      const data = await fetch(
        set.host +
          set.database +
          "/sort/" +
          actcategory +
          "/" +
          (columns &&
            columns[selectedColumn] &&
            columns[selectedColumn].col.title) +
          "/" +
          (chevron.down ? "DESC" : "ASC") +
          "/" +
          10 * currentPage +
          "/" +
          (10 * currentPage + 10),
        {
          method: "GET",
        }
      );
      return await data.json();
    },
    {}
  );
  const queryClient = useQueryClient();
  const resolveIssueMutation = useMutation(
    async (id: number) => {
      let r = await fetch(
        set.host +
          set.database +
          "/" +
          set.actcategory +
          "/remove/" +
          (id + currentPage * 10 + 1),
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    },
    {
      onSuccess: () => {
        // flag the query with key ["issues"] as invalidated
        // this causes a refetch of the issues data
        // queryClient.invalidateQueries(["paginate"]);
        queryClient.invalidateQueries({ queryKey: ["paginate", currentPage] });
      },
    }
  );

  useEffect(() => {
    setEnabledSet({ e: [true, false] });
    if (ref.current) ref.current(data && data[actcategory], columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    datas(data, sorted_data);
  }, [columns]);
  useEffect(() => {
    if (ref.current)
      ref.current(sorted_data && sorted_data[actcategory], columns);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    datas(data, sorted_data);
  }, [sorted_data]);

  const navigate = useNavigate();
  const { sets, i } = useGlobalContext();
  return (
    <>
      {(isLoading || sorted_isLoading) && <div>"Loading..."</div>}
      {error && <div>"An error has occurred: " </div>}
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
              <div
                onClick={() => (ii: number) => {
                  resolveIssueMutation.mutate(ii);
                  datas(data, sorted_data);
                }}
              >
                x
              </div>
            </tr>
          );
        })}
    </>
  );
};
export default Rows;
