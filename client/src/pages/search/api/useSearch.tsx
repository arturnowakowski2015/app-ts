import { useState } from "react";
import { useTempTable } from "../../../features/layout/table/api/useTempTable";
import { useFilterData } from "./useGetFilteredData";
import { DataLengths, IMenuItems, Set } from "../../../model/Interface";
import { useEffect } from "react";
let data1 = ["a", "aa", "aaa"];
const useSearch = (
  treedata: IMenuItems[],

  set: Set,
  pageSize: number
) => {
  const [options, setOptions] = useState<string[]>([""]);
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState<boolean>();
  const [cross, setCross] = useState<boolean>(false);
  const [lens, setLens] = useState<DataLengths>();
  const [query, setQuery] = useState(" ");
  useEffect(() => {
    setCurrentPage(1);
    setCross(false);
  }, []);
  const { data: filtered_data } = useFilterData(
    pageSize,

    currentPage,
    set,
    set && set.actcategory,
    query
  );

  let data: any =
    filtered_data && filtered_data["data"] && filtered_data["data"]["data"];
  const {
    columns,

    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(set && set.actcategory, data, treedata);

  const filteredOptions = (str: string) => {
    let opt: string[] =
      data1 &&
      data1.filter((t: string) => {
        return t.indexOf(str) !== -1 && t;
      });
    if (options && options.length === 0 && data) data1.splice(0, 0, str);
    setOptions(opt);
  };
  const reset = () => {
    setOptions([""]);
  };
  useEffect(() => {
    console.log(direction);
    setLens(filtered_data && filtered_data["data"]["len"]); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return {
    data,
    options,
    query,
    filteredOptions,
    setQuery,
    reset,
    lens,
    setDirection,
    showSelectedColumn,
    columns,
    showChevron,
    setCurrentPage,
    currentPage,
    onSort,
    cross,
  } as const;
};
export { useSearch };
