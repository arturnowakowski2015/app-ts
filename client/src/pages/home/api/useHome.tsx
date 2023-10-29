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
  const [paginateFlag, setPaginateFlag] = useState<number>(0);
  const { mutator, len1: mutatedLen } = useDeleteRow(set, currentPage);
  useEffect(() => {
    setPaginateFlag((paginateFlag) => paginateFlag + 1);
    if (paginateFlag === 10) {
      setCurrentPage(currentPage);
      setPaginateFlag(0);
    }
    // alert(currentPage + ":::" + mutator.context?.nextPage.data.length);
  }, [currentPage, mutator.context?.nextPage.data.length]);
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
  const [paginatedFlag, setPaginatedFlag] = useState<boolean>(false);
  const setf = useCallback(() => {
    refetchSorted();
    setResult(paginated_data?.["data"]?.["data"] as unknown as any[]);
    refetch();
    setPaginatedFlag(false);
  }, [paginated_data, refetchSorted]);
  useEffect(() => {
    setf(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setIsDeleting(false);
    setPaginatedFlag(true);
  }, [mutator.context?.nextPage, setoflen]);
  useEffect(() => {
    setLens(setoflen);
    setf();
  }, [fetching, setoflen]);
  useEffect(() => {
    let t: any;
    setFetching(true);
    if (setoffetched.indexOf(currentPage) === -1) {
      t = setTimeout(() => {
        setFetching(false);
        setoffetched.push(currentPage);
        setSetoffetched(setoffetched);
      }, 1000);

      // setSetoffetched(setoffetched);
    } else {
      setFetching(false);
    }
    return () => {
      clearTimeout(t);
    }; //if (fetching) setoffetched.push(currentPage);
  }, [paginated_data, currentPage, setoffetched]);
  useEffect(() => {
    if (paginatedFlag === false) {
      setLen(
        sorted_data?.["data"]?.["obj"]?.[actcategory] as unknown as number
      );
      //alert(sorted_data?.["data"]?.["data"] as unknown as any[]);

      setResult(sorted_data?.["data"]?.["data"] as unknown as any[]);
    } else setPaginatedFlag(false);
    //console.log(3333333333333);
  }, [sorted_data, actcategory]); // eslint-disable-next-line react-hooks/exhaustive-deps
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
