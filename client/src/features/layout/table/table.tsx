import { useState, useEffect, useMemo } from "react";

import { Set, IMenuItems, Enabled, Column, Chevron } from "../../../Interface";

import { Pagination } from "../../ui/pagination";
import { useBuildChevron } from "./useBuildChevron";
import { ColumnHeaderButton } from "../../ui/column-header";
import { Rows } from "../../ui/row";
import "../../../styles/Table.scss";
//import Pagination from "./Pagination";
interface IProps {
  columns: Column[];
  len: number;
  pageSize: number;

  result: any;
  showChevron: (down: Boolean) => void;
  showSelectedColumn: (id: number) => void;
  showQuery: (enabled: number) => void;
  sort: () => void;
  deleteRow: (id: number) => void;
}
export function Table({
  len,
  columns,
  showSelectedColumn,
  showChevron,
  showQuery,
  pageSize,
  result,
  sort,
  deleteRow,
}: IProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const [buildchevron, chevron, setChevron] = useBuildChevron(columns);
  useEffect(() => {
    showSelectedColumn(-1);
  }, [chevron]); // eslint-disable-next-line react-hooks/exhaustive-deps

  // eslint-disable-next-line react-hooks/exhaustive-deps

  /*
      const current = queryClient.getQueryData<{ items:any }>([
          "paginate",
          currentPage,
        ]);
        alert(JSON.stringify(current));
*/

  return (
    <div className="pagecontainer">
      <div className="paginationContainer">
        <div className="len" style={{ position: "relative", top: "20px" }}>
          {" "}
          {len} elements
        </div>
        <div style={{ height: "60px" }}>
          <Pagination
            siblingCount={1}
            currentPage={currentPage}
            totalCount={len}
            pageSize={pageSize}
            onPageChange={(page) => {
              let i: number = page;
              setCurrentPage(i);
              showQuery(i);
            }}
          />
        </div>
      </div>
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
                        showChevron(chevron.down);
                        showSelectedColumn(i);
                        sort();
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
          <Rows columns={columns} result={result} deleteRow={deleteRow} />
        </tbody>
      </table>
    </div>
  );
}

/*
{

*/

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
