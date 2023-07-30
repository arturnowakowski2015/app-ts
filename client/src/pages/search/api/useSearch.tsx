import { useState } from "react";
import { useTempTable } from "../../../features/layout/table/api/useTempTable";
import { useFilterData } from "./useGetFilteredData";
import { DataLengths, IMenuItems, Set } from "../../../model/Interface";

let data1 = ["a", "aa", "aaa"];
const useSearch = (
  url: string,
  setoflen: DataLengths,
  treedata: IMenuItems[],
  length: number,
  overItem: string,
  set: Set,
  pageSize: number,
  actcategory: string
) => {
  const [options, setOptions] = useState<string[]>([""]);
  const [currentPage, setCurrentPage] = useState(1);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [cross, setCross] = useState<boolean>(false);
  const [lens, setLens] = useState<DataLengths>();
  const [query, setQuery] = useState("");
  const {
    isLoading,
    isFetching,
    isSuccess,
    data: filtered_data,
  } = useFilterData(
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
    chevron,
    selectedColumn,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(set && set.actcategory, data, treedata);

  const filteredOptions = (str: string) => {
    let opt: string[] = data1.filter((t: any) => t.indexOf(str) !== -1 && t);
    if (options.length === 0) data.splice(0, 0, str);
    setOptions(opt);
  };
  const reset = () => {
    setOptions([""]);
  };
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
