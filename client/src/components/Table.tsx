import { useState, useEffect } from "react";

import { Set, IMenuItems, Enabled } from "./Interface";
import { useBuildChevron } from "../hooks/useBuildChevron";
import ColumnHeaderButton from "./ColumnHeaderButton";
import Pagination from "./Pagination";
import Rows from "./Rows";

import { useTempTable } from "../hooks/useTempTable";

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
  const [len, setLen] = useState<number>();
  ////localhost:3001/comments/paginate/new/1/11
  const [d, setD] = useState<any>({} as any);

  const [sorted_data, setSorted_data] = useState<any>([] as any);
  const [data, setData] = useState<any>([] as any);

  const [enabled, setEnabled] = useState<Enabled>({
    e: [true, false],
  } as Enabled);
  const datas = (data1: any, sorted_data: any) => {
    let r = data1;
    setData(r);
    if (sorted_data) setSorted_data(data);
  };
  const [columns] = useTempTable(set.actcategory, data, treedata);
  const [buildchevron, chevron, setChevron] = useBuildChevron(columns);
  useEffect(() => {
    setSelectedColumn((selectedColumn) => -1);

    setEnabled({ ...enabled, e: [false, false] });
  }, [chevron]); // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setD([]);

    setD(data);

    setLen(data && data.len);
  }, [data]); // eslint-disable-next-line react-hooks/exhaustive-deps

  /*
      const current = queryClient.getQueryData<{ items:any }>([
          "paginate",
          currentPage,
        ]);
        alert(JSON.stringify(current));
*/

  const setEnabledSet = (arr: Enabled) => setEnabled(arr);
  return (
    <>
      {JSON.stringify(columns)}
      {
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
                          const e: Enabled = { ...enabled, e: [false, true] };
                          setEnabled(e);
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
              setEnabledSet={setEnabledSet}
              currentPage={currentPage}
              set={set}
              chevron={chevron}
              selectedColumn={selectedColumn}
              columns={columns}
              actcategory={actcategory}
              enabled={enabled}
              datas={datas}
            />
          </tbody>
        </table>
      }
      {len}
      <Pagination
        siblingCount={1}
        currentPage={currentPage === 0 ? 1 : currentPage}
        totalCount={len}
        pageSize={pageSize}
        onPageChange={(page) => {
          const e: Enabled = { ...enabled, e: [true, false] };
          setEnabled(e);
          let i: number = page;
          setCurrentPage(i);
        }}
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
