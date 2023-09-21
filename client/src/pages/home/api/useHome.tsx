import { useState, useEffect, useCallback } from "react";
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
  useEffect(() => {
    if (mutator.context?.nextPage.data.length < 2) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
    // alert(currentPage + ":::" + mutator.context?.nextPage.data.length);
  }, [currentPage, mutator.context?.nextPage.data.length]);
  const { data: paginated_data } = useGetPaginatedData(
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
    paginated_data && paginated_data["data"] && paginated_data["data"]["data"],
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
  const setf = useCallback(() => {
    refetchSorted();
    setResult(paginated_data?.["data"]?.["data"] as unknown as any[]);
  }, [paginated_data, refetchSorted]);
  useEffect(() => {
    setf(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setIsDeleting(false);
  }, [mutator.context?.nextPage, setoflen]);
  useEffect(() => {
    setLens(setoflen);
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

      // setSetoffetched(setoffetched);
    } else {
      setFetching(false);
      setf();
    }
    return () => {
      clearTimeout(t);
    }; //if (fetching) setoffetched.push(currentPage);
  }, [paginated_data, currentPage, setoffetched, setf]);
  useEffect(() => {
    setLen(sorted_data?.["data"]?.["obj"]?.[actcategory] as unknown as number);

    setResult(sorted_data?.["data"]?.["data"] as unknown as any[]);
    //console.log(3333333333333);
  }, [sorted_data, actcategory]); // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    setResult(mutator.context?.currentPage1.data); // eslint-disable-next-line react-hooks/exhaustive-deps
    setCross(false);
  }, [cross]);

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
