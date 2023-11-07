import { useState, useEffect } from "react";
import { IMenuItems, Set, DataLengths } from "../../../model/Interface";
import { useTempTable } from "../../../features/layout/table/api/useTempTable";
import { useGetPaginatedData } from "../../../features/layout/table/api/useGetPaginatedData";
import { useGetSortedData } from "../../../features/layout/table/api/useGetSortedData";
import { useDeleteRow } from "../../../features/layout/table/api/useDeleteRow";
import { useLocation } from "react-router-dom";

const useHome = (
  set: Set,
  setoflen: DataLengths,
  pageSize: number,
  treedata: IMenuItems[],
  actcategory: string
) => {
  const location = useLocation();
  const [cross, setCross] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [result, setResult] = useState<any[] | undefined>([] as any[]);
  const [len, setLen] = useState<number | undefined>(0);
  const [direction, setDirection] = useState<boolean>(true);
  const [lens, setLens] = useState<DataLengths>();
  const { mutator, len1: mutatedLen } = useDeleteRow(set, currentPage);

  const { data: paginated_data, refetch } = useGetPaginatedData(
    location.pathname.split("/")[1],
    pageSize,
    direction,
    len as number,
    currentPage,
    set,
    actcategory
  );

  const {
    columns,
    chevron,
    selectedColumn,
    sort,
    onSort,
    showChevron,
    showSelectedColumn,
  } = useTempTable(
    set && set.actcategory,
    paginated_data?.["data"]?.["data"],
    treedata
  );

  const { sorted_data, refetchSorted } = useGetSortedData(
    pageSize,
    sort,
    set,
    currentPage,
    actcategory,
    columns,
    selectedColumn,
    chevron
  );
  const [fetching, setFetching] = useState<boolean | undefined>(undefined);
  const [setoffetched, setSetoffetched] = useState<number[]>([] as number[]);
  const setf = () => {
    refetchSorted();
    setResult(paginated_data?.["data"]?.["data"] as unknown as any[]);
    //
    refetch();
  };

  useEffect(() => {
    setf(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setIsDeleting(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutator.context?.nextPage, setoflen]);
  useEffect(() => {
    setLens(setoflen); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, setoflen]);
  useEffect(() => {
    let t: any;
    setFetching(true);
    if (setoffetched.indexOf(currentPage) === -1) {
      t = setTimeout(() => {
        setf();
        setFetching(false);
        setoffetched.push(currentPage);
        setSetoffetched(setoffetched);
      }, 1000);
    } else {
      setFetching(false);
      setf();
    }
    return () => {
      clearTimeout(t);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted_data, currentPage, setoffetched]);
  useEffect(() => {
    setLen(sorted_data?.["data"]?.["obj"]?.[actcategory] as unknown as number);

    if (
      sorted_data?.["data"]?.["data"][0].id ===
      mutator.context?.currentPage1.data[0].id
    )
      setResult(sorted_data?.["data"]?.["data"] as unknown as any[]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorted_data, actcategory]);
  useEffect(() => {
    setf();
    setCross(false); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cross, mutator.context?.currentPage1.data]);

  const deleteRow = (id: number) => {
    mutator.mutate(id);
    console.log(id);
    setCross(true);
    setIsDeleting(true);
  };
  return {
    cross,
    mutatedLen,
    result,
    currentPage,
    paginated_data,
    lens,
    mutator,
    isDeleting,
    fetching,
    onSort,
    showChevron,
    columns,
    showSelectedColumn,
    setDirection,
    setCurrentPage,
    deleteRow,
    setLen,
  };
};
export default useHome;
