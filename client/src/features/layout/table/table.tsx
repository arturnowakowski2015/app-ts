import { useState, useEffect } from "react";

import { Column } from "../../../model/Interface";

import { Pagination } from "./components/pagination";
import { useBuildChevron } from "./api/useBuildChevron";
import { ColumnHeaderButton } from "./components/column-header";
import { Rows } from "./components/row";
import "../../../styles/Table.scss";
//import Pagination from "./Pagination";
interface IProps {
  cross: boolean;
  columns: Column[];
  len: number | undefined;
  pageSize: number;

  result: any;
  showChevron: (down: Boolean) => void;
  showSelectedColumn: (id: number) => void;
  showQuery: (enabled: number) => void;
  sort: () => void;
  deleteRow: (id: number) => void;
  iflen: boolean;
}
export function Table({
  iflen,
  cross,
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
    showSelectedColumn(-1); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chevron]);

  return (
    <div className="pagecontainer">
      <div className="paginationContainer">
        <div className="len" style={{ position: "relative", top: "-60px" }}>
          {" "}
          {iflen && <div>{len} elements</div>}
        </div>
        <div style={{ height: "60px", position: "relative", top: "20px" }}>
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
      <table
        className="table"
        style={{ height: "60px", position: "relative", top: "-80px" }}
      >
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
          <Rows
            cross={cross}
            columns={columns}
            result={result}
            deleteRow={deleteRow}
          />
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
