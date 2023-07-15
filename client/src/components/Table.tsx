import { useState, useMemo, useEffect } from "react";
import { useSort } from "../hooks/useSort";
import { Set, IMenuItems } from "./Interface";
import { useBuildChevron } from "../hooks/useBuildChevron";
import ColumnHeaderButton from "./ColumnHeaderButton";
import Pagination from "./Pagination";
import Rows from "./Rows";
import { useQuery, QueryCache } from "@tanstack/react-query";
import { useTempTable } from "../hooks/useTempTable";

import { Column } from "../components/Interface";
import "../scss/Table.scss";
//import Pagination from "./Pagination";
interface IProps {
  actcategory: string;
  treedata: IMenuItems[];
  pageSize: number;
  set: Set;
  setDataLength: (length: number) => void;
}
export default function Table({
  actcategory,
  treedata,
  set,
  setDataLength,

  pageSize,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedColumn, setSelectedColumn] = useState<number>(0);
  let { data, isLoading, error } = useQuery(["database"], async () => {
    const data = await fetch(set.host + set.database, {
      method: "GET",
    });
    return await data.json();
  });
  const [d, setD] = useState<any>(data);
  const onSort = (columnId: number) => {
    setSelectedColumn(columnId);
  };
  const [columns, selectRecord] = useTempTable(set.actcategory, data, treedata);
  const [buildchevron, chevron, setChevron] = useBuildChevron(columns);
  const [now, setNow] = useState<boolean>(false);

  const {
    data: sorted_data,
    isLoading: sorted_isLoading,
    error: sorted_error,
    isPreviousData,
    refetch,
  } = useQuery(
    ["sort", selectedColumn],
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
          (chevron.down ? "ASC" : "DESC"),
        {
          method: "GET",
        }
      );
      return await data.json();
    },
    { keepPreviousData: true }
  );

  useEffect(() => {
    setD(sorted_data);
  }, [sorted_data]);

  // useEffect(() => setDataLength(datalength), []);
  if (isLoading) return <div>"Loading..."</div>;
  if (error) return <div>"An error has occurred: " </div>;
  return (
    <>
      /\\\{isPreviousData}\\
      {d && d[actcategory].length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              {columns &&
                columns.map((column, i) => {
                  return (
                    <th key={i}>
                      <ColumnHeaderButton
                        chevron={chevron}
                        className={chevron.class && chevron.class[i]}
                        title={column.col.title}
                        onClick={() => {
                          chevron.class[i] = "red";
                          setChevron({
                            atall: true,
                            down: !chevron.down,
                            title: column.col.title,
                            class: chevron.class,
                          });
                          setSelectedColumn((selectedColumn) => i);

                          d[actcategory] = sorted_data;
                          setD(d[actcategory]);
                          refetch();
                        }}
                        onMouseOver={() => {
                          buildchevron(columns);
                          chevron.class[i] = "red";
                          setChevron({
                            ...chevron,
                            title: column.col.title,
                            class: chevron.class,
                          });
                        }}
                        onMouseOut={() => {
                          chevron.class[i] = "gray";
                          setChevron({
                            ...chevron,
                            class: chevron.class,
                            down: false,
                          });
                        }}
                      />
                    </th>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            <Rows
              selectRecord={selectRecord}
              data={d[actcategory]}
              columns={columns}
            />
          </tbody>
        </table>
      ) : (
        <div className="norecords">"no records avaible!!"</div>
      )}{" "}
      <Pagination
        siblingCount={1}
        currentPage={currentPage}
        totalCount={d && d[actcategory].length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}

/*
 
 


        {data && data[0]
            ? buildHeader(Object.keys(data && data[0]), data && props.columns)
            : null}



          {currentPost.length >= 0 &&
          data &&
          searcheddata.length === data.length
            ? slicedSearchedText.map(buildRow)
            : stop === 0 && currentPost && currentPost.map(buildRow)
            ? stop === 0 && currentPost && currentPost.map(buildRow)
            : slicedSearchedText.map(buildRow)}



      <div style={{ padding: 20 }} >
            {data.map((item, i) => {
                return (
                    <div key={i}
                        style={{ cursor: "pointer", display: "flex", justifyContent: "space-between", padding: 20, border: "1px solid black", margin: 10 }}
                        onClick={() => onRowClick(item.id)}
                    >
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                    </div> 
                )
            })}
        </div>



*/
